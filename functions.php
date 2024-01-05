<?php
/**
 * Betheme Child Theme
 *
 * @package Betheme Child Theme
 * @author Muffin group
 * @link https://muffingroup.com
 */

/**
 * Load Textdomain
 */

add_action('after_setup_theme', 'mfn_load_child_theme_textdomain');

function mfn_load_child_theme_textdomain(){
	load_child_theme_textdomain('betheme', get_stylesheet_directory() . '/languages');
	load_child_theme_textdomain('mfn-opts', get_stylesheet_directory() . '/languages');
}

/**
 * Enqueue Styles
 */

function mfnch_enqueue_styles()
{
	// enqueue the parent stylesheet
	// however we do not need this if it is empty
	// wp_enqueue_style('parent-style', get_template_directory_uri() .'/style.css');

	// enqueue the parent RTL stylesheet

	if ( is_rtl() ) {
		wp_enqueue_style('mfn-rtl', get_template_directory_uri() . '/rtl.css');
	}

	// enqueue the child stylesheet

	wp_dequeue_style('style');
	wp_enqueue_style('style', get_stylesheet_directory_uri() .'/style.css');
}
add_action('wp_enqueue_scripts', 'mfnch_enqueue_styles', 101);

function enqueue_slick_scripts() {
    // Enqueue jQuery from CDN
    wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js', array(), null, true);

    // Enqueue Slick Carousel script and styles in the footer
    wp_enqueue_script('slick-script', 'https://unpkg.com/slick-carousel@1.8.1/slick/slick.min.js', array('jquery'), null, true);
    wp_enqueue_style('slick-style', 'https://unpkg.com/slick-carousel@1.8.1/slick/slick.css');
    wp_enqueue_style('slick-theme-style', 'https://unpkg.com/slick-carousel@1.8.1/slick/slick-theme.css');
}

add_action('wp_enqueue_scripts', 'enqueue_slick_scripts');





add_shortcode('all_jobs', '_all_jobs_');
function _all_jobs_() {

    ob_start(); ?>

    <div class="job-filters">
        <select id="job-category">
            <option value="">All Categories</option>
            <?php
            // Get a list of unique job categories from the posts
            $args = array(
                'post_type' => 'my-job',
                'posts_per_page' => -1,
            );
            $query = new WP_Query($args);
            $job_categories = array();

            if ($query->have_posts()) {
                while ($query->have_posts()) {
                    $query->the_post();
                    $category = get_field('job_category');
                    if (!in_array($category, $job_categories)) {
                        $job_categories[] = $category;
                    }
                }
                wp_reset_postdata();

                // Display job categories in the dropdown
                foreach ($job_categories as $category) {
                    echo '<option value="' . esc_attr($category) . '">' . esc_html($category) . '</option>';
                }
            }
            ?>
        </select>
    </div>

    <!-- Container for AJAX-loaded job posts -->
    <div id="job-posts-container">
        <?php
        $args = array(
            'post_type' => 'my-job',
            'posts_per_page' => -1,
        );

        $query = new WP_Query($args);

        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $post_id = get_the_ID();
                $post_title = get_the_title();
                $post_url = get_permalink();
                $post_image = get_the_post_thumbnail_url($post_id, 'full');
                $post_excerpt = get_the_excerpt();
                ?>
                <a href="<?php echo $post_url; ?>" class="job-card">
                    <div class="left-col">
                        <img src="<?php echo $post_image; ?>" alt="<?php echo $post_title; ?>">
                        <h4><?php echo $post_title; ?></h4>
                    </div>
                    <div class="info">
                        <p><?php the_field('job_category'); ?></p>
                        <p><?php the_field('job_location'); ?></p>
                    </div>
                </a>
                <?php
            }
        } else {
            echo 'No jobs found.';
        }
        wp_reset_postdata();
        ?>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const jobCategorySelect = document.getElementById('job-category');
            const jobPostsContainer = document.getElementById('job-posts-container');

            jobCategorySelect.addEventListener('change', function () {
                const categoryValue = jobCategorySelect.value;
                filterJobs(categoryValue);
            });

            function filterJobs(categoryValue) {
                // Prepare the AJAX request to retrieve filtered job posts
                const xhr = new XMLHttpRequest();
                xhr.open('GET', '<?php echo admin_url('admin-ajax.php'); ?>?action=filter_jobs&category=' + categoryValue);
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        jobPostsContainer.innerHTML = xhr.responseText;
                    } else {
                        console.error('Error:', xhr.status, xhr.statusText);
                    }
                };
                xhr.send();
            }

            // Initial load
            filterJobs('');
        });
    </script>

    <?php

    $output_string = ob_get_contents();
    ob_end_clean();
    return $output_string;
}

add_action('wp_ajax_filter_jobs', 'filter_jobs_callback');
add_action('wp_ajax_nopriv_filter_jobs', 'filter_jobs_callback');

function filter_jobs_callback() {
    $category = sanitize_text_field($_GET['category']);

    $args = array(
        'post_type' => 'my-job',
        'posts_per_page' => -1,
    );

    if (!empty($category)) {
        $args['meta_query'] = array(
            array(
                'key' => 'job_category',
                'value' => $category,
                'compare' => '=',
            ),
        );
    }

    $query = new WP_Query($args);

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $post_id = get_the_ID();
            $post_title = get_the_title();
            $post_url = get_permalink();
            $post_image = get_the_post_thumbnail_url($post_id, 'full');
            $post_excerpt = get_the_excerpt();
            ?>
            <a href="<?php echo $post_url; ?>" class="job-card">
                <div class="left-col">
                    <img src="<?php echo $post_image; ?>" alt="<?php echo $post_title; ?>">
                    <h4><?php echo $post_title; ?></h4>
                </div>
                <div class="info">
                    <p><?php the_field('job_category'); ?></p>
                    <p><?php the_field('job_location'); ?></p>
                </div>
            </a>
            <?php
        }
    } else {
        echo 'No jobs found.';
    }

    wp_reset_postdata();
    wp_die();
}

function company_jobs_shortcode() {
    ob_start();

    $company_jobs = get_field('company_jobs');

    if ($company_jobs) :
        foreach ($company_jobs as $job) :
            $job_title = get_the_title($job);
            $job_url = get_permalink($job); ?>
            <div class="open-positions">
				<h3><?php echo esc_html($job_title); ?></h3>
				<a href="<?php echo esc_url($job_url); ?>">Apply Online</a>		
              </div>
            <?php
        endforeach;
    endif;

    $output_string = ob_get_contents();
    ob_end_clean();
    return $output_string;
}
add_shortcode('company_jobs', 'company_jobs_shortcode');

function display_reviews() {
    ob_start();

    $args = array(
        'post_type'      => 'site-review',
        'posts_per_page' => -1, // Display all posts
    );
    $query = new WP_Query($args);

    if ($query->have_posts()) {
        echo '<div class="slick-slider">';
        while ($query->have_posts()) {
            $query->the_post();

            $custom_fields = get_post_meta(get_the_ID(), '_submitted', true);

            if (isset($custom_fields['assigned_posts']) && !empty($custom_fields['assigned_posts'])) {
                $assigned_posts = explode(',', $custom_fields['assigned_posts']);

                foreach ($assigned_posts as $assigned_post_id) {
                    $assigned_post_id = trim($assigned_post_id);
                    if (!isset($aggregated_ratings[$assigned_post_id])) {
                        $aggregated_ratings[$assigned_post_id] = array(
                            'total_rating' => 0,
                            'count' => 0,
                        );
                    }

                    $aggregated_ratings[$assigned_post_id]['total_rating'] += intval($custom_fields['rating']);
                    $aggregated_ratings[$assigned_post_id]['count']++;
                }
            }
        }

        foreach ($aggregated_ratings as $post_id => $data) {
            $post_title = get_the_title($post_id);
            $total_rating = $data['total_rating'];
            $count = $data['count'];
            $average_rating = ($count > 0) ? round($total_rating / $count, 1) : 0;

            // Additional data (inside the loop)
            $content = $custom_fields['content'];
            $email = $custom_fields['email'];

            // Wrap each pair in a <div class="card">
            echo '<div class="card">';
            echo '<p><strong>' . esc_html($post_title) . ':</strong> ';
            echo 'Total Rating: ' . esc_html($average_rating) . get_star_rating_html($average_rating) . '</p>';
            echo '<p>' . esc_html($content) . '</p>';
            echo '<p><strong>Email:</strong> ' . esc_html($email) . '</p>';
            echo '</div>';
        }
        
        echo '</div>';

        echo '<script>
            jQuery(document).ready(function($) {
                $(".slick-slider").slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 4000,
                    dots: false,
                    arrows: false,
                    variableWidth: false, 
                });
            });
        </script>';
    }

    wp_reset_postdata();

    return ob_get_clean();
}
add_shortcode('reviews', 'display_reviews');


function display_leaderboard() {
    ob_start();

    $args = array(
        'post_type'      => 'site-review',
        'posts_per_page' => -1, // Display all posts
    );
    $query = new WP_Query($args);

    if ($query->have_posts()) {
        echo '<table class="leaderboard">';
        echo '<thead><tr><th>Name</th><th>Rating</th><th>Total Count</th><th>Stars</th></tr></thead><tbody>';

        // Initialize the array to store aggregated ratings and counts
        $aggregated_ratings = array();

        while ($query->have_posts()) {
            $query->the_post();

            $custom_fields = get_post_meta(get_the_ID(), '_submitted', true);

            if (isset($custom_fields['assigned_posts']) && !empty($custom_fields['assigned_posts'])) {
                $assigned_posts = explode(',', $custom_fields['assigned_posts']);

                foreach ($assigned_posts as $assigned_post_id) {
                    $assigned_post_id = trim($assigned_post_id);
                    if (!isset($aggregated_ratings[$assigned_post_id])) {
                        $aggregated_ratings[$assigned_post_id] = array(
                            'total_rating' => 0,
                            'count' => 0,
                        );
                    }

                    $aggregated_ratings[$assigned_post_id]['total_rating'] += intval($custom_fields['rating']);
                    $aggregated_ratings[$assigned_post_id]['count']++;
                }
            }
        }

        foreach ($aggregated_ratings as $post_id => $data) {
            $post_title = get_the_title($post_id);
            $total_rating = $data['total_rating'];
            $count = $data['count'];
            $average_rating = ($count > 0) ? round($total_rating / $count, 1) : 0;

            echo '<tr>';
            echo '<td>' . esc_html($post_title) . '</td>';
            echo '<td>' . esc_html($average_rating) . '</td>';
            echo '<td>' . esc_html($count) . '</td>'; // New column for total count
            echo '<td>' . get_star_rating_html($average_rating) . '</td>';
            echo '</tr>';
        }

        echo '</tbody></table>';
    }

    wp_reset_postdata();

    return ob_get_clean();
}
add_shortcode('leaderboard', 'display_leaderboard');

function get_star_rating_html($rating) {
    $html = '<div class="star-rating">';
    $rounded_rating = round($rating);
    for ($i = 1; $i <= 5; $i++) {
        $html .= '<span class="star ' . (($i <= $rounded_rating) ? 'filled' : 'empty') . '">&#9733;</span>';
    }
    $html .= '</div>';

    return $html;
}

function display_latest_reviews() {
    ob_start();

    $args = array(
        'post_type'      => 'site-review',
        'posts_per_page' => 10, // Display the latest 10 reviews
        'orderby'        => 'date',
        'order'          => 'DESC',
    );
    $query = new WP_Query($args);

    if ($query->have_posts()) {
        echo '<ul class="latest-reviews">';
        while ($query->have_posts()) {
            $query->the_post();

            $custom_fields = get_post_meta(get_the_ID(), '_submitted', true);

            if (isset($custom_fields['rating'])) {
                $post_title = get_the_title();
                $rating = esc_html($custom_fields['rating']);
                $stars_html = get_star_rating_html($rating);
				$description = wp_trim_words(get_the_excerpt(), 20);

                echo '<li>';
                echo '<strong>' . esc_html($post_title) . '</strong> - Rating: ' . $rating . ' Stars: ' . $stars_html;
				echo '<p>' . esc_html($description) . '</p>';
                echo '</li>';
            }
        }
        echo '</ul>';
    } else {
        echo '<p>No reviews found.</p>';
    }

    wp_reset_postdata();

    return ob_get_clean();
}
add_shortcode('latest_reviews', 'display_latest_reviews');

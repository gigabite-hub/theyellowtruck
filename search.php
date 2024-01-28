<?php
get_header();
?>

<section id="primary" class="content-area">
    <main id="main" class="site-main company-search-page">

        <div class="page-conatiner">
            <header class="page-header">
                <h1 class="page-title"><?php printf(__('Search Results for: %s', 'theyellowtruck'), get_search_query()); ?>    </h1>
            </header>
        </div>

        <div class="loop-wrapper">

                <?php
                global $wp_query;
                // $wp_query->set('post_type', 'company-profile');

                if (have_posts()) :
                    echo '<p>Total Result: ' . $wp_query->found_posts . '</p>';
                echo '<div class="inner-wrapper">'
                    while (have_posts()) : the_post();
                ?>
                        <div class="cp-card">
                            <article <?php post_class(); ?>>
                                <div class="entry-content">
                                    <?php
                                    // Display the post thumbnail
                                    if (has_post_thumbnail()) {
                                        echo '<div class="post-thumbnail">';
                                        the_post_thumbnail('thumbnail');
                                        echo '</div>';
                                    } ?>

                                    <h2 class="entry-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2><?php

                                    // Display ACF fields (modify the field names as needed)
                                    $company_location = get_field('company_location');
                                    $company_website  = get_field('company_website');

                                    if ($company_location) {
                                        echo '<p>' . esc_html($company_location) . '</p>';
                                    }

                                    if ($company_website) {
                                        echo '<a href="' . esc_url($company_website) . '" target="_blank">Website</a>';
                                    }
                                    echo '<div class="entry-content">';
                                    the_excerpt();
                                    echo '</div>';
                                    ?>
                                    <a href="<?php the_permalink(); ?>">Read more</a>
                                </div>
                            </article>
                        </div>
                <?php endwhile; ?>

                    <?php the_posts_pagination(array('mid_size' => 2)); ?>

                <?php else : ?>

                    <p><?php _e('No results found. Try a different search term.', 'textdomain'); ?></p>

                <?php endif;
                wp_reset_postdata(); ?>
            </div>
        </div>
    </main>
</section>

<?php get_sidebar(); ?>
<?php get_footer(); ?>

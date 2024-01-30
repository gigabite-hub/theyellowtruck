(function ($) {

    $(document).ready(function () {
        console.log('hello');

        $('.tab').on('click', function (event) {
            event.preventDefault();
            $('.tab').removeClass('active');
            $(this).toggleClass('active');
            var selected = this.getAttribute('data-toggle-target');
            $('.tab-content').removeClass('active').filter(selected).addClass('active');

            var getCompanyEmail = $('.active input#email-hidden').val();
            console.log("🚀 ~ getCompanyEmail:", getCompanyEmail);
            var jobTitle = $('.active input#Job-title').val();
            console.log("🚀 ~ jobTitle:", jobTitle);
            var jobData = $('.active .click-content').data('job');
            console.log("🚀 ~ jobData:", jobData);
            var getCompanyName = $('.active .click-content').data('company');
            console.log("🚀 ~ getCompanyName:", getCompanyName);

            $('#application-form #nf-form-1-cont #nf-field-10').val(getCompanyEmail);
            $('#application-form #nf-form-1-cont #nf-field-11').val(jobData);
            $('#companytitle h3').text(getCompanyName);
            $('#jobtitle .elementor-widget-container').text(jobTitle);

        });

        var searchQuery = getParameterByName('s');
        $('.page-title').append(searchQuery);

        console.log('Search Query:', searchQuery);

        function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        var jobWrapper = $("#job-wrapper");

        $(window).scroll(function () {
            var windowScroll = $(window).scrollTop();
            var jobWrapperOffset = jobWrapper.offset().top;
            var jobWrapperHeight = jobWrapper.outerHeight();
            var jobWrapperBottom = jobWrapperOffset + jobWrapperHeight;
            var windowHeight = $(window).height();

            // Adjust the bottom position for overflow
            var visibleBottom = windowScroll + windowHeight;

            if (windowScroll >= jobWrapperOffset && visibleBottom <= jobWrapperBottom) {
                jobWrapper.addClass("fixed");
            } else {
                jobWrapper.removeClass("fixed");
            }
        });
    });

})(jQuery);

function filterJobs(selectedState) {
    // Implement your filtering logic here
    // You can use AJAX to retrieve and display filtered job posts
    console.log('Selected State:', selectedState);
    // Perform filtering based on the selectedState
    // You might want to use AJAX to fetch and display filtered job posts
}
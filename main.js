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

            $('#application-form #nf-form-1-cont #nf-field-10').val(getCompanyEmail);
            $('#application-form #nf-form-1-cont #nf-field-11').val(jobData);

        });
        // {system:admin_email},

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

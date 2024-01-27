(function ($) {

    $(document).ready(function () {
        console.log('hello');

        $('.tab').on('click', function (evt) {
            evt.preventDefault();
            $(this).toggleClass('active');
            var sel = this.getAttribute('data-toggle-target');
            $('.tab-content').removeClass('active').filter(sel).addClass('active');
        });

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

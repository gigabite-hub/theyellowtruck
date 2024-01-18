(function ($) {

    $(document).ready(function () {
        console.log('hello');

        $('.tab').on('click', function (evt) {
            evt.preventDefault();
            $(this).toggleClass('active');
            var sel = this.getAttribute('data-toggle-target');
            $('.tab-content').removeClass('active').filter(sel).addClass('active');
        });
    });
    
})(jQuery);

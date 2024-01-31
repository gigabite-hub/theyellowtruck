(function ($) {
  $(document).ready(function () {
    console.log("hello");

        var defaultTabIndex = jobListingParams.defaultTabIndex;
        var jobIdParam = jobListingParams.jobIdParam;

        $('.tabs .job-card').eq(defaultTabIndex).addClass('active');
        $('.job-content .tab-content').eq(defaultTabIndex).addClass('active');
    
        if (jobIdParam !== 0) {
            var tabIndex = $('.tabs .job-card').index($('.tabs .job-card[data-toggle-target=".tab-content-' + jobIdParam + '"]'));
            $('.tabs .job-card').eq(tabIndex).addClass('active');
            $('.job-content .tab-content').eq(tabIndex).addClass('active');
        }
        
    $(".tab").on("click", function (event) {
      var defaultTabIndex = jobListingParams.defaultTabIndex;
      var jobIdParam = jobListingParams.jobIdParam;

      $(".tabs .job-card").eq(defaultTabIndex).addClass("active");
      $(".job-content .tab-content").eq(defaultTabIndex).addClass("active");

      if (jobIdParam !== 0) {
        var tabIndex = $(".tabs .job-card").index(
          $(
            '.tabs .job-card[data-toggle-target=".tab-content-' +
              jobIdParam +
              '"]'
          )
        );
        $(".tabs .job-card").eq(tabIndex).addClass("active");
        $(".job-content .tab-content").eq(tabIndex).addClass("active");
      }

      $(".tabs .job-card").on("click", function (e) {
        e.preventDefault();

        $(".tabs .job-card, .job-content .tab-content").removeClass("active");

        $(this).addClass("active");
        var targetClass = $(this).data("toggle-target");
        $(targetClass).addClass("active");
        updateContent();
      });

      function updateContent() {
        var getCompanyEmail = $(
          ".tabs .job-card.active input#email-hidden"
        ).val();
        var jobTitle = $(".tabs .job-card.active input#Job-title").val();
        var jobData = $(".tabs .job-card.active .click-content").data("job");
        var getCompanyName = $(".tabs .job-card.active .click-content").data(
          "company"
        );

        $("#application-form #nf-form-1-cont #nf-field-10").val(
          getCompanyEmail
        );
        $("#application-form #nf-form-1-cont #nf-field-11").val(jobData);
        $("#companytitle h3").text(getCompanyName);
        $("#jobtitle .elementor-widget-container").text(jobTitle);
      }

      updateContent();
    });

    var searchQuery = getParameterByName("s");
    $(".page-title").append(searchQuery);

    console.log("Search Query:", searchQuery);

    function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
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

      if (
        windowScroll >= jobWrapperOffset &&
        visibleBottom <= jobWrapperBottom
      ) {
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
  console.log("Selected State:", selectedState);
  // Perform filtering based on the selectedState
  // You might want to use AJAX to fetch and display filtered job posts
}

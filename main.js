(function ($) {
  $(document).ready(function () {
    console.log("hello");

    var defaultTabIndex = jobListingParams.defaultTabIndex;
    var jobIdParam = jobListingParams.jobIdParam;
    
    function activateTabAndContent(index) {
      $(".tabs .job-card, .job-content .tab-content").removeClass("active");
      $(".tabs .job-card").eq(index).addClass("active");
      $(".job-content .tab-content").eq(index).addClass("active");
      updateContent(index);
    }
    
    // Handle the default case separately
    activateTabAndContent(defaultTabIndex);
    
    if (jobIdParam !== 0) {
      var tabIndex = $(".tabs .job-card").index(
        $(
          '.tabs .job-card[data-toggle-target=".tab-content-' +
            jobIdParam +
            '"]'
        )
      );
      if (tabIndex !== -1) {
        activateTabAndContent(tabIndex);
      }
    }
    
    $(".tabs .job-card").on("click", function (e) {
      e.preventDefault();
      var index = $(".tabs .job-card").index($(this));
      activateTabAndContent(index);
    });
    
    function updateContent(index) {
      var getCompanyEmail = $(".tabs .job-card.active input#email-hidden").val();
      var jobTitle = $(".tabs .job-card.active input#Job-title").val();
      var jobData = $(".tabs .job-card.active .click-content").data("job");
      var getCompanyName = $(".tabs .job-card.active .click-content").data(
        "company"
      );
    
      $("#application-form #nf-form-1-cont #nf-field-10").val(getCompanyEmail);
      $("#application-form #nf-form-1-cont #nf-field-11").val(jobData);
      $("#companytitle h3").text(getCompanyName);
      $("#jobtitle .elementor-widget-container").text(jobTitle);
    }    

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

    var jobWrapper = $(".tabs");

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
        jobWrapper.parent().addClass("fixed");
      } else {
        jobWrapper.parent().removeClass("fixed");
      }
    });    
  });
})(jQuery);

function filterJobs() {
    var selectedState = document.getElementById('location').value;
    var selectedCompany = document.getElementById('company').value;
    var jobCards = document.querySelectorAll('.job-card');

    jobCards.forEach(function (card) {
        var locationElement = card.querySelector('p');
        var jobLocation = '';
        if (locationElement) {
            var locationText = locationElement.textContent || locationElement.innerText;
            var locationIndex = locationText.indexOf("Location:");
            if (locationIndex !== -1) {
                jobLocation = locationText.substring(locationIndex + "Location:".length).trim();
            }
        }

        var companyElement = card.querySelector('.click-content');
        var jobCompany = companyElement ? companyElement.getAttribute('data-company') : '';

        if ((selectedState === '' || selectedState === jobLocation) &&
            (selectedCompany === '' || selectedCompany === jobCompany)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}


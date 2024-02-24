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

    var urlParams = new URLSearchParams(window.location.search);
    var jobId = urlParams.get('job_id');
    console.log("🚀 ~ jobId:", jobId);

    // $('.job-card').removeClass('active');
    $('.job-card').each(function () {
      var tabJobId = $(this).data('job-id');

      if (tabJobId == jobId) {
        $(this).addClass('active').click();
      }
    });

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
    var mySwiper = new Swiper('.home-swiper-container', {
      loop: false,
      speed: 1000,
      // autoplay: {
      //     delay: 3000,
      // },
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
          rotate: 0,
          stretch: 80,
          depth: 200,
          modifier: 1,
          slideShadows: false,
      },
  
      // Navigation arrows
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      initialSlide: 1,
  });  
  


  
  });
})(jQuery);

function filterJobs() {
  var selectedState = document.getElementById('location').value;
  var selectedCompany = document.getElementById('company').value;
  var selectedJobType = document.getElementById('job_type').value;
  var jobCards = document.querySelectorAll('.job-card');

  jobCards.forEach(function (card) {

    var companyElement = card.querySelector('.click-content');
    var jobLocation = companyElement ? companyElement.getAttribute('data-location') : '';
    var jobCompany = companyElement ? companyElement.getAttribute('data-company') : '';
    var jobType = companyElement ? companyElement.getAttribute('data-jobtype') : '';

    if ((selectedState === '' || selectedState === jobLocation) &&
      (selectedCompany === '' || selectedCompany === jobCompany) &&
      (selectedJobType === '' || selectedJobType === jobType)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function filterCompanies() {
  var companySize = document.getElementById('company-size').value;
  var companyName = document.getElementById('company-name').value;
  var companyLocation = document.getElementById('company-location').value;

  // Show loading message
  document.querySelector('.companys-list').innerHTML = '<p>Loading...</p>';

  // Send filters to the server using AJAX
  jQuery.ajax({
      type: 'GET',
      url: ajax_object.ajaxurl,
      data: {
          action: 'filter_companies',
          company_employees: encodeURIComponent(companySize),
          company_name: encodeURIComponent(companyName),
          company_location: encodeURIComponent(companyLocation)
      },
      success: function (response) {
          // Update the companies list with the filtered results
          document.querySelector('.companys-list').innerHTML = response;
      },
      error: function () {
          // Handle error, if any
          document.querySelector('.companys-list').innerHTML = '<p>Error loading companies.</p>';
      }
  });
}


// Add a function to reset the filters and show all companies
function resetFilters() {
  document.getElementById('company-size').value = '';
  document.getElementById('company-name').value = '';
  filterCompanies(); // Trigger the filtering function after resetting
}





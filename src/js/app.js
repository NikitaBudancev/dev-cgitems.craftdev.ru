import $ from "jquery";
import "slick-carousel";
import { Fancybox } from "@fancyapps/ui/src/Fancybox/Fancybox.js";
import "dm-file-uploader";

$(function () {
  $(".accordion__title").on("click", function (e) {
    e.preventDefault();
    let $this = $(this);

    // if (!$this.hasClass("accordion-active")) {
    //   $(".accordion__content").slideUp(300);
    //   $(".accordion__title").removeClass("accordion-active");
    //   $('.accordion__arrow').removeClass('accordion__rotate');
    // }

    $this.toggleClass("accordion-active");
    $this.next().slideToggle();
    $(".accordion__arrow", this).toggleClass("accordion__rotate");
  });

  // ==================== Slider =========================

  function slickSliderCounter(selector, params) {
    let $slider = $(selector);

    if ($slider.length) {
      let currentSlide;
      let slidesCount;
      let sliderCounter = document.createElement("div");
      sliderCounter.classList.add("slider__counter");

      let updateSliderCounter = function (slick, currentIndex) {
        currentSlide = slick.slickCurrentSlide() + 1;
        slidesCount = slick.slideCount;
        $(sliderCounter).text(currentSlide + "/" + slidesCount);
      };

      $slider.on("init", function (event, slick) {
        $slider.append(sliderCounter);
        updateSliderCounter(slick);
      });

      $slider.on("afterChange", function (event, slick, currentSlide) {
        updateSliderCounter(slick, currentSlide);
      });
    }

    $slider.slick(params);
  }

  slickSliderCounter(".reviews__list-slider", {
    slidesToShow: 4,
    prevArrow:
      '<button class="btn-slider btn-slider-prev"><span class="btn-slider-arrow btn-slider-arrow-prev"></span></button>',
    nextArrow:
      '<button class="btn-slider btn-slider-next"><span class="btn-slider-arrow btn-slider-arrow-next"></span></button>',
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1680,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  Fancybox.bind(
    ".projects__list-slider .slick-slide:not(.slick-cloned) .image-expand",
    {
      groupAll: true, // Group all items
    }
  );

  slickSliderCounter(".projects__list-slider", {
    slidesToShow: 1,
    prevArrow:
      '<button class="btn-slider btn-slider-prev"><span class="btn-slider-arrow btn-slider-arrow-prev"></span></button>',
    nextArrow:
      '<button class="btn-slider btn-slider-next"><span class="btn-slider-arrow btn-slider-arrow-next"></span></button>',
  });

  // ==================== Slider =========================

  $(".mobile-search").on("click", function () {
    $(".form-search-header").fadeToggle(300);
    $(".fade").fadeToggle(300);
    $(".header__form-control").focus();
  });

  $(".fade").on("click", function () {
    $(".form-search-header").fadeOut(300);
    $(".fade").fadeOut(300);
  });

  const p1 = document.querySelector(".page1");
  let startingX = 0;

  function hanleTouchStart(e) {
    startingX = e.touches[0].clientX;
  }

  function hanleTouchMove(e) {
    let touch = e.touches[0];
    let change = startingX - touch.clientX;
    if (change < 0) {
      return;
    }

    p1.style.left = "-" + change + "px";
    e.preventDefault();
  }

  function hanleTouchEnd(e) {
    let change = startingX - e.changedTouches[0].clientX;
    let treshold = screen.width / 3;
    if (change < treshold) {
      p1.style.left = 0;
      p1.style.opacity = 1;
      $("body").css({ overflow: "hidden" });
    } else {
      p1.style.left = "-95%";
      p1.style.opacity = 0;
      $("body").css({ overflow: "initial" });
    }
  }

  p1.addEventListener("touchstart", hanleTouchStart, false);
  p1.addEventListener("touchmove", hanleTouchMove, false);
  p1.addEventListener("touchend", hanleTouchEnd, false);

  $(".menu__btn").on("click", function () {
    $(".page1").css({ left: 0, opacity: 1 });
    $("body").css({ overflow: "hidden" });
  });

  $(".btn-course-mobile,.btn-course").on("click", function () {
    $.fancybox.open({
      src: ".modal-course",
      type: "inline",
    });
  });

  $(".btn-scroll-up").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
    $(".content-scroll, .scroll-up").animate({ scrollTop: 0 }, 500);
  });

  $(".copy__url").on("click", function () {
    $(this).select();
  });

  $(".other__projects").on("click", function () {
    $(".sidebar__left-projects").addClass("active");
  });

  $(".comments__link").on("click", function () {
    $(".sidebar__left-comments").addClass("active");
  });

  $(".button-message").on("click", function () {
    $(".sidebar__left-message").addClass("active");
  });

  $(".sidebar-back").on("click", function () {
    $(this).parents(".sidebar__left").removeClass("active");
  });

  $(".replies-show").on("click", function () {
    $(this).parent().parent().find(".replies__list").toggleClass("active");
  });

  $(".articles__parent-btn").on("click", function () {
    $(this).parent().toggleClass("active");
  });
});

$("#drop-area").dmUploader({
  // url: "/path/to/backend/upload.asp",
  //... More settings here...

  onInit: function () {
    console.log("Callback: Plugin initialized");
  },

  // ... More callbacks
});

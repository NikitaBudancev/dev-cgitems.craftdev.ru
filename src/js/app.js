import $ from "jquery";
import "slick-carousel";
import { Fancybox } from "@fancyapps/ui/src/Fancybox/Fancybox.js";
import { DragAndDrop } from "./drag-and-drop.js";

const body = document.querySelector("body");

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
    $(".panel-sort-right-alphabet").fadeOut(200);
  });

  $(".panel-bar-alphabet").on("click", function () {
    $(".panel-sort-right-alphabet").fadeToggle(200);
    $(".fade").fadeToggle(200);
  });

  const dataSidebarBtns = document.querySelectorAll("[data-sidebar-btn]");

  dataSidebarBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let dataSidebarBtnValue = btn.getAttribute("data-sidebar-btn");

      let sidebar = document.querySelector(
        `[data-sidebar="${dataSidebarBtnValue}"]`
      );

      sidebar.style.left = 0;
      sidebar.style.opacity = 1;
      body.style.overflow = "hidden";

      let startingX = 0;

      function hanleTouchStart(e) {
        startingX = e.touches[0].clientX;
      }

      function hanleTouchMove(e) {
        let touch = e.touches[0];
        let change = startingX - touch.clientX;
        if (change < 80) {
          return;
        }

        sidebar.style.left = "-" + change + "px";
        e.preventDefault();
      }

      function hanleTouchEnd(e) {
        let change = startingX - e.changedTouches[0].clientX;
        let treshold = screen.width / 3;
        if (change < treshold) {
          sidebar.style.left = 0;
          sidebar.style.opacity = 1;
          $("body").css({ overflow: "hidden" });
        } else {
          sidebar.style.left = "-100%";
          sidebar.style.opacity = 0;
          $("body").css({ overflow: "initial" });
        }
      }

      sidebar.addEventListener("touchstart", hanleTouchStart, false);
      sidebar.addEventListener("touchmove", hanleTouchMove, false);
      sidebar.addEventListener("touchend", hanleTouchEnd, false);
    });
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

const element = document.querySelector(".upload-file__label");
const dragAndDrop = new DragAndDrop(element);
dragAndDrop.run();

const inputDragAndDrop = document.querySelector("#fileElem");
const dataSlide = document.querySelectorAll(".test__item[data-slide]");
const btnNavSlide = document.querySelectorAll(
  ".drag-and-drop__item[data-slide-nav]"
);

function addClassActive(element, elementList, className = "active") {
  elementList.forEach((btn) => {
    btn.classList.remove(className);
  });
  element.classList.add(className);
}

function removeClazz(selector, value) {
  selector.classList.remove(value);
}

btnNavSlide.forEach((btn) => {
  btn.addEventListener("click", () => {
    let dataSlideNav = btn.getAttribute("data-slide-nav");
    let activeSlide = document.querySelector(
      `.test__item[data-slide="${dataSlideNav}"]`
    );

    if (document.querySelector("#span-text")) {
      document.querySelector("#span-text").remove();
    }

    if (document.querySelector(".drag-and-drop__item.active-edit")) {
      removeClazz(
        document.querySelector(".drag-and-drop__item.active-edit"),
        "active-edit"
      );
    }

    addClassActive(btn, btnNavSlide);
    addClassActive(activeSlide, dataSlide);
  });
});

const btnExitSlide = document.querySelectorAll(".test__item-btn-exit");

btnExitSlide.forEach((btn) => {
  btn.addEventListener("click", () => {
    let slideActive = btn.closest(".test__item");
    let btnActive = document.querySelector(
      `.drag-and-drop__item[data-slide-nav="${slideActive.getAttribute(
        "data-slide"
      )}"]`
    );

    removeClazz(btnActive, "active");
    removeClazz(slideActive, "active");
  });
});

const btnEditSlide = document.querySelectorAll(".test__item-btn-edit");
const spanText = document.createElement("span");
spanText.innerHTML = "Выберите файл";
spanText.className = "drag-and-drop__item-text";
spanText.id = "span-text";

btnEditSlide.forEach((btn) => {
  btn.addEventListener("click", () => {
    let slideActive = btn.closest(".test__item");
    let btnActive = document.querySelector(
      `.drag-and-drop__item[data-slide-nav="${slideActive.getAttribute(
        "data-slide"
      )}"]`
    );

    addClassActive(btnActive, btnNavSlide, "active-edit");
    btnActive.append(spanText);
    // btnActive.querySelector("img").style.filter = "brightness(50%)";
    removeClazz(slideActive, "active");

    if (document.querySelector(".drag-and-drop__item.active-edit")) {
      // console.log(inputDragAndDrop);
      inputDragAndDrop.addEventListener("change", () => {
        console.log(inputDragAndDrop);
      });
    }
  });
});

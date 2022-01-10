$(function () {

  $(".accordion__title").on("click", function (e) {

    e.preventDefault();
    let $this = $(this);

    if (!$this.hasClass("accordion-active")) {
      $(".accordion__content").slideUp(300);
      $(".accordion__title").removeClass("accordion-active");
      $('.accordion__arrow').removeClass('accordion__rotate');
    }

    $this.toggleClass("accordion-active");
    $this.next().slideToggle();
    $('.accordion__arrow', this).toggleClass('accordion__rotate');
  });

  let $slider = $('.reviews__list');

  if ($slider.length) {
    let currentSlide;
    let slidesCount;
    let sliderCounter = document.createElement('div');
    sliderCounter.classList.add('slider__counter');

    let updateSliderCounter = function (slick, currentIndex) {
      currentSlide = slick.slickCurrentSlide() + 1;
      slidesCount = slick.slideCount;
      $(sliderCounter).text(currentSlide + '/' + slidesCount)
    };

    $slider.on('init', function (event, slick) {
      $slider.append(sliderCounter);
      updateSliderCounter(slick);
    });

    $slider.on('afterChange', function (event, slick, currentSlide) {
      updateSliderCounter(slick, currentSlide);
    });

    $slider.slick({
      slidesToShow: 4,
      prevArrow: '<button class="btn-slider btn-slider-prev"><span class="btn-slider-arrow btn-slider-arrow-prev"></span></button>',
      nextArrow: '<button class="btn-slider btn-slider-next"><span class="btn-slider-arrow btn-slider-arrow-next"></span></button>'
    });
  }

})
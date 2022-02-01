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
    $('.accordion__arrow', this).toggleClass('accordion__rotate');
  });

  let $slider = $('.reviews__list-slider');

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
      nextArrow: '<button class="btn-slider btn-slider-next"><span class="btn-slider-arrow btn-slider-arrow-next"></span></button>',
      responsive: [
        {
          breakpoint: 2000,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 1680,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 1,
          }
        },
      ]
    });
  }


  $('.mobile-search').on('click', function () {
    $('.form-search-header').fadeToggle(300);
    $('.fade').fadeToggle(300);
    $('.header__form-control').focus();
  })

  $('.fade').on('click', function () {
    $('.form-search-header').fadeOut(300);
    $('.fade').fadeOut(300);
  })


  const p1 = document.querySelector('.page1');

  function hanleTouchStart(e) {
    startingX = e.touches[0].clientX;
  }

  function hanleTouchMove(e) {
    let touch = e.touches[0];
    let change = startingX - touch.clientX;
    if (change < 0) {
      return;
    };

    p1.style.left = '-' + change + 'px';
    e.preventDefault();
  }


  function hanleTouchEnd(e) {
    let change = startingX - e.changedTouches[0].clientX;
    let treshold = screen.width / 3;
    if (change < treshold) {
      p1.style.left = 0;
      p1.style.opacity = 1;
      $('body').css({ 'overflow': 'hidden' });
    } else {
      p1.style.left = '-95%';
      p1.style.opacity = 0;
      $('body').css({ 'overflow': 'initial' });
    }
  }

  p1.addEventListener("touchstart", hanleTouchStart, false);
  p1.addEventListener("touchmove", hanleTouchMove, false);
  p1.addEventListener("touchend", hanleTouchEnd, false);


  $('.menu__btn').on('click', function () {
    $('.page1').css({ 'left': 0, 'opacity': 1 });
    $('body').css({ 'overflow': 'hidden' });
  })

  $('.btn-course-mobile,.btn-course').on('click', function () {
    $.fancybox.open({
      src: '.modal-course',
      type: 'inline'
    });
  });



  $('.reviews__list').masonry({
    itemSelector: '.reviews__item',
    columnWidth: '.reviews__item',
    gutter: 16
  });

  $('.btn-scroll-up').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 500);
    $('.content-scroll').animate({ scrollTop: 0 }, 500);
  });



  $('.copy__url').on('click', function () {
    $(this).select()
  })
})

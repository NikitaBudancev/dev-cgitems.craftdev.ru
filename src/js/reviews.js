import $ from 'jquery';
import Masonry from 'masonry-layout';
import jQueryBridget from 'jquery-bridget';
import imagesLoaded from 'imagesloaded';


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

jQueryBridget('masonry', Masonry, $);
jQueryBridget('imagesLoaded', imagesLoaded, $);

const $container = $('.reviews__list-review');

$container.imagesLoaded(() => {
    $container.masonry({
        itemSelector: '.reviews__item',
        columnWidth: '.reviews__item',
        gutter: 16
    });
});
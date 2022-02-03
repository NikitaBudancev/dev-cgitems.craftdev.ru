import FBXLoader from './module/FBXLoader.js';

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



  $('.reviews__list-review').masonry({
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


  console.log(FBXLoader);


  // var scene = new THREE.Scene();
  // var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  // var renderer = new THREE.WebGLRenderer();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  // var geometry = new THREE.BoxGeometry(1, 1, 1);
  // var material = new THREE.MeshBasicMaterial({ color: 0xc1c1cc });
  // var cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  // camera.position.z = 5;

  // var animate = function () {
  //   requestAnimationFrame(animate);

  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;

  //   renderer.render(scene, camera);
  // };

  // animate();

  // loader.load('Test.fbx', function (object) {
  //   object.traverse(function (child) {
  //     if (child.isMesh) {
  //       child.castShadow = true;
  //       child.receiveShadow = false;
  //       child.flatshading = true;
  //     }
  //   });

  //   scene.add(object);
  // });

})



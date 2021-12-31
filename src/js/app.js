$(function () {

  $(".accordion__title").on("click", function (e) {

    e.preventDefault();
    var $this = $(this);

    if (!$this.hasClass("accordion-active")) {
      $(".accordion__content").slideUp(300);
      $(".accordion__title").removeClass("accordion-active");
      $('.accordion__arrow').removeClass('accordion__rotate');
    }

    $this.toggleClass("accordion-active");
    $this.next().slideToggle();
    $('.accordion__arrow', this).toggleClass('accordion__rotate');
  });

//   $('.reviews__list').owlCarousel({
//   loop: true,
//     margin: 10,
//     nav: true,
// })

})
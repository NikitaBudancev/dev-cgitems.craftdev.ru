import Masonry from 'masonry-layout';


const masonryElem = document.querySelector('.reviews__list-review');

const reviewsMasonryLayout = new Masonry(masonryElem, {
    itemSelector: '.reviews__item',
    columnWidth: '.reviews__item',
    gutter: 16
});

reviewsMasonryLayout.layout();
import $ from 'jquery';
import Masonry from 'masonry-layout';
import jQueryBridget from 'jquery-bridget';
import imagesLoaded from 'imagesloaded';

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
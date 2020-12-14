//
$('.slider').slick({

infinite: false,
dots: true,
dotsClass: 'maindots',
slidesToShow: 3,
slidesToScroll: 1,
cssEase: 'linear',
arrows: true,
responsive: [
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ],


prevArrow: '<button class="arrow_left" type="button"><i class="fas fa-chevron-left"></i></button>',
nextArrow: '<button class="arrow_right" type="button"><i class="fas fa-chevron-right"></i></button>'

});

$('.product_slider').slick({
    infinite: false,
    dots: true,
    dotsClass: 'maindots',
    slidesToScroll: 1,
    cssEase: 'linear',
    // arrows: true,

    // prevArrow: '<button class="arrow_left arrow_left_product" type="button"><i class="fas fa-chevron-left"></i></button>',
    // nextArrow: '<button class="arrow_right arrow_right_product" type="button"><i class="fas fa-chevron-right"></i></button>'

});
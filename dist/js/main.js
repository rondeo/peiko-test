$(document).ready(function() {

    let burger = $('.burger');
    let close = $('.close');
    let menu = $('.menu-wrap');
    let up = $('.up');

    if (burger.is(':visible')) {
        burger.addClass('show');
    }

    burger.on('click', function() {
        menu.show();
    })

    close.on('click', function() {
        menu.hide();
    })

    $('.navbar-item').on('click', function(e) {
        e.preventDefault();
        let id  = $(this).attr('href');
        let top = $(id).offset().top;
        $('body').animate({
            scrollTop: top
        }, 300)
    });

    up.on('click', function() {
        $('body').animate({
            scrollTop: 0
        }, 300)
    })

    $(window).on('scroll', function() {
        if ($(this).scrollTop() >= 500) {
            up.show()
        }
        else {
            up.hide();
        }
    })


    $('.slider-one').slick({
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        speed: 700,
        dots: false,
        arrows: true,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    arrows: false,
                    slidesToShow: 3,
                }
            }
        ]
    });

    $('.slider-two').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1300,
        dots: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    $('.slider-three').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1300,
        dots: true,
        arrows: true,
        responsive: [
            {
              breakpoint: 10000,
              settings: "unslick"
            },
            {
                breakpoint: 1200,
                settings: "slick",
            },
            {
                breakpoint: 940,
                settings: {
                  speed: 300,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  arrows: false
                }
              
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    });

});

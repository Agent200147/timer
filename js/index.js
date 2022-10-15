// const currentTimeContainer = document.querySelector('.timer__current-time')
//
// setInterval(() => {
//     let date = new Date()
//
//     let hours
//     let minutes
//     let seconds
//
//     date.getHours().toString().length === 2 ? hours = date.getMinutes() : hours = "0" + date.getHours()
//     date.getMinutes().toString().length === 2 ? minutes = date.getMinutes() : minutes = "0" + date.getMinutes()
//     date.getSeconds().toString().length === 2 ? seconds = date.getSeconds() : seconds = "0" + date.getSeconds()
//
//     let currentTime
//
//     currentTime = `${date.getHours()}:${minutes}:${seconds}`
//     currentTimeContainer.innerHTML = currentTime
// }, 1000)

const timer__hours = document.querySelector('.swiper-wrapper__hours')
const timer__minutes = document.querySelector('.swiper-wrapper__minutes')
const timer__seconds = document.querySelector('.swiper-wrapper__seconds')

for (let i = 0; i < 24; i++) {
    i < 10 ? i = '0' + i : i
    timer__hours.innerHTML += `<div class="timer__hours-item swiper-slide">${i}</div>`
}

for (let i = 0; i < 60; i++) {
    i < 10 ? i = '0' + i : i
    timer__minutes.innerHTML += `<div class="timer__minutes-item swiper-slide">${i}</div>`
}

for (let i = 0; i < 60; i++) {
    i < 10 ? i = '0' + i : i
    timer__seconds.innerHTML += `<div class="timer__seconds-item swiper-slide">${i}</div>`
}

// $(function(){
//     $('.timer__item').slick({
//         vertical: true,
//         verticalSwiping: true,
//         arrows: false,
//         dots: false,
//         infinite: true,
//
//         autoplay: false,
//         // autoplaySpeed: 5000,
//         // touchThreshold: 10,
//         // speed: 200,
//         pauseOnFocus: false,
//         pauseOnHover: false,
//
//         slidesToShow: 3,
//         // slidesToScroll: auto,
//
//         swipe: true,
//         swipeToSlide: true,
//         // TouchMove: true,
//         // centerMode: true,
//         // centerPadding: '60px',
//         responsive: [
//             {
//                 breakpoint: 576,
//                 settings: {
//                     speed: 200,
//                     autoplay: false,
//                     infinite: false,
//                 }
//             },
//         ]
//     })
//
// })

var mySwiper = new Swiper('.swiper', {
    direction: 'vertical',
    speed: 500,
    slidesPerView: 5,
    loopedSlides: 60,
    // spaceBetween: 65,
    loop: true,
    freeMode: {
        enabled: true,
        sticky: true,
    },
    //
    // effect: 'coverflow',
    // coverflowEffect: {
    //     rotate: 30,
    //     slideShadows: false,
    //     depth: 100,
    // },
});



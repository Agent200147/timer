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

// for (let i = 0; i < 24; i++) {
//     i < 10 ? i = '0' + i : i
//     timer__hours.innerHTML += `<div class="timer__hours-item swiper-slide">${i}</div>`
// }
//
// for (let i = 0; i < 60; i++) {
//     i < 10 ? i = '0' + i : i
//     timer__minutes.innerHTML += `<div class="timer__minutes-item swiper-slide">${i}</div>`
// }
//
// for (let i = 0; i < 60; i++) {
//     i < 10 ? i = '0' + i : i
//     timer__seconds.innerHTML += `<div class="timer__seconds-item swiper-slide">${i}</div>`
// }

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
    // effect: 'flip',
    // coverflowEffect: {
    //     rotate: 30,
    //     slideShadows: false,
    //     depth: 100,
    // },
});

const timer = document.getElementById('timer__counter')
const timerBtnWrapper = document.querySelectorAll('.btn-wrapper')
// const timerBtnStopWrapper = document.querySelector('.btn-stop-wrapper')
const timerBtn = document.querySelectorAll('.timer__btn')
const timerBtnPlay = document.querySelector('.timer__btn.btn-play')
const timerBtnPlayIcon = document.querySelector('.timer__btn-icon')

const timerHours = document.getElementById('hours')
const timerMinutes = document.getElementById('minutes')
const timerSeconds = document.getElementById('seconds')


var timerInterval

function timerStart() {
    timerInterval = setInterval(() => {
        if(timerSeconds.value == 0){
            timerMinutes.value --
            timerSeconds.value = 59
            return
        }

        timerSeconds.value --

    }, 1000)
    console.log("play")
}

function timerStop() {
    clearInterval(timerInterval)
}

timerBtnPlay.addEventListener('click', function () {

    if(!timerBtnPlayIcon.classList.contains('paused')){
        timerStart()
    }
    else{
        timerStop()
        console.log("pause")
    }

    timerBtnPlayIcon.classList.toggle('paused')
})

timerBtnWrapper.forEach((btn) => {
    btn.addEventListener('mousedown', () => {
        btn.classList.add('tapped')
        // timerBtnPlay.style.boxShadow = "inset 0px 0px 0px #ad8dbd, inset 0px -0px 0px #ebbfff"
        // timerBtnPlay.style.boxShadow = "inset 3px 3px 6px #ad8dbd, inset -4px -4px 7px #ebbfff"
        // btn.parentNode.style.transform = "scale(0.97)"
    })

    btn.addEventListener('mouseup', () => {
        btn.classList.remove('tapped')

        // btn.style.boxShadow = " 2px 2px 2px 0 #bc9ac5, -2px -2px 3px 0 #ddb5e8"
        // btn.parentNode.style.transform = "scale(1)"
    })
})




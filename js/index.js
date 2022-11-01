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
const timerSliderMinutes = document.querySelector('.slider-wrapper__minutes')
const timerSliderSeconds = document.querySelector('.slider-wrapper__seconds')

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



const timer = document.getElementById('timer__counter')
const timerBtnWrapper = document.querySelectorAll('.btn-wrapper')
// const timerBtnStopWrapper = document.querySelector('.btn-stop-wrapper')
const timerBtn = document.querySelectorAll('.timer__btn')
const timerBtnPlay = document.querySelector('.timer__btn.btn-play')
const timerBtnStop = document.querySelector('.timer__btn.btn-stop')
const timerBtnPlayIcon = document.querySelector('.timer__btn-icon')

const timerHours = document.getElementById('hours')
const timerMinutes = document.getElementById('minutes')
const timerSeconds = document.getElementById('seconds')

// for (let i = 0; i < 5; i++) {
//     i < 10 ? i = '0' + i : i
//
//     timer__seconds.innerHTML += `<div class="timer__seconds-item swiper-slide">${i}</div>`
// }

var timerInterval


const mySwiper1 = document.querySelector('.swiper')

// var mySwiper = new Swiper('.swiper', {
//     direction: 'vertical',
//     speed: 500,
//     slidesPerView: 1,
//     loopedSlides: 60 ,
//     // spaceBetween: 65,
//     loop: true,
//     freeMode: {
//         enabled: true,
//         sticky: true,
//     },
//
//     // initialSlide: 4,
//     //
//     // effect: 'flip',
//     // // coverflowEffect: {
//     // //     rotate: 30,
//     // //     slideShadows: false,
//     // //     depth: 100,
//     // // },
// });

timerSeconds.addEventListener('input', () => {
    // timer__seconds.innerHTML = " "
    // for (let i = 0; i <= timerSeconds.value; i++) {
    //     i < 10 ? i = '0' + i : i
    //     timer__seconds.innerHTML += `<div class="timer__seconds-item swiper-slide">${i}</div>`
    // }
    // mySwiper.slideTo(timerSeconds.value + 1)

    // timerSeconds.value < 10 ? timerSeconds.value = "0" + timerSeconds.value : timerSeconds.value
    // console.log(03 < 10)
})

for (let i = 0; i < 60; i++) {
    i < 10 ? i = '0' + i : i
    timerSliderMinutes.innerHTML += `<div class="timer__minutes-slide">${i}</div>`
}

for (let i = 0; i < 60; i++) {
    i < 10 ? i = '0' + i : i
    timerSliderSeconds.innerHTML += `<div class="timer__seconds-slide">${i}</div>`
}

const firstSlideMinutes = document.querySelector('.timer__minutes-slide')
const firstSlideSeconds = document.querySelector('.timer__seconds-slide')

var hours_i = 0
var minutes_i = 0
var seconds_i = 0
const sliderHeight = 64

function timerStart() {


    if(minutes_i == 0 || timerMinutesChanged){
        firstSlideMinutes.style.marginTop = `-${timerMinutes.value * sliderHeight}px`
        minutes_i = -timerMinutes.value * sliderHeight
    }
    else{
        firstSlideMinutes.style.marginTop = `${minutes_i}px`
    }

    if(seconds_i == 0 || timerSecondsChanged){
        firstSlideSeconds.style.marginTop = `-${timerSeconds.value * sliderHeight}px`
        seconds_i = -timerSeconds.value * sliderHeight
    }

    timerSecondsChanged = false
    timerMinutesChanged = false

    timerSeconds.style.display = 'none'
    timerMinutes.style.display = 'none'
    timerSliderSeconds.style.display = 'block'
    timerSliderMinutes.style.display = 'block'

    timerInterval = setInterval(() => {
        // if(timerSeconds.value == 0){
        //     timerMinutes.value --
        //     timerSeconds.value = 59
        //     return
        // }
        //
        // mySwiper.slidePrev();
        //
        // // timerSeconds.value --

        seconds_i = seconds_i + sliderHeight
        if(seconds_i == sliderHeight){
            minutes_i = minutes_i + sliderHeight
            firstSlideMinutes.style.marginTop = `${minutes_i}px`
            seconds_i = -59 * sliderHeight
        }
        firstSlideSeconds.style.marginTop = `${seconds_i}px`

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

timerBtnStop.addEventListener('click', () => {
    timerSeconds.value = ""
    timerMinutes.value = ""
    timerHours.value = ""

    // console.log()
    timerSeconds.style.display = 'block'
    timerMinutes.style.display = 'block'
    timerHours.style.display = 'block'
    timerSliderSeconds.style.display = 'none'
    timerSliderMinutes.style.display = 'none'

    timerSecondsChanged = true
    timerMinutesChanged = true
    timerStop()
    timerBtnPlayIcon.classList.remove('paused')
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

var timerSecondsChanged = false
var timerMinutesChanged = false

timerSliderSeconds.addEventListener('click', () => {
    if(!timerBtnPlayIcon.classList.contains('paused')){

        // firstSlideMinutes.style.marginTop = `-${timerMinutes.value * sliderHeight}px`
        // firstSlideSeconds.style.marginTop = `-${timerSeconds.value * sliderHeight}px`
        timerSeconds.value = parseInt(firstSlideSeconds.style.marginTop.match(/\d+/)) / sliderHeight
        timerMinutes.value = parseInt(firstSlideMinutes.style.marginTop.match(/\d+/)) / sliderHeight

        // console.log()
        timerSeconds.style.display = 'block'
        timerSeconds.focus()
        timerMinutes.style.display = 'block'
        timerSliderSeconds.style.display = 'none'
        timerSliderMinutes.style.display = 'none'

        timerSecondsChanged = true
        timerMinutesChanged = true

    }

})





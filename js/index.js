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

const timerSliderHours = document.querySelector('.slider-wrapper__hours')
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



const timer = document.getElementById('timer__counter')
const timerBtnWrapper = document.querySelectorAll('.btn-wrapper')
const timerBtn = document.querySelectorAll('.timer__btn')
const timerBtnPlay = document.querySelector('.timer__btn.btn-play')
const timerBtnStop = document.querySelector('.timer__btn.btn-stop')
const timerBtnPlayIcon = document.querySelector('.timer__btn-icon')

const timerHours = document.getElementById('hours')
const timerMinutes = document.getElementById('minutes')
const timerSeconds = document.getElementById('seconds')

const timerSliderItems = [timerSliderHours, timerSliderMinutes, timerSliderSeconds]
const timerInputItems = [timerHours, timerMinutes, timerSeconds]

for (let i = 0; i < 100; i++) {
    i < 10 ? i = '0' + i : i
    timerSliderHours.innerHTML += `<div class="timer__hours-slide">${i}</div>`
}

for (let i = 0; i < 60; i++) {
    i < 10 ? i = '0' + i : i
    timerSliderMinutes.innerHTML += `<div class="timer__minutes-slide">${i}</div>`
}

for (let i = 0; i < 60; i++) {
    i < 10 ? i = '0' + i : i
    timerSliderSeconds.innerHTML += `<div class="timer__seconds-slide">${i}</div>`
}

var timerInterval

const firstSlideHours = document.querySelector('.timer__hours-slide')
const firstSlideMinutes = document.querySelector('.timer__minutes-slide')
const firstSlideSeconds = document.querySelector('.timer__seconds-slide')

var hours_i = 0
var minutes_i = 0
var seconds_i = 0
const sliderHeight = 64

var timerSecondsIsChanged = false
var timerMinutesIsChanged = false
var timerHoursIsChanged = false

function timerStart() {

    if(hours_i == 0 || timerHoursIsChanged){
        firstSlideHours.style.marginTop = `-${timerHours.value * sliderHeight}px`
       hours_i = -timerHours.value * sliderHeight
    }
    else{
        firstSlideHours.style.marginTop = `${hours_i}px`
    }


    if(minutes_i == 0 || timerMinutesIsChanged){
        firstSlideMinutes.style.marginTop = `-${timerMinutes.value * sliderHeight}px`
        minutes_i = -timerMinutes.value * sliderHeight
    }
    else{
        firstSlideMinutes.style.marginTop = `${minutes_i}px`
    }

    if(seconds_i == 0 || timerSecondsIsChanged){
        firstSlideSeconds.style.marginTop = `-${timerSeconds.value * sliderHeight}px`
        seconds_i = -timerSeconds.value * sliderHeight
    }

    timerSecondsIsChanged = false
    timerMinutesIsChanged = false
    timerHoursIsChanged = false

    timerSeconds.style.display = 'none'
    timerMinutes.style.display = 'none'
    timerHours.style.display = 'none'

    timerSliderSeconds.style.display = 'block'
    timerSliderMinutes.style.display = 'block'
    timerSliderHours.style.display = 'block'



    timerInterval = setInterval(() => {

        seconds_i = seconds_i + sliderHeight
        if(seconds_i == sliderHeight){
            minutes_i = minutes_i + sliderHeight
            firstSlideMinutes.style.marginTop = `${minutes_i}px`
            seconds_i = -59 * sliderHeight
        }

        if(minutes_i == sliderHeight){
            hours_i =  hours_i + sliderHeight
            firstSlideHours.style.marginTop = `${hours_i}px`
            minutes_i = -59 * sliderHeight
            firstSlideMinutes.style.marginTop = `${minutes_i}px`
        }
        firstSlideSeconds.style.marginTop = `${seconds_i}px`

    }, 1000)
    console.log("play")
}

function timerPause() {
    clearInterval(timerInterval)
}

function timerStop() {
    timerSeconds.value = ""
    timerMinutes.value = ""
    timerHours.value = ""

    // console.log()
    timerSeconds.style.display = 'block'
    timerMinutes.style.display = 'block'
    timerHours.style.display = 'block'

    timerSliderSeconds.style.display = 'none'
    timerSliderMinutes.style.display = 'none'
    timerSliderHours.style.display = 'none'

    timerSecondsIsChanged = true
    timerMinutesIsChanged = true
    timerHoursIsChanged = true

    timerPause()
    timerBtnPlayIcon.classList.remove('paused')
}

timerBtnPlay.addEventListener('click', function () {

    if(!timerBtnPlayIcon.classList.contains('paused')){
        if(timerHours.value == ""){
            timerHours.focus()
            return
        }

        if(timerMinutes.value == ""){
            timerMinutes.focus()
            return
        }

        if(timerSeconds.value == ""){
            timerSeconds.focus()
            return
        }

        timerStart()
    }
    else{
        timerPause()
        console.log("pause")
    }

    timerBtnPlayIcon.classList.toggle('paused')
})

timerBtnStop.addEventListener('click', timerStop)

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


timerSliderItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        if(!timerBtnPlayIcon.classList.contains('paused')){

            timerHoursCurrent = parseInt(firstSlideHours.style.marginTop.match(/\d+/)) / sliderHeight
            timerMinutesCurrent = parseInt(firstSlideMinutes.style.marginTop.match(/\d+/)) / sliderHeight
            timerSecondsCurrent = parseInt(firstSlideSeconds.style.marginTop.match(/\d+/)) / sliderHeight

            timerHours.value = timerHoursCurrent < 10 ? timerHoursCurrent = '0' + timerHoursCurrent : timerHoursCurrent
            timerMinutes.value = timerMinutesCurrent < 10 ? timerMinutesCurrent = '0' + timerMinutesCurrent : timerMinutesCurrent
            timerSeconds.value = timerSecondsCurrent < 10 ? timerSecondsCurrent = '0' + timerSecondsCurrent : timerSecondsCurrent

            timerSeconds.style.display = 'block'
            timerMinutes.style.display = 'block'
            timerHours.style.display = 'block'

            timerSliderSeconds.style.display = 'none'
            timerSliderMinutes.style.display = 'none'
            timerSliderHours.style.display = 'none'

            timerSecondsIsChanged = true
            timerMinutesIsChanged = true
            timerHoursIsChanged = true

            index === 0 ? timerHours.focus() :
            index === 1 ? timerMinutes.focus() :
            index === 2 ? timerSeconds.focus() : timerSeconds.focus()
        }
    })
})

timerInputItems.forEach((item) => {
    item.addEventListener('input', () => {
        item.value = item.value.replace(/[^0-9]/g, '')
        item.value = item.value.slice(0, 2)

        if(item.id == "hours")
            item.value > 99 ? item.value = 99 : item.value
        else
            item.value > 59 ? item.value = 59 : item.value

        // console.log(item.value)
    })
})






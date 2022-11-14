const currentTimeContainer = document.querySelector('.timer__current-time')

setInterval(() => {
    let date = new Date()

    let hours
    let minutes
    let seconds

    date.getHours().toString().length === 2 ? hours = date.getHours() : hours = "0" + date.getHours()
    date.getMinutes().toString().length === 2 ? minutes = date.getMinutes() : minutes = "0" + date.getMinutes()
    date.getSeconds().toString().length === 2 ? seconds = date.getSeconds() : seconds = "0" + date.getSeconds()

    let currentTime

    currentTime = `${hours}:${minutes}:${seconds}`
    currentTimeContainer.innerHTML = currentTime
}, 1000)

const timerSliderHours = document.querySelector('.slider-wrapper__hours')
const timerSliderMinutes = document.querySelector('.slider-wrapper__minutes')
const timerSliderSeconds = document.querySelector('.slider-wrapper__seconds')


const timer = document.getElementById('timer__self')
const timerBtnWrapper = document.querySelectorAll('.btn-wrapper')
const timerBtn = document.querySelectorAll('.timer__btn')
const timerBtnPlay = document.querySelector('.timer__btn.btn-play')
const timerBtnStop = document.querySelector('.timer__btn.btn-stop')
const timerBtnPlayIcon = document.querySelector('.timer__btn-icon')

const timerHours = document.getElementById('hours')
const timerMinutes = document.getElementById('minutes')
const timerSeconds = document.getElementById('seconds')

const dots = document.querySelectorAll('.dots')

const timerSliderItems = [timerSliderHours, timerSliderMinutes, timerSliderSeconds]
const timerInputItems = [timerHours, timerMinutes, timerSeconds]

for (let i = 0; i < 100; i++) {
    i < 10 ? i = '0' + i : i
    timerSliderHours.innerHTML += `<div class="timer__hours-slide">${i}</div>`
}

for (let i = 0; i < 60; i++) {
    i < 10 ? i = '0' + i : i
    timerSliderMinutes.innerHTML += `<div class="timer__minutes-slide">${i}</div>`
    timerSliderSeconds.innerHTML += `<div class="timer__seconds-slide">${i}</div>`
}

var timerInterval

const firstSlideHours = document.querySelector('.timer__hours-slide')
const firstSlideMinutes = document.querySelector('.timer__minutes-slide')
const firstSlideSeconds = document.querySelector('.timer__seconds-slide')

var hours_i = 0
var minutes_i = 0
var seconds_i = 0
const sliderHeight = 74

var timerSecondsIsChanged = false
var timerMinutesIsChanged = false
var timerHoursIsChanged = false

var timerProgress = document.querySelector('.circle_animation')
var timerProgressSvg = document.querySelector('.svg')
const initialOffset = 1508
var i = 1

// timer.addEventListener('click', () => {
//     timer.onmouseover = () => {
//         timer.style.cursor = 'auto'
//     }
// })

function timerStart() {

    if(i == 1 || timerHoursIsChanged){
        firstSlideHours.style.marginTop = `-${timerHours.value * sliderHeight}px`
        hours_i = -timerHours.value * sliderHeight
    }
    else{
        firstSlideHours.style.marginTop = `${hours_i}px`
    }


    if(i == 1 || timerMinutesIsChanged){
        firstSlideMinutes.style.marginTop = `-${timerMinutes.value * sliderHeight}px`
        minutes_i = -timerMinutes.value * sliderHeight
    }
    else{
        firstSlideMinutes.style.marginTop = `${minutes_i}px`
    }

    if(i == 1 || timerSecondsIsChanged){
        firstSlideSeconds.style.marginTop = `-${timerSeconds.value * sliderHeight}px`
        seconds_i = -timerSeconds.value * sliderHeight
    }

    // if(i != 1 && minutes_i == -64){
    //     firstSlideMinutes.style.marginTop = '0px'
    //     console.log("i")
    // }
    if(timerHoursIsChanged || timerMinutesIsChanged || timerSecondsIsChanged){
        i = 1
        timerProgress.style.strokeDashoffset = 0
    }
    let totalSeconds = Number(timerHours.value * 3600) + Number(timerMinutes.value * 60)  + Number(timerSeconds.value)

    // timerProgress.style.strokeDashoffset = '0'

    timerSecondsIsChanged = false
    timerMinutesIsChanged = false
    timerHoursIsChanged = false

    timerSeconds.style.display = 'none'
    timerMinutes.style.display = 'none'
    timerHours.style.display = 'none'

    timerSliderSeconds.style.display = 'block'
    timerSliderMinutes.style.display = 'block'
    timerSliderHours.style.display = 'block'

    dots.forEach((item, index) => {
        // item.style.opacity = '1'
        if(index === 0){
            item.style.animation = 'dotsRotate2 1s infinite cubic-bezier(.65, 1.95, .03, .82)'
            return
        }
        item.style.animation = 'dotsRotate1 1s infinite cubic-bezier(.65, 1.95, .03, .82)'

    })

    timerSliderHours.style.animation = 'inputAppear1 0.2s forwards'
    timerSliderMinutes.style.animation = 'inputAppear2 0.2s forwards'
    timerSliderSeconds.style.animation = 'inputAppear3 0.2s forwards'

    timerProgress.style.transition = 'all 1s linear'

    if(i != 1){
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

        timerProgress.style.strokeDashoffset = initialOffset * i/totalSeconds
        i++
    }


    timerInterval = setInterval(() => {
        if( hours_i == 0 && minutes_i == 0 && seconds_i == 0){
            timerStop()
            // timer.style.animation = 'beep 0.5s infinite cubic-bezier(.5, .5, .82, .3)'
            // timerProgress.style.animation = 'beep2 0.5s infinite cubic-bezier(.5, .5, .82, .3)'
            timerProgress.style.strokeDashoffset = '1508'

            timer.style.animation = 'timerBeep 0.75s infinite ease-in-out'
            timerProgressSvg.style.animation = 'progressBeep 0.75s infinite ease-in-out'

            timer.addEventListener('mouseover', () => {
                timer.style.cursor = 'pointer'
            }, {once: true})


            timer.addEventListener('click', () => {
                timerProgress.style.strokeDashoffset = '0'
                timer.style.animation = 'none'
                timer.style.cursor = 'auto'
                timerProgressSvg.style.animation = 'none'
            }, {once: true})
            return
        }
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

        timerProgress.style.strokeDashoffset = initialOffset * i/totalSeconds
        i++
        console.log(hours_i,minutes_i, seconds_i)
    }, 1000)
    console.log("play")
}

function timerPause() {
    dots.forEach((item, index) => {
        // item.style.opacity = '1'
        // if(index === 0){
        //     item.style.animation = 'dotsStop1 0.2s forwards ease-in-out'
        //     return
        // }
        // item.style.animation = 'dotsStop2 0.2s forwards ease-in-out'
        item.style.animation = 'none'
    })
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

    timerProgress.style.transition = 'all 0.5s ease-in-out'
    timerProgress.style.strokeDashoffset = '0'

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

            var timerHoursCurrent = parseInt(firstSlideHours.style.marginTop.match(/\d+/)) / sliderHeight
            var timerMinutesCurrent = parseInt(firstSlideMinutes.style.marginTop.match(/\d+/)) / sliderHeight
            var timerSecondsCurrent = parseInt(firstSlideSeconds.style.marginTop.match(/\d+/)) / sliderHeight

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
    })
})

// -------------------------------------------------------------------

// const loader = document.querySelector('.loader')
// setInterval(() => {
//     loader.innerHTML = Math.round(Math.random() * 89) + 10
// }, 120)




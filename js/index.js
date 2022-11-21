// Собственные функции
function cl(n) {
    return console.log(n)
}

function qs(n) {
    return document.querySelector(n)
}

function qsAll(n) {
    return document.querySelectorAll(n)
}

function gbid(n) {
    return document.getElementById(n)
}

function hideTimerInputs() {
    timerSeconds.style.display = 'none'
    timerMinutes.style.display = 'none'
    timerHours.style.display = 'none'
}

function showTimerInputs() {
    timerSeconds.style.display = 'block'
    timerMinutes.style.display = 'block'
    timerHours.style.display = 'block'
}

function hideTimerUnits() {
    timerSliderSeconds.style.display = 'none'
    timerSliderMinutes.style.display = 'none'
    timerSliderHours.style.display = 'none'
}

function showTimerUnits() {
    timerSliderSeconds.style.display = 'block'
    timerSliderMinutes.style.display = 'block'
    timerSliderHours.style.display = 'block'
}

function hideSecundomerUnits() {
    secundomerSeconds.style.display = 'none'
    secundomerMinutes.style.display = 'none'
    secundomerHours.style.display = 'none'
}

function showSecundomerUnits() {
    secundomerSeconds.style.display = 'block'
    secundomerMinutes.style.display = 'block'
    secundomerHours.style.display = 'block'
}

// -----------------------------------------------

// Текуще время
const currentTimeContainer = qs('.timer__current-time')

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

// из DOM в переменные
const timerSliderHours = qs('.slider-wrapper__hours')
const timerSliderMinutes = qs('.slider-wrapper__minutes')
const timerSliderSeconds = qs('.slider-wrapper__seconds')

const secundomerHours = qs('.secundomer-wrapper__hours')
const secundomerMinutes = qs('.secundomer-wrapper__minutes')
const secundomerSeconds = qs('.secundomer-wrapper__seconds')

const timer = gbid('timer__self')
const timerBtnWrapper = qsAll('.btn-wrapper')
const timerBtn = qsAll('.timer__btn')

const timerBtnPlay = qs('.timer__btn.btn-play')
const timerBtnStop = qs('.timer__btn.btn-stop')
const timerBtnFlag = qs('.timer__btn.btn-flag')

const timerBtnPlayIcon = qs('.timer__btn-icon')

const secundomer__seconds_unit = qs('.secundomer__seconds-unit')
const secundomer__minutes_unit = qs('.secundomer__minutes-unit')
const secundomer__hours_unit = qs('.secundomer__hours-unit')

const flagsWrapper = qs('.flags__wrapper')

var timer_hours_i = 0
var timer_minutes_i = 0
var timer_seconds_i = 0

const sliderHeight = 74

var timerIsGoing = false
var secundomerIsGoing = false

setInterval(() => {
    console.log('timerIsGoing = ' + timerIsGoing,
    'secundomerIsGoing = ' + secundomerIsGoing)

}, 500)

var timerSecondsIsChanged = false
var timerMinutesIsChanged = false
var timerHoursIsChanged = false

var timerProgress = qs('.circle_animation')
var timerProgressSvg = qs('.svg')

const initialOffset = 1508
var i = 1

var timerInterval


// Inputs
const timerHours = gbid('hours')
const timerMinutes = gbid('minutes')
const timerSeconds = gbid('seconds')


for (let i = 0; i < 100; i++) {
    i < 10 ? i = '0' + i : i
    timerSliderHours.innerHTML += `<div class="timer__hours-unit unit__item">${i}</div>`
}

for (let i = 0; i < 60; i++) {
    i < 10 ? i = '0' + i : i
    timerSliderMinutes.innerHTML += `<div class="timer__minutes-unit unit__item">${i}</div>`
    timerSliderSeconds.innerHTML += `<div class="timer__seconds-unit unit__item">${i}</div>`
}

var firstSlideHours = qs('.timer__hours-unit')
var firstSlideMinutes = qs('.timer__minutes-unit')
var firstSlideSeconds = qs('.timer__seconds-unit')


// Переключатель табов
const menu = qs('.menu')
const menuItems = qsAll('.menu__item')
const wrapper = qs('.timer')

var currentPage
localStorage.getItem('currentPage')
    ? currentPage = localStorage.getItem('currentPage')
    : currentPage = 'firstTab'

menu.classList.remove('firstTab', 'secondTab', 'thirdTab')
wrapper.classList.remove('firstTab', 'secondTab', 'thirdTab')

menu.classList.add(localStorage.getItem('currentPage'))
wrapper.classList.add(localStorage.getItem('currentPage'))

menuItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        menu.classList.remove('firstTab', 'secondTab', 'thirdTab')
        wrapper.classList.remove('firstTab', 'secondTab', 'thirdTab')

        menu.classList.add(item.dataset.link)
        wrapper.classList.add(item.dataset.link)

        currentPage = item.dataset.link
        localStorage.setItem('currentPage', currentPage)

        if(currentPage == 'firstTab'){
            dots.forEach((item, index) => item.classList.remove('rotatingSecundomer'))

            showTimerInputs()
            hideTimerUnits()
            hideSecundomerUnits()

            if(timerIsGoing){
                dots.forEach((item, index) => item.classList.add('rotatingTimer'))
                timerBtnPlayIcon.classList.remove('paused')
                timerBtnPlayIcon.classList.add('paused')
                timerStart()
            }
            else{
                if(i != 1){
                    hideTimerInputs()
                    showTimerUnits()

                    firstSlideHours.style.marginTop = `${timer_hours_i}px`
                    firstSlideMinutes.style.marginTop = `${timer_minutes_i}px`
                    firstSlideSeconds.style.marginTop = `${timer_seconds_i}px`
                }
                timerBtnPlayIcon.classList.remove('paused')
            }
        }

        if(currentPage == 'secondTab'){
            dots.forEach((item, index) => item.classList.remove('rotatingTimer'))

            hideTimerInputs()
            hideTimerUnits()
            showSecundomerUnits()

            if(secundomer_seconds_i == 0 && secundomer_minutes_i == 0 && secundomer_hours_i == 0){
                timerBtnPlayIcon.classList.remove('paused')
                secundomer__seconds_unit.innerText = '00'
                secundomer__minutes_unit.innerText = '00'
                secundomer__hours_unit.innerText = '00'
            }
            else {
                timerBtnPlayIcon.classList.remove('paused')
                timerBtnPlayIcon.classList.add('paused')
                secundomer__seconds_unit.innerText = secundomer_seconds_i
                secundomer_minutes_i < 10
                    ? secundomer__minutes_unit.innerText = '0' + secundomer_minutes_i
                    : secundomer__minutes_unit.innerText = secundomer_minutes_i
                secundomer__hours_unit.innerText = secundomer_hours_i
                if(secundomerIsGoing){
                    secundomerStart()
                }
            }
        }
        cl(currentPage)
    })
})

if(currentPage == 'firstTab'){

}

if(currentPage == 'secondTab'){
    hideTimerInputs()
    hideSecundomerUnits()
}



const dots = qsAll('.dots')

const timerSliderItems = [timerSliderHours, timerSliderMinutes, timerSliderSeconds]
const timerInputItems = [timerHours, timerMinutes, timerSeconds]

function timerStart() {
    clearInterval(timerInterval)
    if(i == 1 || timerHoursIsChanged){
        firstSlideHours.style.marginTop = `-${timerHours.value * sliderHeight}px`
        timer_hours_i = -timerHours.value * sliderHeight
    }
    else{
        firstSlideHours.style.marginTop = `${timer_hours_i}px`
    }


    if(i == 1 || timerMinutesIsChanged){
        firstSlideMinutes.style.marginTop = `-${timerMinutes.value * sliderHeight}px`
        timer_minutes_i = -timerMinutes.value * sliderHeight
    }
    else{
        firstSlideMinutes.style.marginTop = `${timer_minutes_i}px`
    }

    if(i == 1 || timerSecondsIsChanged){
        firstSlideSeconds.style.marginTop = `-${timerSeconds.value * sliderHeight}px`
        timer_seconds_i = -timerSeconds.value * sliderHeight
    }


    if(timerHoursIsChanged || timerMinutesIsChanged || timerSecondsIsChanged){
        i = 1
        timerProgress.style.strokeDashoffset = 0
    }
    let totalSeconds = Number(timerHours.value * 3600) + Number(timerMinutes.value * 60)  + Number(timerSeconds.value)


    timerSecondsIsChanged = false
    timerMinutesIsChanged = false
    timerHoursIsChanged = false

    hideTimerInputs()
    showTimerUnits()

    dots.forEach((item, index) => {
        // item.style.opacity = '1'
        // if(index === 0){
        //     item.style.animation = 'dotsRotate2 1s infinite cubic-bezier(.65, 1.95, .03, .82)'
        //     return
        // }
        // item.style.animation = 'dotsRotate1 1s infinite cubic-bezier(.65, 1.95, .03, .82)'

        item.classList.add('rotatingTimer')

    })

    timerSliderHours.style.animation = 'inputAppear1 0.2s forwards'
    timerSliderMinutes.style.animation = 'inputAppear2 0.2s forwards'
    timerSliderSeconds.style.animation = 'inputAppear3 0.2s forwards'

    timerProgress.style.transition = 'all 1s linear'

    if(i != 1){
        timer_seconds_i = timer_seconds_i + sliderHeight
        if(timer_seconds_i == sliderHeight){
            timer_minutes_i = timer_minutes_i + sliderHeight
            firstSlideMinutes.style.marginTop = `${timer_minutes_i}px`
            timer_seconds_i = -59 * sliderHeight
        }

        if(timer_minutes_i == sliderHeight){
            timer_hours_i =  timer_hours_i + sliderHeight
            firstSlideHours.style.marginTop = `${timer_hours_i}px`
            timer_minutes_i = -59 * sliderHeight
            firstSlideMinutes.style.marginTop = `${timer_minutes_i}px`
        }
        firstSlideSeconds.style.marginTop = `${timer_seconds_i}px`

        timerProgress.style.strokeDashoffset = initialOffset * i/totalSeconds
        i++
    }

    timerIsGoing = true
    timerInterval = setInterval(() => {
        if( timer_hours_i == 0 && timer_minutes_i == 0 && timer_seconds_i == 0){
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

        timer_seconds_i = timer_seconds_i + sliderHeight
        if(timer_seconds_i == sliderHeight){
            timer_minutes_i = timer_minutes_i + sliderHeight
            firstSlideMinutes.style.marginTop = `${timer_minutes_i}px`
            timer_seconds_i = -59 * sliderHeight

        }

        if(timer_minutes_i == sliderHeight){
            timer_hours_i =  timer_hours_i + sliderHeight
            firstSlideHours.style.marginTop = `${timer_hours_i}px`
            timer_minutes_i = -59 * sliderHeight
            firstSlideMinutes.style.marginTop = `${timer_minutes_i}px`
        }
        firstSlideSeconds.style.marginTop = `${timer_seconds_i}px`

        timerProgress.style.strokeDashoffset = initialOffset * i/totalSeconds
        i++
        cl(timer_hours_i,timer_minutes_i, timer_seconds_i)
    }, 1000)
    cl("play")
}

function timerPause() {
    dots.forEach((item, index) => {
        // item.style.opacity = '1'
        // if(index === 0){
        //     item.style.animation = 'dotsStop1 0.2s forwards ease-in-out'
        //     return
        // }
        // item.style.animation = 'dotsStop2 0.2s forwards ease-in-out'
        // item.style.animation = 'none'

        item.classList.remove('rotatingTimer')

    })
    timerIsGoing = false
    clearInterval(timerInterval)
}

function timerStop() {
    i = 1
    timerSeconds.value = ""
    timerMinutes.value = ""
    timerHours.value = ""

    // console.log()
    showTimerInputs()
    hideTimerUnits()
    timerPause()

    timerSecondsIsChanged = true
    timerMinutesIsChanged = true
    timerHoursIsChanged = true

    timerProgress.style.transition = 'all 0.5s ease-in-out'
    timerProgress.style.strokeDashoffset = '0'

    timerBtnPlayIcon.classList.remove('paused')
}

timerBtnPlay.addEventListener('click', function () {
    if(currentPage === 'firstTab') {
        if (!timerBtnPlayIcon.classList.contains('paused')) {
            if (timerHours.value == "") {
                timerHours.focus()
                return
            }

            if (timerMinutes.value == "") {
                timerMinutes.focus()
                return
            }

            if (timerSeconds.value == "") {
                timerSeconds.focus()
                return
            }
            timerStart()
        }
        else {
            timerPause()
        }
    }

    if(currentPage === 'secondTab'){
        if (!timerBtnPlayIcon.classList.contains('paused')) {
            secundomerStart()
        }
        else {
            secundomerPause()
        }
    }
    timerBtnPlayIcon.classList.toggle('paused')
})

timerBtnStop.addEventListener('click', () => {
    if(currentPage === 'firstTab'){
        timerStop()
    }
    else if(currentPage === 'secondTab'){
        secundomerStop()
    }
})

// Тапы на кнопки
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

    btn.addEventListener('mouseleave', () => {
        if(btn.classList.contains('tapped')){
            btn.classList.remove('tapped')
        }

        // btn.style.boxShadow = " 2px 2px 2px 0 #bc9ac5, -2px -2px 3px 0 #ddb5e8"
        // btn.parentNode.style.transform = "scale(1)"
    })
})


timerSliderItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        if(!timerBtnPlayIcon.classList.contains('paused') && currentPage === 'firstTab'){

            var timerHoursCurrent = parseInt(firstSlideHours.style.marginTop.match(/\d+/)) / sliderHeight
            var timerMinutesCurrent = parseInt(firstSlideMinutes.style.marginTop.match(/\d+/)) / sliderHeight
            var timerSecondsCurrent = parseInt(firstSlideSeconds.style.marginTop.match(/\d+/)) / sliderHeight

            timerHours.value = timerHoursCurrent < 10 ? timerHoursCurrent = '0' + timerHoursCurrent : timerHoursCurrent
            timerMinutes.value = timerMinutesCurrent < 10 ? timerMinutesCurrent = '0' + timerMinutesCurrent : timerMinutesCurrent
            timerSeconds.value = timerSecondsCurrent < 10 ? timerSecondsCurrent = '0' + timerSecondsCurrent : timerSecondsCurrent

            showTimerInputs()
            hideTimerUnits()

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


// Секундомер
var secundomer_hours_i = 0
var secundomer_minutes_i = 0
var secundomer_seconds_i = 0

var secundomerInterval
function secundomerStart() {
    clearInterval(secundomerInterval)
    secundomerIsGoing = true
    dots.forEach((item, index) => item.classList.add('rotatingSecundomer'))

    cl('secundomerStart')

    cl(secundomer__seconds_unit)
    cl(secundomer__minutes_unit)

    // if(secundomer_seconds_i != 0 || secundomer_minutes_i != 0 || secundomer_hours_i != 0){
    //
    // }
    secundomerInterval = setInterval(() => {
        // seconds < 10 ? timer__seconds_slide.innerText = "0" + seconds : timer__seconds_slide.innerText = seconds

        // timer__minutes_slide.innerText = '00'

        secundomer__seconds_unit.innerText = secundomer_seconds_i
        // timerSeconds.value = seconds
        // cl(seconds)
        secundomer_seconds_i++
        if(secundomer_seconds_i == 10){

            secundomer_minutes_i += 1
            secundomer_minutes_i < 10 ? secundomer__minutes_unit.innerText = "0" + secundomer_minutes_i : secundomer__minutes_unit.innerText = secundomer_minutes_i
            // timerMinutes.value = minutes
            secundomer_seconds_i = 0
        }
    }, 100)
}

function secundomerPause() {
    dots.forEach((item, index) => item.classList.remove('rotatingSecundomer'))
    secundomerIsGoing = false
    clearInterval(secundomerInterval)
}

function secundomerStop() {
    // secundomerSeconds.innerHTML = '<div class="unit__item" id="secundomer__seconds-unit">00</div>'
    // secundomerMinutes.innerHTML = '<div class="unit__item" id="secundomer__minutes-unit">00</div>'
    // secundomerHours.innerHTML = '<div class="unit__item" id="secundomer__hours-unit">00</div>'
    secundomer__seconds_unit.innerText = '00'
    secundomer__minutes_unit.innerText = '00'
    secundomer__hours_unit.innerText = '00'

    secundomerPause()
    timerBtnPlayIcon.classList.remove('paused')

    secundomer_hours_i = 0
    secundomer_minutes_i = 0
    secundomer_seconds_i = 0
}

timerBtnFlag.addEventListener('click', secundomerFlag)

function secundomerFlag() {
    let seconds
    let minutes
    secundomerSeconds.innerText < 10 ? seconds = secundomerSeconds.innerText + "0" : seconds = secundomerSeconds.innerText
    minutes = secundomerMinutes.innerText
    // timerSliderMinutes.innerText < 10 ? minutes = "0" + timerSliderMinutes.innerText : minutes = timerSliderMinutes.innerText
    // cl(timerSliderSeconds.innerText)
    flagsWrapper.innerHTML += `
        <div class="flags__item">
           ${minutes} : ${seconds}
        </div>`
}
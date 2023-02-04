// Собственные функции
"use strict";

// -----------------------------------------------

// Текуще время
const currentTimeContainer = qs('.timer__current-time')
const worldTimeContainer = qs('.worldTime')

const worldTimeItems = [
    {
        city: 'Лондон',
        zone: 'GMT',
        utc: '0',
        img: 'australia.png'
    },
    {
        city: 'Вена',
        zone: 'CET',
        utc: '+1',
    },
    {
        city: 'Афины',
        zone: 'EET',
        utc: '+2',
        img: 'greece.svg'
    },
    {
        city: 'Москва',
        zone: 'MSK',
        utc: '+3',
    },
    {
        city: 'Ереван',
        zone: 'AMT',
        utc: '+4',
    },
    {
        city: 'Ташкент',
        zone: 'UZT',
        utc: '+5',
    },
    {
        city: 'Астана',
        zone: 'ALMT',
        utc: '+6',
    },
    {
        city: 'Джакарта',
        zone: 'WIB',
        utc: '+7',
    },
    {
        city: 'Пекин',
        zone: 'CST',
        utc: '+8',
    },
    {
        city: 'Токио',
        zone: 'JST',
        utc: '+9',
    },
    {
        city: 'Порт-Морсби',
        zone: 'PGT',
        utc: '+10',
    },
    {
        city: 'Канберра',
        zone: 'AEDT',
        utc: '+11',
    },
    {
        city: 'Сува',
        zone: 'FJST',
        utc: '+12',
    },
]

worldTimeItems.forEach((item) => {
    let itemContent = item.img ? `<span><img src="img/countries/${item.img}" alt=""></span><div class="worldTime__time" data-utc="${item.utc}"></div><span><img src="img/countries/${item.img}" alt=""></span>`
        : `<div class=\"worldTime__time\" data-utc=\"${item.utc}\"></div>`
    let i = ` <div class="worldTime__item">
                    <h1 class="worldTime__city">${item.city}</h1>
                    <div class="worldTime__content">${itemContent}</div>
                    <div class="worldTime__timeZone">${item.zone}, UTC${item.utc}</div>
                </div>`
    worldTimeContainer.innerHTML += i
})

const worldTimeTime = qsAll('.worldTime__time')
let date = new Date()
const currentUTC = -parseInt(date.getTimezoneOffset()/60)

let fillWorldTimeItems = function (item){
    let date = new Date()

    let hours
    let hours2
    let minutes
    let seconds

    hours = date.getHours()
    minutes = date.getMinutes().toString().length === 2 ? date.getMinutes() : "0" + date.getMinutes()
    seconds = date.getSeconds().toString().length === 2 ? date.getSeconds() : "0" + date.getSeconds()

    let utc = parseInt(item.dataset.utc)

    if((hours + utc - currentUTC) > 23){
        hours2 = hours - currentUTC + utc  - 24
        // cl(hours)
    }
    else if((hours + utc - currentUTC) < 0){
        hours2 = hours - currentUTC + utc  + 24
    }
    else{
        hours2 = hours - currentUTC + utc
    }
    hours2 = hours2 > 9 ? hours2 : "0" + hours2
    let time = `${hours2}:${minutes}:${seconds}`

    item.innerHTML = time
}

let currentTimeFunction = function () {
    let date = new Date()

    let hours
    let minutes
    let seconds

    hours = date.getHours()
    minutes = date.getMinutes().toString().length === 2 ? date.getMinutes() : "0" + date.getMinutes()
    seconds = date.getSeconds().toString().length === 2 ? date.getSeconds() : "0" + date.getSeconds()

    currentTimeContainer.innerHTML = `${hours}:${minutes}:${seconds}`
}

worldTimeTime.forEach((item) => fillWorldTimeItems(item))
currentTimeFunction()

setInterval(() => {
    worldTimeTime.forEach((item) => fillWorldTimeItems(item))
    currentTimeFunction()
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

const worldTimeWrapper = qs('.worldTime')

const timerControls = qs('.timer__controls')
const flagsWrapper1 = gbid('flags1')
const flagsWrapper2 = gbid('flags2')

// Таймер
let timer_hours_i = 0
let timer_minutes_i = 0
let timer_seconds_i = 0

// Секундомер
let secundomer_hours_i = 0
let secundomer_minutes_i = 0
let secundomer_seconds_i = 0

const sliderHeight = 74

let timerIsGoing = false
let secundomerIsGoing = false

// setInterval(() => {
//     console.log('timerIsGoing = ' + timerIsGoing,
//     'secundomerIsGoing = ' + secundomerIsGoing)
//
// }, 500)

let timerSecondsIsChanged = false
let timerMinutesIsChanged = false
let timerHoursIsChanged = false

let timerProgress = qs('.circle_animation')
let timerProgressSvg = qs('.svg')

const initialOffset = 1508
let i = 1

let timerInterval

const dots = qsAll('.dots')

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

let firstSlideHours = qs('.timer__hours-unit')
let firstSlideMinutes = qs('.timer__minutes-unit')
let firstSlideSeconds = qs('.timer__seconds-unit')


// Переключатель табов
const menu = qs('.menu')
const menuItems = qsAll('.menu__item')
const wrapper = qs('.timer')

let currentPage = localStorage.getItem('currentPage')
    ? localStorage.getItem('currentPage')
    : 'firstTab'


menu.classList.remove('firstTab', 'secondTab', 'thirdTab')
wrapper.classList.remove('firstTab', 'secondTab', 'thirdTab')

menu.classList.add(currentPage)
wrapper.classList.add(currentPage)

menuItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        menu.classList.remove('firstTab', 'secondTab', 'thirdTab')
        wrapper.classList.remove('firstTab', 'secondTab', 'thirdTab')

        menu.classList.add(item.dataset.link)
        wrapper.classList.add(item.dataset.link)

        currentPage = item.dataset.link
        localStorage.setItem('currentPage', currentPage)

        currentPage === 'firstTab' ? FirstPage() : ""
        currentPage === 'secondTab' ? SecondPage() : ""
        currentPage === 'thirdTab' ? ThirdPage() : ""

        cl(currentPage)
    })
})

currentPage === 'firstTab' ? FirstPage() : ""
currentPage === 'secondTab' ? SecondPage() : ""
currentPage === 'thirdTab' ? ThirdPage() : ""


const timerSliderItems = [timerSliderHours, timerSliderMinutes, timerSliderSeconds]
const timerInputItems = [timerHours, timerMinutes, timerSeconds]


timerBtnPlay.addEventListener('click', function () {
    if(currentPage === 'firstTab') {
        if (!timerBtnPlayIcon.classList.contains('paused')) {
            if (timerHours.value === "") {
                timerHours.focus()
                return
            }

            if (timerMinutes.value === "") {
                timerMinutes.focus()
                return
            }

            if (timerSeconds.value === "") {
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
    })

    btn.addEventListener('mouseup', () => {
        btn.classList.remove('tapped')
    })

    btn.addEventListener('mouseleave', () => {
        if(btn.classList.contains('tapped')){
            btn.classList.remove('tapped')
        }
    })
})


timerSliderItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        if(!timerBtnPlayIcon.classList.contains('paused') && currentPage === 'firstTab'){

            let timerHoursCurrent = parseInt(firstSlideHours.style.marginTop.match(/\d+/)) / sliderHeight
            let timerMinutesCurrent = parseInt(firstSlideMinutes.style.marginTop.match(/\d+/)) / sliderHeight
            let timerSecondsCurrent = parseInt(firstSlideSeconds.style.marginTop.match(/\d+/)) / sliderHeight

            timerHours.value = timerHoursCurrent < 10 ? '0' + timerHoursCurrent : timerHoursCurrent
            timerMinutes.value = timerMinutesCurrent < 10 ? '0' + timerMinutesCurrent : timerMinutesCurrent
            timerSeconds.value = timerSecondsCurrent < 10 ? '0' + timerSecondsCurrent : timerSecondsCurrent

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




let secundomerInterval

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

function showControls() {
    timerControls.style.display = 'flex'
    dots.forEach((item, index) => item.style.display = 'flex')
}

function hideControls() {
    timerControls.style.display = 'none'
    dots.forEach((item, index) => item.style.display = 'none')
}

function showWorldTimeItems() {
    worldTimeWrapper.style.display = 'grid'
}

function hideWorldTimeItems() {
    worldTimeWrapper.style.display = 'none'
}

function FirstPage() {
    dots.forEach((item, index) => item.classList.remove('rotatingSecundomer'))
    hideWorldTimeItems()

    showControls()
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
        if(i !== 1){
            hideTimerInputs()
            showTimerUnits()

            firstSlideHours.style.marginTop = `${timer_hours_i}px`
            firstSlideMinutes.style.marginTop = `${timer_minutes_i}px`
            firstSlideSeconds.style.marginTop = `${timer_seconds_i}px`
        }
        timerBtnPlayIcon.classList.remove('paused')
    }
}

function SecondPage() {
    dots.forEach((item, index) => item.classList.remove('rotatingTimer'))

    hideWorldTimeItems()

    showControls()
    hideTimerInputs()
    hideTimerUnits()
    showSecundomerUnits()
    cl(secundomer_seconds_i)
    if(secundomer_seconds_i === 0 && secundomer_minutes_i === 0 && secundomer_hours_i === 0){
        timerBtnPlayIcon.classList.remove('paused')
        secundomer__seconds_unit.innerText = '00'
        secundomer__minutes_unit.innerText = '00'
        secundomer__hours_unit.innerText = '00'
    }
    else {
        timerBtnPlayIcon.classList.remove('paused')
        secundomer__seconds_unit.innerText = secundomer_seconds_i
        secundomer_minutes_i < 10
            ? secundomer__minutes_unit.innerText = '0' + secundomer_minutes_i
            : secundomer__minutes_unit.innerText = secundomer_minutes_i
        secundomer__hours_unit.innerText = secundomer_hours_i
        if(secundomerIsGoing){
            timerBtnPlayIcon.classList.add('paused')
            secundomerStart()
        }
    }
}

function ThirdPage() {
    dots.forEach((item, index) => item.classList.remove('rotatingTimer'))

    hideTimerInputs()
    hideTimerUnits()
    hideSecundomerUnits()
    hideControls()

    showWorldTimeItems()
}

function timerStart() {
    clearInterval(timerInterval)
    if(i === 1 || timerHoursIsChanged){
        firstSlideHours.style.marginTop = `-${timerHours.value * sliderHeight}px`
        timer_hours_i = -timerHours.value * sliderHeight
    }
    else{
        firstSlideHours.style.marginTop = `${timer_hours_i}px`
    }


    if(i === 1 || timerMinutesIsChanged){
        firstSlideMinutes.style.marginTop = `-${timerMinutes.value * sliderHeight}px`
        timer_minutes_i = -timerMinutes.value * sliderHeight
    }
    else{
        firstSlideMinutes.style.marginTop = `${timer_minutes_i}px`
    }

    if(i === 1 || timerSecondsIsChanged){
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
        item.classList.add('rotatingTimer')
    })

    timerSliderHours.style.animation = 'inputAppear1 0.2s forwards'
    timerSliderMinutes.style.animation = 'inputAppear2 0.2s forwards'
    timerSliderSeconds.style.animation = 'inputAppear3 0.2s forwards'

    timerProgress.style.transition = 'all 1s linear'

    if(i !== 1){
        timer_seconds_i = timer_seconds_i + sliderHeight
        if(timer_seconds_i === sliderHeight){
            timer_minutes_i = timer_minutes_i + sliderHeight
            firstSlideMinutes.style.marginTop = `${timer_minutes_i}px`
            timer_seconds_i = -59 * sliderHeight
        }

        if(timer_minutes_i === sliderHeight){
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
        if( timer_hours_i === 0 && timer_minutes_i === 0 && timer_seconds_i === 0){
            timerStop()
            timerProgress.style.strokeDashoffset = '1508'

            timer.style.animation = 'timerBeep 0.75s infinite ease-in-out'
            timerProgressSvg.style.animation = 'progressBeep 0.75s infinite ease-in-out'

            timerProgressSvg.addEventListener('mouseover', () => {
                timerProgressSvg.style.cursor = 'pointer'
            }, {once: true})


            timerProgressSvg.addEventListener('click', () => {
                timerProgress.style.strokeDashoffset = '0'
                timer.style.animation = 'none'
                timerProgressSvg.style.animation = 'none'
                timerProgressSvg.style.cursor = 'auto'
            }, {once: true})
            return
        }

        timer_seconds_i = timer_seconds_i + sliderHeight
        if(timer_seconds_i === sliderHeight){
            timer_minutes_i = timer_minutes_i + sliderHeight
            firstSlideMinutes.style.marginTop = `${timer_minutes_i}px`
            timer_seconds_i = -59 * sliderHeight

        }

        if(timer_minutes_i === sliderHeight){
            timer_hours_i =  timer_hours_i + sliderHeight
            firstSlideHours.style.marginTop = `${timer_hours_i}px`
            timer_minutes_i = -59 * sliderHeight
            firstSlideMinutes.style.marginTop = `${timer_minutes_i}px`
        }
        firstSlideSeconds.style.marginTop = `${timer_seconds_i}px`

        timerProgress.style.strokeDashoffset = initialOffset * i/totalSeconds
        i++
    }, 1000)
}

function timerPause() {
    dots.forEach((item, index) => {
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

function secundomerStart() {
    clearInterval(secundomerInterval)
    secundomerIsGoing = true
    dots.forEach((item, index) => item.classList.add('rotatingSecundomer'))

    secundomerInterval = setInterval(() => {
        secundomer__seconds_unit.innerText = secundomer_seconds_i
        secundomer_seconds_i++
        if(secundomer_seconds_i == 10){

            secundomer_minutes_i += 1
            secundomer_minutes_i < 10 ? secundomer__minutes_unit.innerText = "0" + secundomer_minutes_i : secundomer__minutes_unit.innerText = secundomer_minutes_i
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

let flagsCounter = 0
function secundomerFlag() {
    let seconds
    let minutes
    seconds = secundomerSeconds.innerText < 10 ? secundomerSeconds.innerText + "0" : secundomerSeconds.innerText
    minutes = secundomerMinutes.innerText
    if (flagsCounter < 10){
        flagsWrapper1.innerHTML += `
        <div class="flags__item">
          ${flagsCounter+1}) ${minutes} : ${seconds}
        </div>`
    }
    else if(flagsCounter === 20){
        return false
    }
    else{
        flagsWrapper2.innerHTML += `
        <div class="flags__item">
          ${flagsCounter+1}) ${minutes} : ${seconds}
        </div>`
    }
    flagsCounter++
}
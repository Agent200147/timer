"use strict"

// -----------------------------------------------

//------Убирает transition при перезагрузке страницы и лоадер-----
const loader = document.querySelector('.loader')

window.onload = function () {
    document.body.classList.remove('preload')
    document.body.classList.add('loaded_hiding');
    loader.addEventListener('animationend', () => {
        document.body.classList.remove('loaded_hiding');
        document.body.classList.add('loaded');
    })
}
//------Убирает transition при перезагрузке страницы и лоадер-----

const htmlStyle = document.documentElement.style

//-----Масштаб страницы------
function scaleWatcher() {
    const scale = window?.devicePixelRatio || 1
    htmlStyle.setProperty('--scale', scale)
}

function scaleWatcher2() {
    const scale = window?.devicePixelRatio || 1
    htmlStyle.setProperty('--scale', scale)
    // document.documentElement.style.setProperty('font-size', 'calc(62.5% / var(--scale) + 2px)')
}

scaleWatcher()
window.addEventListener('load', scaleWatcher)
window.addEventListener('resize', scaleWatcher)
//-----Масштаб страницы------


//-----Из DOM в переменные-----
const currentTimeContainer = qs('.timer__current-time')
const worldTimeContainer = qs('.worldTime')
const worldTimeItems = [
    {
        city: 'Паго-Паго',
        zone: 'SST',
        utc: '-11',
    },
    {
        city: 'Гонолулу',
        zone: 'HST',
        utc: '-10',
    },
    {
        city: 'Анкоридж',
        zone: 'AKST',
        utc: '-9',
    },
    {
        city: 'Вашингтон',
        zone: 'PST',
        utc: '-8',
    },
    {
        city: 'Монтана',
        zone: 'MST',
        utc: '-7',
    },
    {
        city: 'Гватемала',
        zone: 'CST',
        utc: '-6',
    },
    {
        city: 'Оттава',
        zone: 'EST',
        utc: '-5',
    },
    {
        city: 'Каракас',
        zone: 'VET',
        utc: '-4',
    },
    {
        city: 'Буэнос-Айрес',
        zone: 'ART',
        utc: '-3',
    },
    {
        city: 'Нуук',
        zone: 'WGST',
        utc: '-2',
    },
    {
        city: 'Кабо-Верде',
        zone: 'CVT',
        utc: '-1',
    },
    {
        city: 'Лондон',
        zone: 'GMT',
        utc: '0',
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
//Заполнение временных зон
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

const timerSliderHours = qs('.slider-wrapper__hours')
const timerSliderMinutes = qs('.slider-wrapper__minutes')
const timerSliderSeconds = qs('.slider-wrapper__seconds')
const box = qs('.box')
// window.innerHeight = 300
// box.innerHTML = window.innerHeight
//Заполнение слайдов-цифр для таймера
for (let i = 0; i < 100; i++) {
    i < 10 ? i = '0' + i : i
    timerSliderHours.innerHTML += `<div class="timer__hours-unit unit__item">${i}</div>`
}

//Заполнение слайдов-цифр для таймера
for (let i = 0; i < 60; i++) {
    i < 10 ? i = '0' + i : i
    timerSliderMinutes.innerHTML += `<div class="timer__minutes-unit unit__item">${i}</div>`
    timerSliderSeconds.innerHTML += `<div class="timer__seconds-unit unit__item">${i}</div>`
}

const firstSlideHours = qs('.timer__hours-unit')
const firstSlideMinutes = qs('.timer__minutes-unit')
const firstSlideSeconds = qs('.timer__seconds-unit')

const worldTimeTime = qsAll('.worldTime__time')

const date = new Date()
const currentUTC = -parseInt(date.getTimezoneOffset() / 60)

const secundomerMinutes = qs('.secundomer-wrapper__minutes')
const secundomerSeconds = qs('.secundomer-wrapper__seconds')
const secundomerMiliSeconds = qs('.secundomer-wrapper__miliSeconds')

const timer = gbid('timer__self')
const timerWrapper = qs('.timer__wrapper')
const flagResetBg = qs('.btn-flag__reset-bg')

const timerBtnPlay = qs('.timer__btn.btn-play')
const timerBtnStop = qs('.timer__btn.btn-stop')
const secundomerBtnFlag = qs('.timer__btn.btn-flag')

const timerProgress = qs('.circle_animation')
const timerProgressSvg = qs('.svgCircle')

const timerBtnPlayIcon = qs('.timer__btn-icon')

const secundomerMinutesUnit = qs('.secundomer__minutes-unit')
const secundomerSecondsUnit = qs('.secundomer__seconds-unit')
const secundomerMilisecondsUnit = qs('.secundomer__miliSeconds-unit')

const worldTimeWrapper = qs('.worldTime__wrapper')

const timerControls = qs('.timer__controls')
let flags = qsAll('.flags')
const flagsWrapper1 = gbid('flags1')
const flagsWrapper2 = gbid('flags2')
const flagsMobile = gbid('flags-mobile')

const dots = qsAll('.dots')

// Inputs
const timerHoursInput = gbid('hours')
const timerMinutesInput = gbid('minutes')
const timerSecondsInput = gbid('seconds')

const menu = qs('.menu')
const menuItems = qsAll('.menu__item')
const menuMobileItems = qsAll('.menu-mobile__item')
const wrapper = qs('.timer')
//-----Из DOM в переменные-----

let isMobile = window.innerWidth <= 1024

window.addEventListener('resize', () => isMobile = window.innerWidth <= 1024)

//Высота слайда
const sliderHeight = 74

//Отношение шрифта таймера к размеру шрифта родительского элемента
const fzTimerUnitsRatio = 5.8

//Отношение единиц измерения (1 rem = 10px)
const UNIT_RATIO = 10

//Таймер
//Текущее количество "тиков" таймера
let currentTimerIterations = 1
let timerIsGoing = false

let timerHoursMarginTop = 0
let timerMinutesMarginTop = 0
let timerSecondsMarginTop = 0

let timerSecondsIsChanged = false
let timerMinutesIsChanged = false
let timerHoursIsChanged = false

// Секундомер
let secundomerIsGoing = false

let secundomerMinutesI = 0
let secundomerSecondsI = 0
let secundomerMilisecondsI = 0

const timerSliderItems = [timerSliderHours, timerSliderMinutes, timerSliderSeconds]
const timerInputItems = [timerHoursInput, timerMinutesInput, timerSecondsInput]

let currentPage = localStorage.getItem('currentPage')
    ? localStorage.getItem('currentPage')
    : 'firstTab'

menu.classList.remove('firstTab', 'secondTab', 'thirdTab')
document.body.classList.remove('firstTab', 'secondTab', 'thirdTab')

menu.classList.add(currentPage)
document.body.classList.add(currentPage)

const toPage = {
    firstTab: FirstPage,
    secondTab: SecondPage,
    thirdTab: ThirdPage
}


//-----Время для разных стран-----
function fillWorldTimeItems(item) {
    const date = new Date()
    let hoursWithUtc

    const hours = date.getHours()
    const minutes = date.getMinutes().toString().length === 2 ? date.getMinutes() : "0" + date.getMinutes()
    const seconds = date.getSeconds().toString().length === 2 ? date.getSeconds() : "0" + date.getSeconds()

    let utc = parseInt(item.dataset.utc)

    if ((hours + utc - currentUTC) > 23) {
        hoursWithUtc = hours - currentUTC + utc - 24
    } else if ((hours + utc - currentUTC) < 0) {
        hoursWithUtc = hours - currentUTC + utc + 24
    } else {
        hoursWithUtc = hours - currentUTC + utc
    }
    hoursWithUtc = hoursWithUtc > 9 ? hoursWithUtc : "0" + hoursWithUtc
    const time = `${hoursWithUtc}:${minutes}:${seconds}`
    item.innerHTML = time
}

//-----Время для разных стран-----


//-----Текущее время-----
function currentTimeFunction() {
    const date = new Date()

    const hours = date.getHours().toString().length === 2 ? date.getHours() : "0" + date.getHours()
    const minutes = date.getMinutes().toString().length === 2 ? date.getMinutes() : "0" + date.getMinutes()
    const seconds = date.getSeconds().toString().length === 2 ? date.getSeconds() : "0" + date.getSeconds()

    currentTimeContainer.innerHTML = `${hours}:${minutes}:${seconds}`
}

worldTimeTime.forEach((item) => fillWorldTimeItems(item))
currentTimeFunction()

setInterval(() => {
    worldTimeTime.forEach((item) => fillWorldTimeItems(item))
    currentTimeFunction()
}, 1000)
//-----Текущее время-----


//-----Обработка кликов по пунктам меню-----
let previousPage
menuItems.forEach((item) => {
    item.addEventListener('click', () => {
        previousPage = localStorage.getItem('currentPage')
        currentPage = item.dataset.link

        if (previousPage === currentPage) return
        menu.classList.remove('firstTab', 'secondTab', 'thirdTab')
        localStorage.setItem('currentPage', currentPage)

        if (previousPage === 'thirdTab' && currentPage !== 'thirdTab') {
            wrapper.style.transition = "opacity 3s ease-in-out"
            worldTimeWrapper.addEventListener('animationend', () => {
                document.body.classList.remove('firstTab', 'secondTab', 'thirdTab')
                document.body.classList.add(item.dataset.link)
            }, {once: true})
        } else {
            wrapper.style.transition = 'all 0.3s ease-in-out'
            document.body.classList.remove('firstTab', 'secondTab', 'thirdTab')
            document.body.classList.add(currentPage)
        }

        menu.classList.add(currentPage)

        toPage[currentPage]()
        log(currentPage)
    })
})
menuMobileItems.forEach((item) => {
    item.addEventListener('click', () => {
        window.navigator?.vibrate(1)
        previousPage = localStorage.getItem('currentPage')
        currentPage = item.dataset.link

        menuMobileItems.forEach(item => item.classList.remove('active'))
        item.classList.add('active')

        if (previousPage === currentPage) return
        localStorage.setItem('currentPage', currentPage)

        if (previousPage === 'thirdTab' && currentPage !== 'thirdTab') {
            wrapper.style.transition = "opacity 3s ease-in-out"
            worldTimeWrapper.addEventListener('animationend', () => {
                document.body.classList.remove('firstTab', 'secondTab', 'thirdTab')
                document.body.classList.add(item.dataset.link)
            }, {once: true})
        } else {
            wrapper.style.transition = 'all 0.3s ease-in-out'
            document.body.classList.remove('firstTab', 'secondTab', 'thirdTab')
            document.body.classList.add(currentPage)
        }

        if (previousPage === 'secondTab') {
            flagsMobile.classList.add('sliding-out-left')
            flagsMobile.addEventListener('animationend', () => {
                flagsMobile.classList.remove('sliding-out-left')
                hideFlagsMobile()
            }, {once: true})
        }
        toPage[currentPage]()
    })
})
toPage[currentPage]()
//-----Обработка кликов по пунктам меню-----


//-----Обработка кликов по кнопкам таймера и секундомера-----
//Клик на play
timerBtnPlay.addEventListener('click', function () {
    window.navigator?.vibrate(1)
    //Если таймер
    if (currentPage === 'firstTab') {
        if (!timerBtnPlayIcon.classList.contains('paused')) {
            if (timerHoursInput.value === "" && timerMinutesInput.value === "" && timerSecondsInput.value === "") {
                return
            }
            timerHoursInput.value === "" ? timerHoursInput.value === "00" :
                timerMinutesInput.value === "" ? timerMinutesInput.value === "00" :
                    timerSecondsInput.value === "" ? timerSecondsInput.value === "00" : ''
            timerStart()
        } else {
            timerPause()
        }
    }
    //Если секундомер
    if (currentPage === 'secondTab') {
        if (!timerBtnPlayIcon.classList.contains('paused')) {
            secundomerStart()
        } else {
            secundomerPause()
        }
    }
    timerBtnPlayIcon.classList.toggle('paused')
})

//Клик на stop
timerBtnStop.addEventListener('click', () => {
    window.navigator?.vibrate(1)
    if (currentPage === 'firstTab') {
        timerStop()
    } else if (currentPage === 'secondTab') {
        secundomerStop()
    }
})

//Клик на inputs таймера
timerSliderItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        if (!timerBtnPlayIcon.classList.contains('paused') && currentPage === 'firstTab') {

            const timerHoursCurrent = -timerHoursMarginTop / sliderHeight
            const timerMinutesCurrent = -timerMinutesMarginTop / sliderHeight
            const timerSecondsCurrent = -timerSecondsMarginTop / sliderHeight

            timerHoursInput.value = timerHoursCurrent < 10 ? '0' + timerHoursCurrent : timerHoursCurrent
            timerMinutesInput.value = timerMinutesCurrent < 10 ? '0' + timerMinutesCurrent : timerMinutesCurrent
            timerSecondsInput.value = timerSecondsCurrent < 10 ? '0' + timerSecondsCurrent : timerSecondsCurrent

            showTimerInputs()
            hideTimerUnits()

            timerSecondsIsChanged = true
            timerMinutesIsChanged = true
            timerHoursIsChanged = true

            index === 0 ? timerHoursInput.focus() :
                index === 1 ? timerMinutesInput.focus() :
                    index === 2 ? timerSecondsInput.focus() : ''
        }
    })
})

//Ограничение ввода(только цифры не более двух)
timerInputItems.forEach((item) => {
    item.addEventListener('input', () => {
        item.value = item.value.replace(/[^0-9]/g, '')
        item.value = item.value.slice(0, 2)

        if (item.id === "hours")
            item.value > 99 ? item.value = 99 : item.value
        else
            item.value > 59 ? item.value = 59 : item.value
    })
})
//-----Обработка кликов по кнопкам таймера-----


//------Флаги-----
secundomerBtnFlag.addEventListener('click', secundomerFlagAdd)
secundomerBtnFlag.addEventListener('mousedown', secundomerFlagResetFill)
secundomerBtnFlag.addEventListener('touchstart', secundomerFlagResetFill)
secundomerBtnFlag.addEventListener('touchend', secundomerFlagResetUnFill)
secundomerBtnFlag.addEventListener('mouseleave', secundomerFlagResetUnFill)
secundomerBtnFlag.addEventListener('mouseup', () => {
    secundomerFlagResetUnFill()
    setTimeout(() => flagResetBg.classList.remove('resetting'), 1)
})
//-----Флаги-----


//-----Изменение на рандомный цвет в inputColor-----
const labelInputColor = document.querySelector('.label-inputColor')
changeColorAnimation(labelInputColor)
//-----Изменение на рандомный цвет в inputColor-----


//-----Смена темы сайта относительно выбранного цвета пользователем-----
const inputColor = gbid('inputColor')
inputColor.oninput = inputColorHandler
//-----Смена темы сайта относительно выбранного цвета пользователем-----


// -------------------------------------------------------------------


function log(n) {
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
    timerSecondsInput.style.display = 'none'
    timerMinutesInput.style.display = 'none'
    timerHoursInput.style.display = 'none'
}

function showTimerInputs() {
    timerSecondsInput.style.display = 'block'
    timerMinutesInput.style.display = 'block'
    timerHoursInput.style.display = 'block'
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
    secundomerMiliSeconds.style.display = 'none'
    secundomerSeconds.style.display = 'none'
    secundomerMinutes.style.display = 'none'
}

function showSecundomerUnits() {
    secundomerMiliSeconds.style.display = 'block'
    secundomerSeconds.style.display = 'block'
    secundomerMinutes.style.display = 'block'
}

function showControls() {
    timerControls.style.display = 'flex'
    dots.forEach((item) => item.style.display = 'flex')
}


function showFlagsMobile() {
    flagsMobile.style.display = 'flex'
}

function hideFlagsMobile() {
    flagsMobile.style.display = 'none'
}

function hideControls() {
    timerControls.style.display = 'none'
    dots.forEach((item) => item.style.display = 'none')
}

function showWorldTimeItems() {
    worldTimeWrapper.style.display = 'grid'
}

function hideWorldTimeItems() {
    worldTimeWrapper.style.display = 'none'
}

function pxToUnit(px, unit, fzRatio = 1) {
    return (px / UNIT_RATIO / fzRatio) + unit
}

function toDoubleNumber(a) {
    if (typeof a === "string") {
        return a.length < 2 ? "0" + a : a
    } else {
        return a < 10 ? "0" + a : a
    }
}

//-----Страницы-----
function FirstPage() {
    if (!previousPage) {
        hideWorldTimeItems()
    } else if (previousPage === 'thirdTab') {
        worldTimeWrapper.classList.add('fading-out')
        worldTimeWrapper.addEventListener('animationend', () => {
            worldTimeWrapper.classList.remove('fading-out')
            worldTimeWrapper.style.display = 'none'
            timerWrapper.style.display = ''
            timerWrapper.classList.add('fading-in')
        }, {once: true})
        timerWrapper.addEventListener('animationend', () => timerWrapper.classList.remove('fading-in'), {once: true})
    }

    menuMobileItems[0].classList.add('active')
    timer.classList.contains('isGoing') ? timer.classList.add('timerBeep') : ''
    flags.forEach(item => item.style.display = 'none')
    dots.forEach((item, index) => item.classList.remove('rotatingSecundomer'))

    showControls()
    showTimerInputs()
    hideTimerUnits()
    hideSecundomerUnits()

    if (timerIsGoing) {
        dots.forEach((item) => item.classList.add('rotatingTimer'))
        timerBtnPlayIcon.classList.remove('paused')
        timerBtnPlayIcon.classList.add('paused')
        timerStart()
    } else {
        if (currentTimerIterations !== 1) {
            hideTimerInputs()
            showTimerUnits()

            firstSlideHours.style.marginTop = pxToUnit(timerHoursMarginTop, 'em', fzTimerUnitsRatio)
            firstSlideMinutes.style.marginTop = pxToUnit(timerMinutesMarginTop, 'em', fzTimerUnitsRatio)
            firstSlideSeconds.style.marginTop = pxToUnit(timerSecondsMarginTop, 'em', fzTimerUnitsRatio)
        }
        timerBtnPlayIcon.classList.remove('paused')
    }
}

function SecondPage() {
    timer.classList.remove('timerBeep')
    if (!previousPage) {
        hideWorldTimeItems()
    } else if (previousPage === 'thirdTab') {
        worldTimeWrapper.classList.add('fading-out')
        worldTimeWrapper.addEventListener('animationend', () => {
            worldTimeWrapper.classList.remove('fading-out')
            hideWorldTimeItems()
            timerWrapper.style.display = 'grid'
            timerWrapper.classList.add('fading-in')
            if (isMobile) showFlagsMobile()
        }, {once: true})
        timerWrapper.addEventListener('animationend', () => {
            timerWrapper.classList.remove('fading-in')
            flags.forEach(item => item.style.display = 'flex')

        }, {once: true})
    } else {
        if (isMobile) showFlagsMobile()
        setTimeout(() => flags.forEach(item => item.style.display = 'flex'), 300)
    }
    menuMobileItems[1].classList.add('active')
    dots.forEach((item) => item.classList.remove('rotatingTimer'))

    showControls()
    hideTimerInputs()
    hideTimerUnits()
    showSecundomerUnits()
    if (secundomerMilisecondsI === 0 && secundomerSecondsI === 0 && secundomerMinutesI === 0) {
        timerBtnPlayIcon.classList.remove('paused')
        secundomerMilisecondsUnit.innerText = '00'
        secundomerSecondsUnit.innerText = '00'
        secundomerMinutesUnit.innerText = '00'
    } else {
        timerBtnPlayIcon.classList.remove('paused')
        secundomerMilisecondsUnit.innerText = toDoubleNumber(secundomerMilisecondsI)
        secundomerSecondsUnit.innerText = toDoubleNumber(secundomerSecondsI)
        secundomerMinutesUnit.innerText = toDoubleNumber(secundomerMinutesI)
        if (secundomerIsGoing) {
            timerBtnPlayIcon.classList.add('paused')
            dots.forEach((item) => item.classList.add('rotatingSecundomer'))
        }
    }
}

function ThirdPage() {
    if (!previousPage) {
        timerWrapper.style.display = 'none'
        menuMobileItems[2].classList.add('active')
        showWorldTimeItems()
        return
    }

    menuMobileItems[2].classList.add('active')
    timer.classList.remove('timerBeep')

    dots.forEach((item) => item.classList.remove('rotatingTimer'))
    document.body.classList.add(previousPage)
    document.body.classList.remove(currentPage)

    timerWrapper.classList.add('fading-out')
    flags.forEach(item => item.classList.add('fading-out'))

    timerWrapper.addEventListener('animationend', () => {
        timerWrapper.style.display = 'none'
        timerWrapper.classList.remove('fading-out')

        document.body.classList.add(currentPage)
        document.body.classList.remove(previousPage)

        flags.forEach(item => item.classList.remove('fading-out'))
        flags.forEach(item => item.style.display = 'none')
        wrapper.style.transition = 'opacity 3s ease-in-out'
        showWorldTimeItems()
    }, {once: true})
}

//-----Страницы-----


//-----Таймер-----
const initialOffset = 1508
let timerInterval

function timerStart() {
    clearInterval(timerInterval)
    if (currentTimerIterations === 1 || timerHoursIsChanged) {
        firstSlideHours.style.marginTop = pxToUnit(-timerHoursInput.value * sliderHeight, 'em', fzTimerUnitsRatio)
        timerHoursMarginTop = -timerHoursInput.value * sliderHeight
    } else {
        firstSlideHours.style.marginTop = pxToUnit(timerHoursMarginTop, 'em', fzTimerUnitsRatio)
    }

    if (currentTimerIterations === 1 || timerMinutesIsChanged) {
        firstSlideMinutes.style.marginTop = pxToUnit(-timerMinutesInput.value * sliderHeight, 'em', fzTimerUnitsRatio)
        timerMinutesMarginTop = -timerMinutesInput.value * sliderHeight
    } else {
        firstSlideMinutes.style.marginTop = pxToUnit(timerMinutesMarginTop, 'em', fzTimerUnitsRatio)
    }

    if (currentTimerIterations === 1 || timerSecondsIsChanged) {
        firstSlideSeconds.style.marginTop = pxToUnit(-timerSecondsInput.value * sliderHeight, 'em', fzTimerUnitsRatio)
        timerSecondsMarginTop = -timerSecondsInput.value * sliderHeight
    }

    if (timerHoursIsChanged || timerMinutesIsChanged || timerSecondsIsChanged) {
        currentTimerIterations = 1
        timerProgress.style.strokeDashoffset = 0
    }
    let totalSeconds = Number(timerHoursInput.value * 3600) + Number(timerMinutesInput.value * 60) + Number(timerSecondsInput.value)

    timerSecondsIsChanged = false
    timerMinutesIsChanged = false
    timerHoursIsChanged = false

    hideTimerInputs()
    showTimerUnits()

    dots.forEach((item) => {
        item.classList.add('rotatingTimer')
    })

    timerProgress.style.transition = 'all 1s linear'

    if (currentTimerIterations !== 1) {
        timerSecondsMarginTop = timerSecondsMarginTop + sliderHeight
        firstSlideSeconds.style.marginTop = pxToUnit(timerSecondsMarginTop, 'em', fzTimerUnitsRatio)

        if (timerSecondsMarginTop === sliderHeight) {
            timerMinutesMarginTop = timerMinutesMarginTop + sliderHeight
            firstSlideMinutes.style.marginTop = pxToUnit(timerMinutesMarginTop, 'em', fzTimerUnitsRatio)
            timerSecondsMarginTop = -59 * sliderHeight
        }

        if (timerMinutesMarginTop === sliderHeight) {
            timerHoursMarginTop = timerHoursMarginTop + sliderHeight
            firstSlideHours.style.marginTop = pxToUnit(timerHoursMarginTop, 'em', fzTimerUnitsRatio)
            timerMinutesMarginTop = -59 * sliderHeight
            firstSlideMinutes.style.marginTop = pxToUnit(timerMinutesMarginTop, 'em', fzTimerUnitsRatio)
        }

        timerProgress.style.strokeDashoffset = pxToUnit(initialOffset * currentTimerIterations / totalSeconds, 'em')
        currentTimerIterations++
    }

    timerIsGoing = true
    timerProgress.style.strokeDashoffset = pxToUnit((initialOffset * currentTimerIterations) / totalSeconds, 'em')
    timerInterval = setInterval(() => {
        if (timerHoursMarginTop === 0 && timerMinutesMarginTop === 0 && timerSecondsMarginTop === -sliderHeight) {
            timerStop()
            if (currentPage === 'secondTab') {
                hideTimerInputs()
                timer.classList.add('isGoing')
            } else {
                timer.classList.add('timerBeep', 'isGoing')
            }

            timerProgress.style.strokeDashoffset = pxToUnit(1508, 'em')
            timerProgressSvg.classList.add('cursorPointer')

            timerProgressSvg.addEventListener('click', () => {
                timerProgress.style.strokeDashoffset = '0'
                timer.classList.remove('timerBeep', 'isGoing')
                timerProgressSvg.classList.remove('cursorPointer')
            }, {once: true})
            return
        }

        timerSecondsMarginTop = timerSecondsMarginTop + sliderHeight
        if (timerSecondsMarginTop === sliderHeight) {
            timerMinutesMarginTop = timerMinutesMarginTop + sliderHeight
            firstSlideMinutes.style.marginTop = pxToUnit(timerMinutesMarginTop, 'em', fzTimerUnitsRatio)
            timerSecondsMarginTop = -59 * sliderHeight
        }

        if (timerMinutesMarginTop === sliderHeight) {
            timerHoursMarginTop = timerHoursMarginTop + sliderHeight
            firstSlideHours.style.marginTop = pxToUnit(timerHoursMarginTop, 'em', fzTimerUnitsRatio)
            timerMinutesMarginTop = -59 * sliderHeight
            firstSlideMinutes.style.marginTop = pxToUnit(timerMinutesMarginTop, 'em', fzTimerUnitsRatio)
        }
        firstSlideSeconds.style.marginTop = pxToUnit(timerSecondsMarginTop, 'em', fzTimerUnitsRatio)

        timerProgress.style.strokeDashoffset = pxToUnit((initialOffset * (currentTimerIterations + 1)) / totalSeconds, 'em')
        currentTimerIterations++
    }, 1000)
}

function timerPause() {
    dots.forEach((item) => {
        item.classList.remove('rotatingTimer')
    })
    timerIsGoing = false
    clearInterval(timerInterval)
}

function timerStop() {
    currentTimerIterations = 1
    timerSecondsInput.value = ""
    timerMinutesInput.value = ""
    timerHoursInput.value = ""

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

//-----Таймер-----


//-----Секундомер-----
let secundomerInterval
let secundomerSecondsInterval

function secundomerStart() {
    clearInterval(secundomerInterval)
    clearInterval(secundomerSecondsInterval)
    secundomerIsGoing = true
    dots.forEach((item, index) => item.classList.add('rotatingSecundomer'))

    secundomerInterval = setInterval(() => {
        secundomerMilisecondsI++
        secundomerMilisecondsUnit.innerText = toDoubleNumber(secundomerMilisecondsI)

        if (secundomerMilisecondsI === 100) {
            secundomerMilisecondsI = 0
            secundomerSecondsI++
            secundomerSecondsUnit.innerText = toDoubleNumber(secundomerSecondsI)
        }

        if (secundomerSecondsI === 60) {
            secundomerSecondsUnit.innerText = "00"
            secundomerSecondsI = 0
            secundomerMinutesI++
            secundomerMinutesUnit.innerText = toDoubleNumber(secundomerMinutesI)
        }
    }, 10)
}

function secundomerPause() {
    dots.forEach((item) => item.classList.remove('rotatingSecundomer'))
    secundomerIsGoing = false
    clearInterval(secundomerInterval)
    clearInterval(secundomerSecondsInterval)
}

function secundomerStop() {
    secundomerMilisecondsUnit.innerText = '00'
    secundomerSecondsUnit.innerText = '00'
    secundomerMinutesUnit.innerText = '00'

    secundomerPause()
    timerBtnPlayIcon.classList.remove('paused')

    secundomerMinutesI = 0
    secundomerSecondsI = 0
    secundomerMilisecondsI = 0
}

//-----Секундомер-----


//-----Флаги-----
let flagsCounter = 0
let totalMiliSeconds = 0

function secundomerFlagAdd() {
    if (flagResetBg.classList.contains('resetting')) return

    const totalMiliSecondsPrevious = totalMiliSeconds
    const miliSeconds = toDoubleNumber(secundomerMiliSeconds.innerText)
    const seconds = secundomerSeconds.innerText
    const minutes = secundomerMinutes.innerText
    if (miliSeconds === "00" && seconds === "00" && minutes === "00") {
        return false
    }

    totalMiliSeconds = Number(minutes) * 60 * 100 + Number(seconds) * 100 + Number(miliSeconds)
    const currentTime = `${minutes}:${seconds}:${miliSeconds}`
    console.log(Number(seconds))
    let leapTimeMiliSeconds = totalMiliSeconds - totalMiliSecondsPrevious

    const leapMinutes = toDoubleNumber(Math.floor(leapTimeMiliSeconds / 6000))
    leapTimeMiliSeconds %= 6000
    const leapSeconds = toDoubleNumber(Math.floor(leapTimeMiliSeconds / 100))
    leapTimeMiliSeconds %= 100
    const leapMiliSeconds = toDoubleNumber(leapTimeMiliSeconds)
    const leapTime = `${leapMinutes}:${leapSeconds}:${leapMiliSeconds}`


    const flagsItem = document.createElement('div')
    flagsItem.classList.add('flags__item')
    flagsItem.innerHTML = `<span>${flagsCounter + 1}</span> ${currentTime}`

    const flagsItemMobile = document.createElement('div')
    flagsItemMobile.classList.add('flags__item')
    flagsItemMobile.innerHTML = `<span>${flagsCounter + 1}</span> <div class="flags__item-info"><div>Время круга: <strong>${leapTime}</strong></div>  <div>Общее время: <strong>${currentTime}</strong></div></div>`


    if (flagsCounter < 10) {
        flagsWrapper1.append(flagsItem)
    } else if (flagsCounter === 20) {
        return false
    } else {
        flagsWrapper2.append(flagsItem)
    }
    flagsMobile.append(flagsItemMobile)
    flagsCounter++
}

//-----Флаги-----


//-----Сброс флагов при удержании кнопки------
let secundomerFlagFillingPercentage = 100
let secundomerFlagInterval
let secundomerFlagTimeout

function secundomerFlagResetFill() {
    window.navigator?.vibrate(1)
    flagResetBg.classList.remove('resettingComplete')
    flagResetBg.style.transition = ''
    secundomerFlagTimeout = setTimeout(() => {
        secundomerFlagInterval = setInterval(() => {
            if (secundomerFlagFillingPercentage <= 0) {
                if (isMobile) {
                    flagsWrapper1.innerHTML = ''
                    flagsWrapper2.innerHTML = ''
                    flagsMobile.classList.add('sliding-out-right')
                    flagsMobile.addEventListener('animationend', () => {
                        flagsMobile.innerHTML = ''
                        flagsMobile.classList.remove('sliding-out-right')
                    }, {once: true})
                } else {
                    flagsMobile.innerHTML = ''
                    flagsWrapper1.classList.add('sliding-out-left')
                    flagsWrapper2.classList.add('sliding-out-right')

                    flagsWrapper1.addEventListener('animationend', () => {
                        flagsWrapper1.innerHTML = ''
                        flagsWrapper1.classList.remove('sliding-out-left')
                    }, {once: true})
                    flagsWrapper2.addEventListener('animationend', () => {
                        flagsWrapper2.innerHTML = ''
                        flagsWrapper2.classList.remove('sliding-out-right')
                    }, {once: true})
                }

                flagsCounter = 0
                secundomerFlagResetComplete()
            }
            flagResetBg.style.transform = `translateY(${secundomerFlagFillingPercentage}%)`
            secundomerFlagFillingPercentage -= 2

        }, 10)

        flagResetBg.classList.add('resetting')
    }, 200)
}

function secundomerFlagResetUnFill() {
    flagResetBg.style.transition = '0.2s transform ease-in-out'
    secundomerFlagFillingPercentage = 100
    flagResetBg.style.transform = `translateY(${secundomerFlagFillingPercentage}%)`
    clearInterval(secundomerFlagInterval)
    clearTimeout(secundomerFlagTimeout)
    flagResetBg.classList.remove('resettingComplete')
}

function secundomerFlagResetComplete() {
    window.navigator?.vibrate([50, 100, 50])
    flagResetBg.classList.remove('resettingComplete')
    clearInterval(secundomerFlagInterval)
    clearTimeout(secundomerFlagTimeout)
    flagResetBg.classList.add('resettingComplete')
    flagResetBg.addEventListener('animationend', () => {
        flagResetBg.style.transform = `translateY(100%)`
        clearInterval(secundomerFlagInterval)
        clearTimeout(secundomerFlagTimeout)
    }, {once: true})
}

//-----Сброс флагов при удержании кнопки------

function inputColorHandler(e) {
    const hex = e.target.value
    const [r, g, b] = hexToRgb(hex)

    const rgba = (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a})`
    const [r1, g1, b1] = hexToRgb(ColorLuminance(hex, 1))
    const [r2, g2, b2] = hexToRgb(ColorLuminance(hex, 1.5))
    htmlStyle.setProperty('--timer-stroke', 'var(--main-color-dark)')
    htmlStyle.setProperty('--dots-color', 'var(--main-color-dark)')
    htmlStyle.setProperty('--input-focus-color', 'var(--main-color-dark)')
    htmlStyle.setProperty('--input-text-color', 'var(--main-color-darkest)')
    htmlStyle.setProperty('--worldItem-main', 'var(--main-color-dark)')
    htmlStyle.setProperty('--worldItem-darker', 'var(--main-color-darkest)')
    htmlStyle.setProperty('--worldItem-time-color', 'white')
    htmlStyle.setProperty('--worldItem-bg', 'var(--white)')
    htmlStyle.setProperty('--menu-active-color', 'var(--text-color1)')
    htmlStyle.setProperty('--menu-active-bg', 'rgba(0, 0, 0, 0.25)')

    //Светлый цвет
    if (1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5) {
        const [r, g, b] = hexToRgb(ColorLuminance(hex, -0.07))
        const [rD, gD, bD] = hexToRgb(ColorLuminance(hex, -0.2))
        htmlStyle.setProperty('--text-color1', 'black')
        htmlStyle.setProperty('--body-background', `linear-gradient(135deg, ${rgba(rD, gD, bD, 0.8)} 0%, ${rgba(r, g, b, 0.2)} 100%)`)
        htmlStyle.setProperty('--timer-border', `${pxToUnit(2, 'em')} solid ${ColorLuminance(hex, -0.3)}`)
        htmlStyle.setProperty('--inputs-background', 'white')
        htmlStyle.setProperty('--inputs-inner-shadow', `inset ${pxToUnit(4, 'em', fzTimerUnitsRatio)} ${pxToUnit(4, 'em', fzTimerUnitsRatio)} ${pxToUnit(7, 'em', fzTimerUnitsRatio)} ${ColorLuminance(hex, -0.3)}, inset ${pxToUnit(-4, 'em', fzTimerUnitsRatio)} ${pxToUnit(-4, 'em', fzTimerUnitsRatio)} ${pxToUnit(7, 'em', fzTimerUnitsRatio)} ${rgba(r, g, b, 0.4)}`)
        htmlStyle.setProperty('--controls-inner-shadow', `inset ${pxToUnit(3, 'rem', 1.5)} ${pxToUnit(3, 'rem', 1.5)} ${pxToUnit(6, 'rem', 1.5)} ${ColorLuminance(hex, -0.3)}, inset ${pxToUnit(-4, 'rem', 1.5)} ${pxToUnit(-4, 'rem', 1.5)} ${pxToUnit(7, 'em', 1.5)} ${rgba(rD, gD, bD, 0.7)}`)
        htmlStyle.setProperty('--controls-shadow', `${pxToUnit(2, 'rem', 2)} ${pxToUnit(2, 'rem', 2)} ${pxToUnit(2, 'rem', 2)} 0 ${ColorLuminance(hex, -0.3)}, ${pxToUnit(-2, 'rem', 2)} ${pxToUnit(-2, 'rem', 2)} ${pxToUnit(3, 'rem', 2)} 0 ${rgba(rD, gD, bD, 1)}`)
        htmlStyle.setProperty('--controls-color', 'var(--main-color-darkest)')
        htmlStyle.setProperty('--flag-color', 'var(--main-color)')
        htmlStyle.setProperty('--icon-color', 'var(--main-color-dark)')
        htmlStyle.setProperty('--icon-color-darker', ColorLuminance(hex, -0.7))
        //Белый цвет
        if (hex === "#ffffff") {
            htmlStyle.setProperty('--timer-stroke', 'var(--black)')
            htmlStyle.setProperty('--timer-border', '2px solid var(--black)')
            htmlStyle.setProperty('--dots-color', 'var(--black)')
            htmlStyle.setProperty('--input-focus-color', 'var(--black)')
            htmlStyle.setProperty('--input-text-color', 'var(--black)')
            htmlStyle.setProperty('--controls-color', 'var(--black)')
            htmlStyle.setProperty('--worldItem-main', 'white')
            htmlStyle.setProperty('--worldItem-darker', 'white')
            htmlStyle.setProperty('--worldItem-time-color', 'var(--black)')
            htmlStyle.setProperty('--worldItem-bg', 'var(--black)')
            htmlStyle.setProperty('--menu-active-color', 'white')
            htmlStyle.setProperty('--menu-active-bg', 'var(--black)')
            htmlStyle.setProperty('--icon-color', 'var(--main-color-darkest)')
            htmlStyle.setProperty('--icon-color-darker', 'var(--black)')
        }
    }
    //Темный цвет
    else {
        const [r, g, b] = hexToRgb(ColorLuminance(hex, 1.3))
        const [rD, gD, bD] = hexToRgb(ColorLuminance(hex, -0.2))
        htmlStyle.setProperty('--text-color1', 'white')
        htmlStyle.setProperty('--inputs-background', 'white')
        htmlStyle.setProperty('--body-background', `linear-gradient(135deg, ${rgba(rD, gD, bD, 0.8)} 0%, ${rgba(r, g, b, 0.2)} 100%)`)
        htmlStyle.setProperty('--timer-border', `${pxToUnit(2, 'em')} solid var(--main-color)`)
        htmlStyle.setProperty('--inputs-inner-shadow', `inset ${pxToUnit(4, 'em', fzTimerUnitsRatio)} ${pxToUnit(4, 'em', fzTimerUnitsRatio)} ${pxToUnit(7, 'em', fzTimerUnitsRatio)} ${ColorLuminance(hex, -0.3)}, inset ${pxToUnit(-4, 'em', fzTimerUnitsRatio)} ${pxToUnit(-4, 'em', fzTimerUnitsRatio)} ${pxToUnit(7, 'em', fzTimerUnitsRatio)} ${rgba(r, g, b, 0.4)}`)
        htmlStyle.setProperty('--controls-inner-shadow', `inset ${pxToUnit(3, 'rem', 1.5)} ${pxToUnit(3, 'rem', 1.5)} ${pxToUnit(6, 'rem', 1.5)} ${rgba(rD, gD, bD, 0.9)}, inset ${pxToUnit(-4, 'rem', 1.5)} ${pxToUnit(-4, 'rem', 1.5)} ${pxToUnit(7, 'em', 1.5)} ${rgba(r, g, b, 0.7)}`)
        htmlStyle.setProperty('--controls-shadow', 'none')
        htmlStyle.setProperty('--controls-color', 'var(--main-color)')
        htmlStyle.setProperty('--flag-color', 'var(--main-color-darkest)')
        htmlStyle.setProperty('--icon-color', ColorLuminance(hex, 0.7))
        htmlStyle.setProperty('--icon-color-darker', 'var(--main-color-dark)')
        //Черный цвет
        if (hex === "#000000") {
            htmlStyle.setProperty('--body-background', `linear-gradient(135deg, #1B1B1B 0%, ${rgba(r, g, b, 0.2)} 100%)`)
            htmlStyle.setProperty('--timer-stroke', 'var(--white)')
            htmlStyle.setProperty('--dots-color', 'white')
            htmlStyle.setProperty('--input-focus-color', 'white')
            htmlStyle.setProperty('--input-text-color', 'black')
            htmlStyle.setProperty('--menu-active-color', 'var(--black)')
            htmlStyle.setProperty('--menu-active-bg', 'var(--white)')
            htmlStyle.setProperty('--icon-color', 'gray')
            htmlStyle.setProperty('--icon-color-darker', 'black')
        }
    }

    htmlStyle.setProperty('--input-color', 'black')
    htmlStyle.setProperty('--main-color', hex)
    htmlStyle.setProperty('--main-color-darkest', ColorLuminance(hex, -0.5))
    htmlStyle.setProperty('--timer-shadow', `${pxToUnit(6, 'em', fzTimerUnitsRatio)} ${pxToUnit(6, 'em', fzTimerUnitsRatio)} ${pxToUnit(5, 'em', fzTimerUnitsRatio)} 0 ${rgba(r1, g1, b1, 0.8)}, ${pxToUnit(-6, 'em', fzTimerUnitsRatio)} ${pxToUnit(-6, 'em', fzTimerUnitsRatio)} ${pxToUnit(5, 'em', fzTimerUnitsRatio)} 0 ${rgba(r2, g2, b2, 0.5)}`)
    htmlStyle.setProperty('--flags-bg', `linear-gradient(145deg, #fff4ff 70%, ${rgba(r2, g2, b2, 0.05)})`)
    htmlStyle.setProperty('--main-color-dark', ColorLuminance(e.target.value, -0.4))
}

function changeColorAnimation(element) {
    setInterval(() => {
        const [r, g, b, a] = [(Math.random() * 255).toFixed(0), (Math.random() * 255).toFixed(0), (Math.random() * 255).toFixed(0), Math.random()]
        const color = 'rgba(' + r + ',' + g + ',' + b + ')'
        element.style.backgroundColor = '#' + rgba2hex(color)
    }, 2000)
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null
}

function rgba2hex(orig) {
    const rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i)
    const hex = rgb ?
        (rgb[1] | 1 << 8).toString(16).slice(1) +
        (rgb[2] | 1 << 8).toString(16).slice(1) +
        (rgb[3] | 1 << 8).toString(16).slice(1) : orig
    return hex
}

function ColorLuminance(hex, lum) {
    hex = String(hex).replace(/[^0-9a-f]/gi, '')
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    lum = lum || 0
    let rgb = "#"
    let c
    for (let i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16)
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16)
        rgb += ("00" + c).substr(c.length)
    }
    return rgb
}
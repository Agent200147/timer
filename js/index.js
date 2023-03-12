// Собственные функции
"use strict";

// -----------------------------------------------

// Текуще время
const header = qs('.header')
const currentTimeContainer = qs('.timer__current-time')
const worldTimeContainer = qs('.worldTime')

const worldTimeItems = [
    {
        city: 'Лондон',
        zone: 'GMT',
        utc: '0',
        // img: 'australia.png'
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
        // img: 'greece.svg'
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

const secundomerMinutes = qs('.secundomer-wrapper__minutes')
const secundomerSeconds = qs('.secundomer-wrapper__seconds')
const secundomerMiliSeconds = qs('.secundomer-wrapper__miliSeconds')

const timer = gbid('timer__self')
const timerBtnWrapper = qsAll('.btn-wrapper')
const timerBtn = qsAll('.timer__btn')

const timerBtnPlay = qs('.timer__btn.btn-play')
const timerBtnStop = qs('.timer__btn.btn-stop')
const timerBtnFlag = qs('.timer__btn.btn-flag')

const timerBtnPlayIcon = qs('.timer__btn-icon')

const secundomer__minutes_unit = qs('.secundomer__minutes-unit')
const secundomer__seconds_unit = qs('.secundomer__seconds-unit')
const secundomer__miliseconds_unit = qs('.secundomer__miliSeconds-unit')

const worldTimeWrapper = qs('.worldTime')


const timerControls = qs('.timer__controls')
const flagsWrapper1 = gbid('flags1')
const flagsWrapper2 = gbid('flags2')

// Таймер
let timer_hours_i = 0
let timer_minutes_i = 0
let timer_seconds_i = 0

// Секундомер
let secundomer_minutes_i = 0
let secundomer_seconds_i = 0
let secundomer_miliseconds_i = 0

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

        if(item.id === "hours")
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
let secundomerSecondsInterval

timerBtnFlag.addEventListener('click', secundomerFlag)


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
    cl(secundomer_miliseconds_i)
    if(secundomer_miliseconds_i === 0 && secundomer_seconds_i === 0 && secundomer_minutes_i === 0){
        timerBtnPlayIcon.classList.remove('paused')
        secundomer__miliseconds_unit.innerText = '00'
        secundomer__seconds_unit.innerText = '00'
        secundomer__minutes_unit.innerText = '00'
    }
    else {
        timerBtnPlayIcon.classList.remove('paused')
        secundomer__miliseconds_unit.innerText = secundomer_miliseconds_i < 10 ? "0" + secundomer_miliseconds_i : secundomer_miliseconds_i
        // secundomer_seconds_i < 10
        //     ? secundomer__seconds_unit.innerText = '0' + secundomer_seconds_i
        //     : secundomer__seconds_unit.innerText = secundomer_seconds_i
        secundomer__seconds_unit.innerText = secundomer_seconds_i < 10 ? "0" + secundomer_seconds_i : secundomer_seconds_i

        secundomer__minutes_unit.innerText = secundomer_minutes_i
        if(secundomerIsGoing){
            timerBtnPlayIcon.classList.add('paused')

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

    // timerSliderHours.style.animation = 'inputAppear1 0.2s forwards'
    // timerSliderMinutes.style.animation = 'inputAppear2 0.2s forwards'
    // timerSliderSeconds.style.animation = 'inputAppear3 0.2s forwards'

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

// function secundomerStart() {
//     clearInterval(secundomerInterval)
//     clearInterval(secundomerSecondsInterval)
//     secundomerIsGoing = true
//     dots.forEach((item, index) => item.classList.add('rotatingSecundomer'))
//
//     let date = new Date()
//     let dateSecondsNull = date.getSeconds()
//     let dateMilliSecondsNull = date.getMilliseconds()
// cl(dateMilliSecondsNull)
//     secundomerInterval = setInterval(() => {
//         let date = new Date()
//         let dateMiliSeconds = date.getMilliseconds()
//
//         secundomer_miliseconds_i = String(dateMiliSeconds).slice(0,2) - String(dateMilliSecondsNull).slice(0,2)
//         secundomer__miliseconds_unit.innerText = secundomer_miliseconds_i
//
//         // secundomer__miliseconds_unit.innerText = secundomer_miliseconds_i
//         // secundomer_miliseconds_i++
//         // if(secundomer_miliseconds_i > 98){
//         //     secundomer_seconds_i += 1
//         //     secundomer__seconds_unit.innerText = secundomer_seconds_i < 10 ? "0" + secundomer_seconds_i : secundomer_seconds_i
//         //     // secundomer_miliseconds_i = 0
//         // }
//
//     }, 10)
//
//     setTimeout(() => {
//         secundomerSecondsInterval = setInterval(() => {
//             let date = new Date()
//             let dateSeconds = date.getSeconds()
//             let dateSeconds2 = dateSeconds
//             secundomer__seconds_unit.innerText = dateSeconds - dateSecondsNull
//         }, 100)
//     }, dateMilliSecondsNull)
//
// }

// // Мой способ
// let seconds = 0
// function secundomerStart() {
//     clearInterval(secundomerInterval)
//     clearInterval(secundomerSecondsInterval)
//     secundomerIsGoing = true
//     dots.forEach((item, index) => item.classList.add('rotatingSecundomer'))
//
//     let date = new Date()
//     let dateSecondsNull = date.getSeconds()
//     let dateMilliSecondsNull = date.getMilliseconds()
//     cl(dateMilliSecondsNull)
//
//     secundomerInterval = setInterval(() => {
//         let date = new Date()
//         let dateMiliSeconds = date.getMilliseconds()
//
//         secundomer_miliseconds_i = String(dateMiliSeconds).slice(0,2) - String(dateMilliSecondsNull).slice(0,2) < 0
//         ? 100 - (String(dateMilliSecondsNull).slice(0,2) - String(dateMiliSeconds).slice(0,2))
//             : String(dateMiliSeconds).slice(0,2) - String(dateMilliSecondsNull).slice(0,2)
//         secundomer__miliseconds_unit.innerText = secundomer_miliseconds_i < 10 ? "0" + secundomer_miliseconds_i : secundomer_miliseconds_i
//
//         // secundomer__miliseconds_unit.innerText = secundomer_miliseconds_i
//         // secundomer_miliseconds_i++
//         // if(secundomer_miliseconds_i > 98){
//         //     secundomer_seconds_i += 1
//         //     secundomer__seconds_unit.innerText = secundomer_seconds_i < 10 ? "0" + secundomer_seconds_i : secundomer_seconds_i
//         //     // secundomer_miliseconds_i = 0
//         // }
//
//     }, 10)
//
//     let dateSeconds2 = date.getSeconds()
//     setTimeout(() => {
//         secundomerSecondsInterval = setInterval(() => {
//             let date = new Date()
//             let dateSeconds = date.getSeconds()
//             if(dateSeconds !== dateSeconds2){
//                 seconds++
//                 secundomer__seconds_unit.innerText = seconds < 10 ? "0" + seconds : seconds
//             }
//             dateSeconds2 = dateSeconds
//         }, 8)
//     },  dateMilliSecondsNull + 50)
// }


function secundomerStart() {
    clearInterval(secundomerInterval)
    clearInterval(secundomerSecondsInterval)
    secundomerIsGoing = true
    dots.forEach((item, index) => item.classList.add('rotatingSecundomer'))

    secundomerInterval = setInterval(() => {
        secundomer_miliseconds_i++
        if(secundomer_miliseconds_i === 100){
            secundomer_miliseconds_i = 0
            secundomer_seconds_i++
            secundomer__seconds_unit.innerText = secundomer_seconds_i < 10 ? "0" + secundomer_seconds_i : secundomer_seconds_i
        }
        
        if(secundomer_seconds_i === 60){
            secundomer__seconds_unit.innerText = "00"
            secundomer_seconds_i = 0
            secundomer_minutes_i++
            secundomer__minutes_unit.innerText = secundomer_minutes_i < 10 ? "0" + secundomer_minutes_i : secundomer_minutes_i
        }
        // secundomer_miliseconds_i = secundomer_miliseconds_i % 100
        secundomer__miliseconds_unit.innerText = secundomer_miliseconds_i < 10 ? "0" + secundomer_miliseconds_i : secundomer_miliseconds_i
    }, 10)
}

function secundomerPause() {
    dots.forEach((item, index) => item.classList.remove('rotatingSecundomer'))
    secundomerIsGoing = false
    clearInterval(secundomerInterval)
    clearInterval(secundomerSecondsInterval)
}

function secundomerStop() {
    secundomer__miliseconds_unit.innerText = '00'
    secundomer__seconds_unit.innerText = '00'
    secundomer__minutes_unit.innerText = '00'

    secundomerPause()
    timerBtnPlayIcon.classList.remove('paused')

    secundomer_minutes_i = 0
    secundomer_seconds_i = 0
    secundomer_miliseconds_i = 0
}


let flagsCounter = 0
function secundomerFlag() {
    let miliSeconds
    let seconds
    let minutes
    miliSeconds = secundomerMiliSeconds.innerText.length < 2 ? secundomerMiliSeconds.innerText + "0" : secundomerMiliSeconds.innerText
    seconds = secundomerSeconds.innerText
    minutes = secundomerMinutes.innerText


    if(miliSeconds === "00" && seconds === "00" && minutes === "00"){
        return false
    }
    const flagsItem = document.createElement('div')
    flagsItem.classList.add('flags__item')
    flagsItem.innerHTML = `<span>${flagsCounter+1}</span> ${minutes}:${seconds}:${miliSeconds}`
    if (flagsCounter < 10){
        flagsWrapper1.append(flagsItem)
    }
    else if(flagsCounter === 20){
        return false
    }
    else{
        flagsWrapper2.append(flagsItem)
    }
    flagsCounter++
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}

const inputColor = gbid('inputColor')
inputColor.oninput = (e) => {
    const hex = e.target.value
    let [r, g, b] = hexToRgb(hex)

    // let rgba = (a) => `rgba(${r}, ${g}, ${b}, ${a})`
    let rgba = (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a})`
    let [r1, g1, b1] = hexToRgb(ColorLuminance(hex, 1))
    let [r2, g2, b2] = hexToRgb(ColorLuminance(hex, 1.5))
    // const inputsBackgroundLight = '#F3E4FF'
    // const inputsBackgroundDark = rgba2(0.8)
    document.documentElement.style.setProperty('--timer-stroke', 'var(--main-color-dark)')
    document.documentElement.style.setProperty('--dots-color', 'var(--main-color-dark)')
    document.documentElement.style.setProperty('--input-focus-color', 'var(--main-color-dark)')
    document.documentElement.style.setProperty('--input-text-color', 'var(--main-color-darkest)')
    document.documentElement.style.setProperty('--worldItem-main', 'var(--main-color-dark)')
    document.documentElement.style.setProperty('--worldItem-darker', 'var(--main-color-darkest)')
    document.documentElement.style.setProperty('--worldItem-time-color', 'white')
    document.documentElement.style.setProperty('--worldItem-bg', 'var(--white)')
    document.documentElement.style.setProperty('--menu-active-color', 'var(--text-color1)')
    document.documentElement.style.setProperty('--menu-active-bg', 'rgba(0, 0, 0, 0.25)')


    if (1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5){
        let [r, g, b] = hexToRgb(ColorLuminance(hex, -0.07))

        document.documentElement.style.setProperty('--text-color1', 'black')
        // document.documentElement.style.setProperty('--inputs-background', inputsBackgroundDark)
        document.documentElement.style.setProperty('--body-background', `linear-gradient(135deg, ${ColorLuminance(hex, -0.15)} 0%, ${rgba(r, g, b, 0.3)} 100%)`)
        document.documentElement.style.setProperty('--timer-border', `2px solid ${ColorLuminance(hex, -0.3)}`)
        document.documentElement.style.setProperty('--inputs-background', ColorLuminance(hex, 2.2))
        document.documentElement.style.setProperty('--inputs-inner-shadow', `inset 4px 4px 7px ${ColorLuminance(hex, -0.3)}, inset -4px -4px 7px ${rgba(r, g, b, 1)}`)
        document.documentElement.style.setProperty('--controls-inner-shadow', `inset 3px 3px 6px ${ColorLuminance(hex, -0.3)}, inset -4px -4px 7px ${rgba(r, g, b, 1)}`)
        document.documentElement.style.setProperty('--controls-shadow', `2px 2px 2px 0 ${ColorLuminance(hex, -0.3)}, -2px -2px 3px 0 ${rgba(r, g, b, 1)}`)
        document.documentElement.style.setProperty('--controls-color', 'var(--black)')

        if(hex === "#ffffff"){
            document.documentElement.style.setProperty('--timer-stroke', 'var(--black)')
            document.documentElement.style.setProperty('--timer-border', '2px solid var(--black)')
            document.documentElement.style.setProperty('--dots-color', 'var(--black)')
            document.documentElement.style.setProperty('--input-focus-color', 'black')
            document.documentElement.style.setProperty('--input-text-color', 'black')
            document.documentElement.style.setProperty('--worldItem-main', 'white')
            document.documentElement.style.setProperty('--worldItem-darker', 'white')
            document.documentElement.style.setProperty('--worldItem-time-color', 'var(--black)')
            document.documentElement.style.setProperty('--worldItem-bg', 'var(--black)')
            document.documentElement.style.setProperty('--menu-active-color', 'white')
            document.documentElement.style.setProperty('--menu-active-bg', 'var(--black)')

        }
    }
    else
    {
        let [r, g, b] = hexToRgb(ColorLuminance(hex, 1.3))

        document.documentElement.style.setProperty('--text-color1', 'white')

        document.documentElement.style.setProperty('--inputs-background', 'white')
        document.documentElement.style.setProperty('--body-background', `linear-gradient(135deg, ${ColorLuminance(hex, 0.7)} 0%, ${rgba(r, g, b, 0.3)} 100%)`)
        document.documentElement.style.setProperty('--timer-border', `2px solid var(--main-color)`)
        document.documentElement.style.setProperty('--inputs-inner-shadow', `inset 4px 4px 7px ${rgba(r1, g1, b1, 0.8)}, inset -4px -4px 7px ${rgba(r2, g2, b2, 0.5)}`)
        document.documentElement.style.setProperty('--controls-inner-shadow', `inset 3px 3px 6px ${rgba(r1, g1, b1, 0.8)}, inset -4px -4px 7px ${rgba(r2, g2, b2, 0.5)}`)
        document.documentElement.style.setProperty('--controls-shadow', 'none')
        document.documentElement.style.setProperty('--controls-color', 'var(--main-color)')

        if(hex === "#000000"){
            document.documentElement.style.setProperty('--timer-stroke', 'var(--white)')
            document.documentElement.style.setProperty('--dots-color', 'white')
            document.documentElement.style.setProperty('--input-focus-color', 'white')
            document.documentElement.style.setProperty('--input-text-color', 'black')

            document.documentElement.style.setProperty('--menu-active-color', 'var(--black)')
            document.documentElement.style.setProperty('--menu-active-bg', 'var(--white)')
        }
    }

    document.documentElement.style.setProperty('--input-color', 'black')
    document.documentElement.style.setProperty('--main-color', hex)
    document.documentElement.style.setProperty('--main-color-darkest', ColorLuminance(hex, -0.5))
    document.documentElement.style.setProperty('--timer-shadow', `6px 6px 5px 0 ${rgba(r1, g1, b1, 0.8)}, -6px -6px 5px 0 ${rgba(r2, g2, b2, 0.5)}`)
    document.documentElement.style.setProperty('--flags-bg', `linear-gradient(145deg, #fff4ff 70%, ${rgba(r2, g2, b2, 0.05)})`)

    // document.documentElement.style.setProperty('--placeholder-color', ColorLuminance(hex, 0.4))

    document.documentElement.style.setProperty('--main-color-dark', ColorLuminance(e.target.value, -0.4))
    // header.style.background = e.target.value
}

const changeColorAnimation = (element) => {
    setInterval(() => {
        let [r, g, b, a] = [(Math.random()*255).toFixed(0), (Math.random()*255).toFixed(0), (Math.random()*255).toFixed(0), Math.random()]
        let color = 'rgba('+ r + ',' + g + ',' + b + ')'
        element.style.backgroundColor = '#' + rgba2hex(color)
    }, 2000)
}

const labelInputColor = document.querySelector('.label-inputColor')
changeColorAnimation(labelInputColor)
// const maincolor = '#8648B4'
// document.documentElement.style.setProperty('--inputs-background', ColorLuminance(maincolor, 2.2))

function rgba2hex(orig) {
    var a, isPercent,
        rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
        hex = rgb ?
            (rgb[1] | 1 << 8).toString(16).slice(1) +
            (rgb[2] | 1 << 8).toString(16).slice(1) +
            (rgb[3] | 1 << 8).toString(16).slice(1) : orig;

    return hex;
}
let [r, g, b, a] = [(Math.random()*255).toFixed(0), (Math.random()*255).toFixed(0), (Math.random()*255).toFixed(0), Math.random()]

let color = 'rgba('+ r + ',' + g + ',' + b + ')'
console.log(rgba2hex(color))
function LightenDarkenColor(col, amt) {

    var usePound = false;

    if (col[0] === "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

}

function ColorLuminance(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
    }

    return rgb;
}

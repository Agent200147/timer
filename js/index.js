
const menu = document.querySelector('.menu')
const menuItems = document.querySelectorAll('.menu__item')
const wrapper = document.querySelector('.timer')

menuItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        menu.classList.remove('firstTab', 'secondTab', 'thirdTab')
        wrapper.classList.remove('firstTab', 'secondTab', 'thirdTab')

        menu.classList.add(item.dataset.id)
        wrapper.classList.add(item.dataset.id)
    })

})

import './timer.js'



import './stopwatch.js'
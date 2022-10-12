const currentTimeContainer = document.querySelector('.timer__current-time')

setInterval(() => {
    let date = new Date()

    let hours
    let minutes
    let seconds

    date.getHours().toString().length === 2 ? hours = date.getMinutes() : hours = "0" + date.getHours()
    date.getMinutes().toString().length === 2 ? minutes = date.getMinutes() : minutes = "0" + date.getMinutes()
    date.getSeconds().toString().length === 2 ? seconds = date.getSeconds() : seconds = "0" + date.getSeconds()

    let currentTime

    currentTime = `${date.getHours()}:${minutes}:${seconds}`
    currentTimeContainer.innerHTML = currentTime
}, 1000)


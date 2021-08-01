const btns = document.querySelectorAll('.btn')
const input = document.querySelector('input[name="Seconds"]')
let started = false
let clicks = 0
let time = 10
let currentTime = time

console.log(!isNaN())

btns.forEach(element => {
    element.addEventListener('click', e => {
        if(time != null){
            if(!started){
                started = true
                let timer = setInterval(() => {
                    currentTime--
                    document.querySelector('.time').innerText = currentTime
                    if(currentTime <= 0){
                        let total = (60 / time) * clicks
                        let cps = total / 60
                        console.log(total, cps)
                        clearInterval(timer)
                        let result = document.createElement('div')
                        result.classList.add('result')
                        result.innerText = `${cps} CPS`
                        let restartBtn = document.createElement('button')
                        restartBtn.classList.add('restart')
                        restartBtn.innerText = "Restart"
                        setTimeout(() => {
                            restartBtn.onclick = () => {
                                started = false
                                clicks = 0
                                currentTime = time
                                document.querySelector('.time').innerText = currentTime
                                result.remove()
                            }
                        }, 2000)
                        result.appendChild(restartBtn)
                        document.body.appendChild(result)
                    }
                }, 1000)
            }
            clicks++
        }
        
        let ripple = document.createElement('div')
        ripple.style.left = `${e.clientX - e.target.offsetLeft}px`
        ripple.style.top = `${e.clientY - e.target.offsetTop}px`
        element.appendChild(ripple)
        setTimeout(() => {
            ripple.remove()
        },1000)
    })
})

input.oninput = () => {
    !isNaN(input.value) || input.value == "" ? time = parseInt(input.value) : time = null
    isNaN(time) ? time = null : time = time
    currentTime = time
    document.querySelector('.time').innerText = currentTime
}
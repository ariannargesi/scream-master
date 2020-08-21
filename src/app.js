import getMicSoundLevel from './audio'
import states from './state'
import nodes from './domNodes'
import createHedges from './hedges'
import { RectCircleColliding, setBallPosition, scoreRating } from './funcs'


//always contain the latest value of microphone sound level
let soundLevel = 0
getMicSoundLevel((x) => {
    if (x) soundLevel = Math.round(x * states.sensitivity)
})

let intervalId

document.addEventListener('keydown', (e) => {
    const key = e.keyCode
    if (key === 32) {
        startGame()
    }
})

nodes.inputSlider.addEventListener('input', (e) => {
    let value = e.target.value / 1000
    value = value.toFixed(2)
    states.sensitivity = value 
})

const startGame = () => {
    if(states.gameOver) {
        reStart()
    }
   else if (states.gameInPlay === false) {
        nodes.startGame.style.display = 'none'
        nodes.soundLevelHint.style.display = "none"
        nodes.sensitivity.style.display = "none"
        states.gameInPlay = true
        if (states.gameOver === false)
            intervalId = setInterval(() => {
                if (states.gameOver === true) clearInterval(createHedges)
                else createHedges()
            }, 2000)
        requestAnimationFrame(updateScreen)
    }
}

const updateScreen = () => {

    if (!states.gameOver) {

        const containerHeight = Math.round(nodes.container.getBoundingClientRect().height)
        const characterOffsetTop = nodes.character.offsetTop

      
        if ( soundLevel > 200 && soundLevel < 600 && characterOffsetTop + 50 < containerHeight && !states.lock) {
            setBallPosition(characterOffsetTop + states.gameSpeed)
        
        }

        else if (soundLevel > 600 && characterOffsetTop > 0){
           setBallPosition(characterOffsetTop - states.gameSpeed)
           // this is a nasty trick that i can explain, event if i want it 
           // when player is screaming sound level goes up
           // and when the player stop doing that, soundlevel variable start decreasing
           // and in the process of decreasing somewhere sound Level gonna be between 200 and 600 
           // and because of that, when ball goes high after player scream, ball goes down a little
           // so i set lock to true 
           // and in the first if statement i check for lock property in states object 
           // if lock was true i won't let the ball goes down
           states.lock = true 
           setTimeout(() => {
            states.lock = false 
           }, 2000)

        }
        
        moveHedges()
        updateScore()
        requestAnimationFrame(updateScreen)
    }
}

const moveHedges = () => {
    if (states.gameInPlay) {
        const hedges = document.getElementsByClassName('hedge')
        for (let hedge of hedges) {
            let hedgeLeft = Math.round(hedge.getBoundingClientRect().left)
            hedgeLeft -= states.gameSpeed
            if (hedgeLeft <= -50) {
                nodes.container.removeChild(hedge)
            }
            hedge.style.left = hedgeLeft + 'px'
            if (RectCircleColliding(nodes.character.getBoundingClientRect(), hedge.getBoundingClientRect())) {
                gameOver()
            }
        }
    }
}
const updateScore = () => {
    const distances = []
    const hedges = document.getElementsByClassName('hedge')

    for (let hedge of hedges) {
        const hedgeDistanceFromLeft = hedge.offsetLeft + hedge.getBoundingClientRect().width
        const characterDistanceFromLeft = nodes.character.offsetLeft
        const distance = hedgeDistanceFromLeft - characterDistanceFromLeft
        if (distance >= -3) distances.push(hedge)
    }
    nodes.score.innerHTML = states.playerScore
}

const reStart = () => {
    states.playerScore = 0
    states.gameInPlay = false 
    states.gameOver = false
    nodes.startGame.style.display = 'none'  
    clearInterval(intervalId)
    // clear screen
    const hedges = document.getElementsByClassName('hedge')
    while(hedges.length){
    for (let hedge of hedges)
        nodes.container.removeChild(hedge)    
    }
    startGame()
}

const gameOver = () => {
    states.gameOver = true
    states.gameInPlay = false
    
    nodes.sensitivity.style.display = "flex"
    nodes.soundLevelHint.style.display = 'block'

    nodes.startGame.innerHTML = "<p class='start-game-text'>Game Over</p>"
    const restart = document.createElement('button')
    restart.setAttribute('class', 'restart')
    restart.addEventListener('click', reStart)
    restart.innerText = 'Try Again'
    const score = document.createElement('p')
    score.innerText = 'You Score is: ' + states.playerScore

    const rateEl = document.createElement('p')
    const rateText = scoreRating(states.playerScore)

    rateEl.innerText = rateText


    

    nodes.startGame.appendChild(restart)
    nodes.startGame.appendChild(score)
    nodes.startGame.appendChild(rateEl)
    nodes.startGame.style.display = 'flex'
}

setInterval(() => {
    nodes.soundLevelNum.innerText = soundLevel
    let className = 'sound-level-number '
    if(soundLevel > 200 && soundLevel < 600)
        className += "color-yellow"
    else if(soundLevel > 600)
        className += "color-green"
    else 
        className += 'color-gray'
    nodes.soundLevelNum.setAttribute('class', className)
}, 30)
setInterval(() => {
    states.playerScore++
}, 30)




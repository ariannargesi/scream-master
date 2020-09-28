
import getMicSoundLevel from './audio'
import states from './state'
import nodes from './domNodes'
import createHedges from './hedges'
import './events'
import { RectCircleColliding, setBallPosition, clearContainer, scoreRating, getBrowserName } from './funcs'

let soundLevel = null 
let intervalId = null 
const deviceHeight = screen.height
const deviceWith = screen.width 
const browserName = getBrowserName()
// preventing the game from running 
const preventRunning = () => {
    states.gameInPlay = null 
    states.gameOver = null 
}

// prevent running the app on edge and safari 
if( browserName === "edge" || browserName === 'safari'){
        preventRunning()
        clearContainer()
        // showign a propper message
        const h1 = document.createElement('h1')
        const h2 = document.createElement('h2')
        h1.innerText = "sorry my friend !!!"
        h2.innerText = "you need to open this game with chrome or Firefox web browser :)"
        nodes.container.appendChild(h1)
        nodes.container.appendChild(h2)
}
if(deviceWith < 768){
    preventRunning()
    clearContainer()

    nodes.container.style.display = "flex"
    nodes.container.style.flexDirection = "column"
    nodes.container.style.justifyContent = "space-between"

    const h4 = document.createElement('h1')
    const p = document.createElement('p')
    const span = document.createElement("span")
    h4.innerText  = "sorry my friend!"
    p.innerText = "for the best game experience, I decided to only let users with a large screen device, such as tablet or laptop to play this game. please come back with a bigger device"
    span.innerText = "I will wait for you"    
    span.style.color = 'rgb(0, 255, 0)'
    nodes.container.appendChild(h4)
    nodes.container.appendChild(p)
    nodes.container.appendChild(span)
    
}
// set the ball speed based on user device height 
const ballSpead = Math.floor(deviceHeight / 200)
states.gameSpeed = ballSpead
// set passages height 
states.passageHeight = deviceHeight / 3.5
//always contain the latest value of microphone sound level
getMicSoundLevel((x) => {
    if (x) soundLevel = Math.round(x * states.sensitivity)
})

document.addEventListener('keydown', (e) => {
    const key = e.keyCode
    if (key === 32 && document.activeElement != nodes.feedbackTextarea ) {
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
        nodes.feedback.style.display = "none"
        nodes.socials.style.display = "none"
        states.gameInPlay = true
        if (states.gameOver === false)
            intervalId = setInterval(() => {
                if (states.gameOver === true) clearInterval(createHedges)
                else createHedges()
            }, 2000)
        requestAnimationFrame(updateScreen)
    }
    // set ball position for center of the page 
    setBallPosition(deviceHeight / 2 - 25 )
}

nodes.startBtn.addEventListener('click', startGame)

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
    nodes.gameOver.style.display = 'none'  
    clearInterval(intervalId)
    // clear screen
    const hedges = document.getElementsByClassName('hedge')
    while(hedges.length){
    for (let hedge of hedges)
        nodes.container.removeChild(hedge)    
    }
    startGame()
}

const gameOver = () =>  {
    states.gameOver = true
    states.gameInPlay = false
    nodes.sensitivity.style.display = "flex"
    nodes.soundLevelHint.style.display = 'block'
    nodes.gameOver.style.display = "flex"
    nodes.startGame.style.display = "none"
    nodes.restartBtn.addEventListener('click', reStart)
    nodes.backToMainBtn.addEventListener('click', () => {
        nodes.gameOver.style.display = "none"
        nodes.startGame.style.display = "flex"
        nodes.feedback.style.display = "block"
        nodes.socials.style.display = "block"
    })
    nodes.gameOverScore.innerText = "your score is: " + states.playerScore
    nodes.gameOverRate. innerText = scoreRating(states.playerScore)

    
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
    if(states.gameInPlay)
    states.playerScore++
}, 30)



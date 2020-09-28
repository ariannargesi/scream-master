import { detect } from 'detect-browser'
import nodes from '../domNodes' 

// return true if the rectangle and circle are colliding
export const RectCircleColliding = (circle, rect) => {
    
    circle.r = 40
    var distX = Math.round(Math.abs(circle.x - rect.x + 18 - rect.width / 2))
    var distY = Math.round(Math.abs(circle.y - (rect.y != 0 ? rect.y -10 : rect.y  - 50) - rect.height / 2))

    if (distX > rect.width / 2 + circle.r) {
        return false
    }
    if (distY > rect.height / 2 + circle.r) {
        return false
    }

    if (distX <= rect.width / 2) {
        return true
    }
    if (distY <= rect.height / 2) {
        return true
    }

    var dx = distX - rect.width / 2
    var dy = distY - rect.height / 2
    return dx * dx + dy * dy <= circle.r * circle.r
}

export const setBallPosition = (position) => {
    nodes.character.style.top = position + 'px'
    return position 
}

export const scoreRating = (score) => {
    if(score < 600)
        return "That's not good, would you like to try again?"
    else if(score > 600 && score < 1200)
        return "This is something! but i belive you can do better"
    else if(score > 1200 && score < 2500)
        return "This is a good record. well done :)"
    else if(score > 2500 && score < 5000)
        return "Impressive record"
    else if (score > 5000 && score < 1000)
        return "The way you play is impeccable"
    else if (score >  3500)
        return "You are phenomenal"
}

export const getBrowserName = () => {
    const browserName = detect().name 
    return browserName
}
export const clearContainer = () => { 
    nodes.container.innerHTML = " "
    nodes.container.style.color = "white"
    nodes.container.style.padding = "2rem"
    nodes.container.style.position = "relative"
}
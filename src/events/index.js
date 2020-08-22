import axios from 'axios'
import nodes from '../domNodes'

const enableFeedbackSend = () => {
    nodes.feedbackSend.style.opacity = "1"
    nodes.feedbackSend.style.pointerEvents = "auto"
    nodes.feedbackTextarea.innerText = "" 
}
const disableFeedbackSend = () => {
    nodes.feedbackSend.style.opacity = "0.5"
    nodes.feedbackSend.style.pointerEvents = "none"
}
nodes.feedbackSend.addEventListener('click', () => {
    const value = nodes.feedbackTextarea.innerText 
    if(value.length > 1000) return 
    disableFeedbackSend()
    axios.post(' https://secure-depths-64550.herokuapp.com/new', {
        feedback: value 
    })
    .then( response => {
        console.log(response.data)
    })
    .catch( err => {
        console.log(err)
    }).finally(() => {
        enableFeedbackSend()
        
        nodes.feedbackTextarea.style.display = "none"
        nodes.feedbackSend.style.display = "none"
        const  feedbackContainer = document.querySelector('.feedback')
        feedbackContainer.style.borderBottom  = "none"
        setTimeout(() => {
            feedbackContainer.style.opacity = 0 
        },2000)
        const feedbackTxt = document.querySelector('.feedback-text')
        feedbackTxt.style.color = "rgb(0, 255, 0)"
        feedbackTxt.innerText = "thank you for your feedback!"

    })
})


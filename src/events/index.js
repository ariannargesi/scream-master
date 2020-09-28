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
        nodes.feedback.style.display = "none"
        const span = document.createElement('span')
        span.innerText = "thanks for your feedback!"
        span.setAttribute('class', 'feedback-thanks')
        document.body.appendChild(span)
        setTimeout(() => {
            document.body.removeChild(span)
        },3000)
    })
})

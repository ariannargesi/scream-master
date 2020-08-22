import axios from 'axios'
import nodes from '../domNodes'
//
nodes.feedbackSend.addEventListener('click', () => {
    const value = nodes.feedbackTextarea.innerText 
    axios.post(' https://secure-depths-64550.herokuapp.com/new', {
        feedback: value 
    })
    .then( response => console.log(response.data) )
    .catch( err => console.log(err) )
})


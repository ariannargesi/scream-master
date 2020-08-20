import nodes from '../domNodes'
import states from '../state'
const createHedges = () => {
    const hedgeTop = document.createElement('div')
    const hedgeBottom = document.createElement('div')

    hedgeTop.setAttribute('class', 'hedge')
    hedgeBottom.setAttribute('class', 'hedge')

    hedgeBottom.style.bottom = 0

    let containerHeight = nodes.container.getBoundingClientRect().height
    containerHeight = Math.round(containerHeight)

    const passageHeight = 200

    let topHedgeheight = Math.random() * (containerHeight * 0.4) + 70
    topHedgeheight = Math.round(topHedgeheight)
    hedgeTop.style.height = topHedgeheight + 'px'
    hedgeTop.style.transform = 'rotate(180deg)'

    let bottomHedgeHeight = containerHeight - (passageHeight + topHedgeheight)
    hedgeBottom.style.height = bottomHedgeHeight + 'px'

    nodes.container.appendChild(hedgeTop)
    nodes.container.appendChild(hedgeBottom)
}
export default createHedges

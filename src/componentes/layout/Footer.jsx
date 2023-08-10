
import styled from 'styled-components'

const Foot= styled.footer`
    height: 30px; 
    color:blue;
`

function Footer(){

    return(
        
        <Foot>
            <span>{ new Date(Date.now()).toLocaleDateString() } </span>
        </Foot>
    )
}

export default Footer
import React from "react"
import styled from "styled-components"
import Header from "./Components/Header"
import Content from "./Components/Content"

const Wrap = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
`

const Size = styled.div`
    display: flex;
    width: 1230px;
    justify-content: center;
    hegiht: 100%;
`
function App(props) {
    return (
        <Wrap>
            <Size>
                <Header></Header>
                <Content>

                </Content>
            </Size>
        </Wrap>
    )
}

export default App
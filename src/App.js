import React, { useState } from "react"
import styled from "styled-components"
import Header from "./Components/Header"
import Content from "./Components/Content"
import PostWrite from "./Components/Post/PostWrite"

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


    const [on, setOn] = useState(false)
    const clickBtn = () => {
        setOn(!on)
        console.log(on)
    }

    

    return (
        <Wrap>
            <Size>
                <Header  clickBtn={clickBtn}/>
                <Content>
                </Content>
            </Size>
            <PostWrite clickBtn={clickBtn} block={on} />
        </Wrap>
    )
}

export default App
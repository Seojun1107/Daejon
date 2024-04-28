import React, { useState } from "react"
import styled from "styled-components"
import Header from "./Components/Header"
import Content from "./Components/Content"
import PostWrite from "./Components/Post/PostWrite"
import {createNickName} from "./Components/Utils/randomNick.js"


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

    const [nick, setNick] = useState()
    const [on, setOn] = useState(false)
    const [heart, setHeart] = useState(0)
    const clickBtn = () => {
        setOn(!on)
        console.log(on)
    }

    const HandleChangeNick = () => {
        setNick(createNickName())
        console.log(nick)
    }

    return (
        <Wrap>
            <Size>
                <Header  clickBtn={clickBtn} createNick={HandleChangeNick}/>
                <Content setHeart={setHeart} heart={heart}/>
            </Size>
            <PostWrite clickBtn={clickBtn} block={on} nick={nick} />
        </Wrap>
    )
}

export default App
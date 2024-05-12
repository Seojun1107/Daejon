import React, { useState } from "react"
import styled from "styled-components"
import Header from "./Components/Header"
import Content from "./Components/Content"
import PostWrite from "./Components/Post/PostWrite"
import {createNickName} from "./Components/Utils/randomNick.js"
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import ChatMain from "./Components/Chat/ChatMain.jsx"

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
    
    @media (max-width: 699px){
        width: 100%;
    }
`
function App(props) {

    const [nick, setNick] = useState()
    const [on, setOn] = useState(false)
    const [heart, setHeart] = useState(0)
    const clickBtn = () => {
        setOn(!on)
    }

    const HandleChangeNick = () => {
        setNick(createNickName())
    }

    return (

        <BrowserRouter>
            <Header  clickBtn={clickBtn} createNick={HandleChangeNick}/>
            <Routes>
                <Route
                    index
                    element={
                        <Wrap>
                            <Size>
                                <Content setHeart={setHeart} heart={heart}/>
                            </Size>
                            <PostWrite clickBtn={clickBtn} block={on} nick={nick}/>
                        </Wrap>
                    }
                />
                <Route path="Chat" element={<ChatMain/>} />
            </Routes>
        </BrowserRouter>

        
    )
}

export default App
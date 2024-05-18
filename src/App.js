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
import MealMain from "./Components/Meal/MealMain.jsx"

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
    const [reportset, setReportset] = useState(false)
    const [heart, setHeart] = useState(0)
    const clickBtn = () => {
        setOn(!on)
    }
    const ClickReportBtn = () => {
        setReportset(!reportset)
    }

    const HandleChangeNick = () => {
        setNick(createNickName())
    }

    return (
        <BrowserRouter>
            <Header block={on} clickBtn={clickBtn} createNick={HandleChangeNick} reportset={reportset} ClickReportBtn={ClickReportBtn}/>
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
                <Route path="Meal" element={<MealMain/>} />
            </Routes>
        </BrowserRouter>

        
    )
}

export default App
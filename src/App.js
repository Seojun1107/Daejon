import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Components/Header";
import Content from "./Components/Content";
import PostWrite from "./Components/Post/PostWrite";
import { createNickName } from "./Components/Utils/randomNick.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChatMain from "./Components/Chat/ChatMain.jsx";
import MealMain from "./Components/Meal/MealMain.jsx";
import AdminMain from "./Components/Admin/Index.jsx";

const Wrap = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
`;

const Size = styled.div`
    display: flex;
    width: 1230px;
    justify-content: center;
    height: 100%;

    @media (max-width: 699px) {
        width: 100%;
    }
`;

function App(props) {
    const [nick, setNick] = useState();
    const [on, setOn] = useState(false);
    const [reportset, setReportset] = useState(false);
    const [heart, setHeart] = useState(0);
    const [isBanned, setIsBanned] = useState(false);
    const [banCountdown, setBanCountdown] = useState(60);

    const clickBtn = () => {
        setOn(!on);
    };

    const ClickReportBtn = () => {
        setReportset(!reportset);
    };

    const HandleChangeNick = () => {
        setNick(createNickName());
    };

    useEffect(() => {
        const refreshTimes = JSON.parse(localStorage.getItem('refreshTimes')) || [];
        const now = Date.now();
        const oneMinuteAgo = now - 60000;
        const recentRefreshTimes = refreshTimes.filter(time => time > oneMinuteAgo);

        if (recentRefreshTimes.length >= 5) {
            const remainingTime = JSON.parse(localStorage.getItem('banRemainingTime')) || 60;
            setIsBanned(true);
            setBanCountdown(remainingTime);
        } else {
            recentRefreshTimes.push(now);
            localStorage.setItem('refreshTimes', JSON.stringify(recentRefreshTimes));
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isBanned && banCountdown > 0) {
                localStorage.setItem('banRemainingTime', JSON.stringify(banCountdown - 1));
                setBanCountdown(banCountdown - 1);
            }
            if (banCountdown <= 0) {
                setIsBanned(false);
                localStorage.removeItem('banRemainingTime');
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isBanned, banCountdown]);

    if (isBanned) {
        return <div>너무 많은 새로고침을 하였습니다. {banCountdown}초 후에 다시 시도해주세요.</div>;
    }

    return (
        <BrowserRouter>
            <Header block={on} clickBtn={clickBtn} createNick={HandleChangeNick} reportset={reportset} ClickReportBtn={ClickReportBtn} />
            <Routes>
                <Route
                    index
                    element={
                        <Wrap>
                            <Size>
                                <Content setHeart={setHeart} heart={heart} />
                            </Size>
                            <PostWrite clickBtn={clickBtn} block={on} nick={nick} />
                        </Wrap>
                    }
                />
                <Route path="Chat" element={<ChatMain />} />
                <Route path="Meal" element={<MealMain />} />
                <Route path="admin" element={<AdminMain />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

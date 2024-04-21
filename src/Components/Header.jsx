import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass, faPenToSquare, faHeart, faBars, faSchool } from "@fortawesome/free-solid-svg-icons";
import Setting from "./Setting";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const Wrap = styled.div`
    position: fixed;
    display: flex;
    width: 70%;
    height: 75px;
    backdrop-filter: blur(10px);
    justify-content: space-between;
    align-items: center;
    padding: 2px 0 0 0;
    z-index: 99999;
    
    @media (max-width: 699px){
        bottom: 0;
    }
`

const Left = styled.div`
    position: relative;
    @media (max-width: 699px){
        display: none;
    }
`

const Center = styled.div`
    display: flex;
    @media (max-width: 699px){
        position: absolute;
        justify-content: start;
    }
`
const Button = styled.div`
    margin: 0 1px;
    padding: 20px 30px;
    border-radius: 10px;
    transition: 0.3s;

    @media (min-width: 700px){
        &:hover {
            background-color: rgba(245,245,245, 0.7);
        }
    }
`
const Right = styled.div`
    position: relative;
    right: 0;

    @media (max-width: 700px) {
        position: fixed;
        right: 20px;
        bottom: auto;
    }
`
const Settings = styled.div`
    position: absolute;
    width: 170px;
    height: 271px;
    bottom: 50px;
    right: 0px;
    border-radius: 10px;
    box-shadow: 0 10.5px 21px rgba(0,0,0, 0.08);
    display: ${(props) => (props.$setting === false ? "none" : "block")};
    animation: ${fadeIn} 0.3s ease-in-out; /* 애니메이션 적용 */
    border: 0.5px solid #eee;

    @media (min-width: 700px) {
        top: 50px;
        right: 0;
        bottom: auto;
    }
`

function Header(props) {
    const [setting, setSetting] = useState(false);
    const settingRef = useRef(null);
    const rightRef = useRef(null);

    const setClick2 = () => {
        setSetting(!setting);
    };

    const handleClickOutside = (event) => {
        if (
            settingRef.current &&
            !settingRef.current.contains(event.target) &&
            rightRef.current &&
            !rightRef.current.contains(event.target)
        ) {
            setSetting(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    
    return (
        <Wrap>
            <Left>
                <a href="http://localhost:4002">
                    <FontAwesomeIcon icon={faSchool} size="2xl" />
                </a>
            </Left>
            <Center>
                <Button>
                    <FontAwesomeIcon icon={faHouse} size="2xl" />
                </Button>
                <Button>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" />
                </Button>
                <Button 
                    onClick={() => {
                        props.clickBtn()
                        props.createNick()
                    }}
                > {/* 3번째 버튼 포스트 작성을 위해 props 제작 */}
                    <FontAwesomeIcon icon={faPenToSquare} size="2xl" />
                </Button>
                <Button>
                    <FontAwesomeIcon icon={faHeart} size="2xl" />
                </Button>
            </Center>
            <Right ref={rightRef}>  
                <FontAwesomeIcon onClick={setClick2} icon={faBars} size="2xl" />
                <Settings ref={settingRef} $setting={setting}>
                    <Setting></Setting>
                </Settings>
            </Right>
        </Wrap>
    );
}

export default Header;

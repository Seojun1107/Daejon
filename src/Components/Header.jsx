import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPenToSquare, faBars, faUtensils, faUser } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";

import Setting from "./Setting";
import { Link, useNavigate } from 'react-router-dom';

const BackgroundWrap = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    height: 75px;
    backdrop-filter: blur(10px);
    justify-content: center;
    z-index: 4;
    
    @media (max-width: 699px) {
        width: 100%;
        background-color: white;
        bottom: 0;
        backdrop-filter: none;
        height: 60px; /* Adjust the height for mobile */
        box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* Add shadow for a more premium look */
    }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Wrap = styled.div`
    display: flex;
    width: 70%;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 2px 0 0 0;

    @media (max-width: 699px) {
        width: 100%;
        justify-content: space-evenly;
    }
`;

const Left = styled.div`
    position: relative;

    @media (max-width: 699px) {
        display: none;
    }
`;

const Center = styled.div`
    display: flex;

    @media (max-width: 699px) {
        display: flex;
        justify-content: space-around;
        width: 100%;
    }
`;

const Button = styled.div`
    margin: 0 1px;
    padding: 20px 30px;
    border-radius: 10px;
    transition: 0.3s;

    @media (min-width: 700px) {
        &:hover {
            background-color: rgba(245, 245, 245, 0.7);
        }
    }

    @media (max-width: 699px) {
        margin: 0;
        padding: 10px 15px; /* Adjust padding for mobile */
        text-align: center; /* Center align text */
    }
`;

const Right = styled.div`
    position: relative;
    right: 0;

    @media (max-width: 700px) {
        display: none;
        position: fixed;
        right: 20px;
        bottom: auto;
    }
`;

const Settings = styled.div`
    position: absolute;
    width: 170px;
    bottom: 50px;
    right: 0px;
    border-radius: 10px;
    box-shadow: 0 10.5px 21px rgba(0, 0, 0, 0.08);
    display: ${(props) => (props.$setting === false ? "none" : "block")};
    animation: ${fadeIn} 0.3s ease-in-out; /* 애니메이션 적용 */
    border: 0.5px solid #eee;

    @media (min-width: 700px) {
        top: 50px;
        right: 0;
        bottom: auto;
    }
`;

function Header(props) {
    const navigate = useNavigate();
    const [setting, setSetting] = useState(false);
    const settingRef = useRef(null);
    const rightRef = useRef(null);

    const toggleSettings = () => {
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
        <BackgroundWrap>
            <Wrap>
                <Left>
                    <Link to="/">
                        <FontAwesomeIcon icon={faInstagram} size="2xl" />
                    </Link>
                </Left>
                <Center>
                    <Link to="/">
                        <Button>
                            <FontAwesomeIcon icon={faHouse} size="2xl" />
                        </Button>
                    </Link>
                    <Button>
                        <Link to="/Meal">
                            <FontAwesomeIcon icon={faUtensils} size="2xl" />
                        </Link>
                    </Button>
                    <Button 
                        onClick={() => {
                            navigate(`/`);
                            props.clickBtn();
                            props.createNick();
                        }}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} size="2xl" />
                    </Button>
                    <Button>
                        <Link to="/Chat">
                            <FontAwesomeIcon icon={faRocketchat} size="2xl" />
                        </Link>
                    </Button>
                    <Button>
                        <Link to="/Profile">
                            <FontAwesomeIcon icon={faUser} size="2xl" />
                        </Link>
                    </Button>
                </Center>
                <Right ref={rightRef}>  
                    <FontAwesomeIcon onClick={toggleSettings} icon={faBars} size="2xl" />
                    <Settings ref={settingRef} $setting={setting}>
                        <Setting preventClose={(e) => e.stopPropagation()} />
                    </Settings>
                </Right>
            </Wrap>
        </BackgroundWrap>
    );
}

export default Header;

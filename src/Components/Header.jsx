import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass, faPenToSquare, faHeart, faBars, faSchool } from "@fortawesome/free-solid-svg-icons";

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
    width: 1230px;
    height: 75px;
    backdrop-filter: blur(10px);
    justify-content: space-between;
    align-items: center;
    padding: 2px 0 0 0;
    z-index: 99999;
`
const Left = styled.div`
`

const Center = styled.div`
    display: flex;
`
const Button = styled.div`
    margin: 0 1px;
    padding: 20px 30px;
    border-radius: 10px;
    transition: 0.3s;
    &:hover {
        background-color: rgba(245,245,245, 0.7);
    }
`
const Right = styled.div`
    position: relative;
`
const Setting = styled.div`
    position: absolute;
    width: 170px;
    height: 271px;
    top: 40px;
    right: 0;
    border-radius: 10px;
    box-shadow: 0 10.5px 21px rgba(0,0,0, 0.08);
    display: ${(props) => props.$setting === false ? "none" : "block"};
    animation: ${fadeIn} 0.3s ease-in-out; /* 애니메이션 적용 */
`
function Header(props) {
    const [setting, setSetting] = useState(false)

    const setClick2 = () => {
        setSetting(!setting)
    }
    
    return(
        <Wrap>
            <Left>
                <FontAwesomeIcon icon={faSchool} size="2xl" />
            </Left>
            <Center>
                <Button>
                    <FontAwesomeIcon icon={faHouse} size="2xl" />
                </Button>
                <Button>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" />
                </Button>
                <Button>
                    <FontAwesomeIcon icon={faPenToSquare} size="2xl" />
                </Button>
                <Button>
                    <FontAwesomeIcon icon={faHeart} size="2xl" />
                </Button>
            </Center>
            <Right>
                <FontAwesomeIcon onClick={setClick2} icon={faBars} size="2xl" />
                <Setting $setting={setting}></Setting>
            </Right>
        </Wrap>
    )
}

export default Header
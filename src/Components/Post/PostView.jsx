import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as HeartOff} from "@fortawesome/free-regular-svg-icons";
import { faHeart as HeartOn} from "@fortawesome/free-solid-svg-icons";
import "./index.css"

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
`
const Header = styled.div`
    display: flex;
    width: 100%;
    align-content:center;
`

const Image = styled.img`
    width:60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid gray;
    display: flex;
    align-content:center;
`
const Span = styled.div`
    display:flex;
    align-content:center;
    padding-left: 10px;
    padding-top: 10px;
`
const Content = styled.div`
    width: 100%;
    font-size: 18px;
    
`
const ContentPost = styled.p`

`
const Footer = styled.div`

`
const Hr = styled.hr`
    margin-top: 20px;
    width: 100%;
`
const HeartView = styled.span`
    position: relative;
    left: 10px;
    color: gray;
`
function PostView(props) {
    const [color, setColor] = useState(false)

    const changeHeartColor = () => {
        setColor(!color)
    }
    return (
        <Wrap>
            <Header>
                <Image src="./user.png" alt="익명유저아이콘" />
                <Span>
                    {props.nick}
                </Span>
            </Header>
            <Content>
                <ContentPost>
                    {props.title}
                </ContentPost>
            </Content>
            <Footer>
                <FontAwesomeIcon icon={color === false ? HeartOff : HeartOn} onClick={changeHeartColor} style={color === false ? "" : {color:"red"}}/>
                <HeartView >{props.heart === 0 ? "" : props.heart}</HeartView>
            </Footer>
            <Hr/>
        </Wrap>
    )
}

export default PostView
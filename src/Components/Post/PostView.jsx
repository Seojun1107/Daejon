import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as HeartOff} from "@fortawesome/free-regular-svg-icons";
import { faHeart as HeartOn} from "@fortawesome/free-solid-svg-icons";
import "./index.css"
import axios from "axios";

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
const SpanWrap = styled.div`
    display:flex;
    flex-direction: column;
    align-content:center;
    padding-left: 10px;
    padding-top: 10px;
`
const Span = styled.div`
    display:flex;
    align-content:center;
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

    const changeHeartColor = async () => {
        try {
            setColor(!color);
            // 서버로 요청을 보냄
            await axios.post("http://localhost:4002/update-heart", {
                index: props.index, // 포스트의 고유 식별자 전달
                action: color ? "unlike" : "like" // 하트 클릭 여부에 따라 다른 액션 전달
            });
            console.log(props.index)
        } catch (error) {
            console.error("Error updating heart:", error);
        }
    };

    return (
        <Wrap>
            <Header>
                <Image src="./user.png" alt="익명유저아이콘" />
                <SpanWrap>
                    <Span>
                        {props.nick}
                    </Span>
                    <Span style={{position:"relative", color: "gray", fontSize:"14px", top:"3px"}}>
                        몇분전
                    </Span>
                </SpanWrap>
            </Header>
            <Content>
                <ContentPost>
                    {props.title}
                </ContentPost>
            </Content>
            <Footer>
                <FontAwesomeIcon
                    icon={color === false ? HeartOff : HeartOn}
                    onClick={changeHeartColor}
                    style={color === false ? "" : {color:"red"}}
                />
                <HeartView >{props.heart === 0 ? "" : props.heart}</HeartView>
            </Footer>
            <Hr/> 
        </Wrap>
    )
}

export default PostView
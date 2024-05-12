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
    display: inline-block;
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

const ImageWrap = styled.div`
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: row;
    overflow:scroll;
    gap: 20px;
    /* 스크롤 바 디자인 제거 */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari */
    }
    margin-bottom: 10px;
`
function PostView(props) {
    const [color, setColor] = useState(false)

    const changeHeartColor = async () => {
        try {
            setColor(!color);
            // 서버로 요청을 보냄
            await axios.post("https://ask.seojun.xyz/update-heart", {
                index: props.index, // 포스트의 고유 식별자 전달
                action: color ? "unlike" : "like" // 하트 클릭 여부에 따라 다른 액션 전달
            });
            console.log(props.index)
        } catch (error) {
            console.error("Error updating heart:", error);
        }
    };
    
    const detailDate = (a) => {
		const milliSeconds = new Date() - a;
		const seconds = milliSeconds / 1000;
		if (seconds < 60) return `방금 전`;
		const minutes = seconds / 60;
		if (minutes < 60) return `${Math.floor(minutes)}분 전`;
		const hours = minutes / 60;
		if (hours < 24) return `${Math.floor(hours)}시간 전`;
		const days = hours / 24;
		if (days < 7) return `${Math.floor(days)}일 전`;
		const weeks = days / 7;
		if (weeks < 5) return `${Math.floor(weeks)}주 전`;
		const months = days / 30;
		if (months < 12) return `${Math.floor(months)}개월 전`;
		const years = days / 365;
		return `${Math.floor(years)}년 전`;
	};
	
	//api에 있는 detailPost.createdAt를 바꿔주는 것
	const nowDate = detailDate(new Date(props.time));

    return (
        <Wrap>
            <Header>
                <Image src="./user.png" alt="익명유저아이콘" />
                <SpanWrap>
                    <Span>
                        {props.nick}
                    </Span>
                    <Span style={{position:"relative", color: "gray", fontSize:"14px", top:"3px"}}>
                        {nowDate}
                    </Span>
                </SpanWrap>
            </Header>
            <Content>
                <ContentPost>
                    {props.title}
                </ContentPost>
                {props.images.length > 0 && (
                    <ImageWrap>
                        {props.images.map((preview, index) => (
                            
                            <img key={index} src={`/uploads/${preview}`} alt={`이미지 미리보기 ${index}`} />
                        ))}
                    </ImageWrap>
                )}
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
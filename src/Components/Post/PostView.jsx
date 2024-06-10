import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as HeartOff } from "@fortawesome/free-regular-svg-icons";
import { faHeart as HeartOn, faBan } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import axios from "axios";
import ViewReport from "./ViewReport";

const Wrap = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Header = styled.div`
    position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #ddd;
`;

const SpanWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const TimeSpan = styled(Span)`
  font-size: 14px;
  color: gray;
  font-weight: normal;
`;

const Content = styled.div`
  width: 100%;
  font-size: 16px;
  margin-bottom: 15px;
`;

const ContentPost = styled.p`
  margin: 5px 0;
  word-wrap: break-word;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
`;

const Hr = styled.hr`
  margin-top: 20px;
  width: 100%;
  border: none;
  border-top: 1px solid #eee;
`;

const HeartView = styled.span`
  margin-left: 10px;
  color: gray;
`;

const ImageWrap = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  margin-bottom: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const PostImage = styled.img`
  height: 180px;
  border-radius: 10px;
  object-fit: cover;
`;

const Report = styled.div`
  margin-left: auto;
  cursor: pointer;
  
  &:hover {
    color: red;
  }
`;

function PostView(props) {
  const [color, setColor] = useState(false);
  const [report, setReport] = useState(false);

  const changeHeartColor = async () => {
    try {
      setColor(!color);
      await axios.post("https://ask.seojun.xyz/update-heart", {
        index: props.index,
        action: color ? "unlike" : "like"
      });
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

  const clickReport = () => {
    setReport(!report);
  };

  const nowDate = detailDate(new Date(props.time));

  return (
    <Wrap>
      <Header>
        <Image src="./user.png" alt="익명유저아이콘" />
        <SpanWrap>
          <Span>{props.nick}</Span>
          <TimeSpan>{nowDate}</TimeSpan>
        </SpanWrap>
        <Report onClick={clickReport}>
          <FontAwesomeIcon icon={faBan} className="report-icon" />
          {report && <ViewReport setReport={setReport} />}
        </Report>
      </Header>
      <Content>
        <ContentPost>{props.title}</ContentPost>
        {props.images.length > 0 && (
          <ImageWrap>
            {props.images.map((preview, index) => (
              <PostImage key={index} src={`/uploads/${preview}`} alt={`이미지 미리보기 ${index}`} />
            ))}
          </ImageWrap>
        )}
      </Content>
      <Footer>
        <FontAwesomeIcon
          icon={color ? HeartOn : HeartOff}
          onClick={changeHeartColor}
          style={color ? { color: "red" } : null}
        />
        <HeartView>{props.heart || ""}</HeartView>
      </Footer>
      <Hr />
    </Wrap>
  );
}

export default PostView;

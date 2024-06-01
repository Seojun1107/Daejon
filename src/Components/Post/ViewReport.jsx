import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Wrap = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  user-select: none;
  top: 0;
  backdrop-filter: blur(10px);
  left: 0;
  z-index: 3;
`;

const ModalWrap = styled.div`
  position: absolute;
  width: 80%;
  max-width: 300px;
  border-radius: 20px;
  background-color: #e9e9e9;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  padding: 30px;
`;

const Ul = styled.ul`
    position: relative;
    margin-top: 40px;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow:hidden;
    padding: 0;
`
const Li = styled.li`
    width: 100%;
    height: 50px;
    background-color: white;
    border-bottom: 1px solid gray;
    color:black;
    line-height: 50px;
    &:last-child{
        border-bottom:none;
    }
    padding-left: 7px;
`

const Header = styled.div`

`
const H3 = styled.h3`
    display: inline;
    color: black;
`
const A = styled.a`
    margin-top: 10px;
    color: black;
    font-size: 14px;
    text-decoration: none;
`
function ViewReport(props) {
    const handleChangeView = () => {
    }


    const handleChangeSpam = () => {
        
    }

    const handleChangeSexual = () => {
        
    }

    return (
        <Wrap>
            <ModalWrap>
                <Header>
                    <H3>신고 사유를 클릭해주세요!</H3>
                    <FontAwesomeIcon icon={faCircleXmark} onClick={handleChangeView} size="2xl" style={{float:"right"}}/>
                </Header>
                <Ul>
                    <Li >스팸</Li>
                    <Li>음란 및 성적 행위</Li>
                    <Li>욕설, 폭력, 혐오</Li>
                    <Li>개인정보 무단 수집</Li>
                    <Li>자살 및 자해</Li>
                    <Li>사기, 사칭</Li>
                    <Li>기타</Li>
                </Ul>
                <A href="https://seojun1107.notion.site/95dfb2fbe68547f18620821327fec336?pvs=4">서비스 운영 원칙 바로가기</A>
            </ModalWrap>
        </Wrap>
    )
}

export default ViewReport
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Wrap = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrap = styled.div`
  width: 80%;
  max-width: 400px;
  border-radius: 20px;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

const Li = styled.li`
  color: black;
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #f9f9f9;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const H3 = styled.h3`
  color: black;
  margin: 0;
`;

const CloseIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const A = styled.a`
  display: block;
  margin-top: 20px;
  color: #007bff;
  font-size: 14px;
  text-decoration: none;
`;

function ViewReport(props) {
  const handleChangeView = () => {
    props.setReport();
  };

  return (
    <Wrap>
      <ModalWrap>
        <Header>
          <H3>신고 사유를 선택해주세요!</H3>
          <CloseIcon icon={faTimesCircle} size="2x" onClick={handleChangeView} />
        </Header>
        <Ul>
          <Li>스팸</Li>
          <Li>음란 및 성적 행위</Li>
          <Li>욕설, 폭력, 혐오</Li>
          <Li>개인정보 무단 수집</Li>
          <Li>자살 및 자해</Li>
          <Li>사기, 사칭</Li>
          <Li>기타</Li>
        </Ul>
        <A href="https://seojun1107.notion.site/95dfb2fbe68547f18620821327fec336?pvs=4">
          서비스 운영 원칙 바로가기
        </A>
      </ModalWrap>
    </Wrap>
  );
}

export default ViewReport;

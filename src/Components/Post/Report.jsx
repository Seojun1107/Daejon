import React from "react";
import styled from "styled-components";
import "./index.css";

function Report({ reportBlock, ReportClickBtn}) {

  return (
    reportBlock ? (
      <Wrap encType="multipart/form-data">
        <ModalWrap>
          <Content>
            <textarea
              style={{
                border: "0",
                minHeight: "16px",
                padding: "5px",
                color: "initial",
                outline: "none",
                resize: "none",
              }}
              rows={1} // 시작 높이 설정
            />
          </Content>
        </ModalWrap>
      </Wrap>
    ) : null
  );
}



const Wrap = styled.form`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.05);
    /* display: ${(props) => props.reportBlock === "false" ? "none" : "block"}; */
    user-select:none;
    top: 0;
    backdrop-filter: blur(10px);
    left: 0;
    z-index: 3;
`

const ModalWrap = styled.div`
    position: absolute;
    width: 80%; /* 상대적인 단위로 변경 */
    max-width: 600px; /* 최대 너비 설정 */
    border-radius: 20px;
    background-color: white;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    padding: 30px;
`;
const Span = styled.div`
    display:flex;
    align-content:center;
    margin-left: 10px;
`
const Content = styled.div`
    width: 100%;
    height: 100%;
    font-size: 18px;
`
const Send = styled.button`
    position: relative;
    width: 100px;
    height: 30px;
    border-radius: 15px;
    border: 0;
    float:right;
    margin-left: 10px;
`
export default Report
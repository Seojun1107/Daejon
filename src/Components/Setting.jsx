



import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    text-decoration: none;
`
const Component = styled.div`
    display: flex;
    padding: 13px 0px 13px 10px;
    border-bottom: 0.5px solid gray;
    text-decoration-line: none;
`
const Move = styled.a`
    text-decoration: none;
    color: black;
    width: 100%;
    height: 100%;
`
function Setting(ClickReportBtn) {
    return (
        <Wrap>
            <Component >테마 설정</Component>
            <Component
            >
                    버그 신고
                </Component>
            <Component><Move href="https://seojun1107.notion.site/8bd346467abb4c8d8739a426b53e0612?pvs=4">개인정보 처리방침</Move></Component>
        </Wrap>
    )
}

export default Setting
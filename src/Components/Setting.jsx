



import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`
const ThemeWrap = styled.div`
    display: flex;

`
const ReportWrap = styled.div`
    diaplay: flex;
`

function Setting(props) {
    return (
        <Wrap>
            <ThemeWrap ></ThemeWrap>
            <ReportWrap></ReportWrap>
        </Wrap>
    )
}

export default Setting
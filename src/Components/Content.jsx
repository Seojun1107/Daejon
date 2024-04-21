import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
    position: relative;
    width: 620px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: red;
    justify-content: center;
    z-index: 1;
    top: 76px;
`

function Content(props) {
    return (
        <Wrap>
        </Wrap>
    )
}

export default Content
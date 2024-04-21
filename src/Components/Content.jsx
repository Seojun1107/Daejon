import React from "react";
import styled from "styled-components";
import PostView from "./Post/PostView";

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
            <PostView />
        </Wrap>
    )
}

export default Content
import React from "react";
import styled from "styled-components";
import PostView from "./Post/PostView";
import data from "../data.json";

const Wrap = styled.div`
    position: relative;
    width: 620px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 3;
    top: 76px;
    padding: 10px;
`;

function Content(props) {
    return (
        <Wrap>
            {data.map((post, index) => (
                <PostView key={index} title={post.title} nick={post.nick} />
            ))}
        </Wrap>
    );
}

export default Content;

import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
`
const Header = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
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

function PostView(props) {
    return (
        <Wrap>
            <Header>
                <Image src="./user.png" alt="익명유저아이콘" />
                <Span>
                    김아무개
                </Span>
            </Header>
            <Content>
                <p
                >
                    룅니ㅗ린ㅇ모링ㄴ뫼ㅏ러ㅗㄴㅁ이ㅏㄹㅇㄴ마ㅣㄹㅇㅁ너
                </p>
            </Content>
        </Wrap>
    )
}

export default PostView
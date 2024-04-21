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
    padding-left: 10px;
    padding-top: 10px;
`
const Content = styled.div`
    width: 100%;
    font-size: 18px;
    
`
const ContentPost = styled.p`

`
const Hr = styled.hr`
    margin-top: 30px;
    width: 100%;
`
function PostView(props) {
    return (
        <Wrap>
            <Header>
                <Image src="./user.png" alt="익명유저아이콘" />
                <Span>
                    {props.nick}
                </Span>
            </Header>
            <Content>
                <ContentPost>
                    {props.title}
                </ContentPost>
            </Content>
            <Hr/>
        </Wrap>
    )
}

export default PostView
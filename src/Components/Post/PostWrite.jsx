
import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import "./index.css"

const Wrap = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.05);
    /* display: ${(props) => props.block === "false" ? "none" : "block"}; */
    user-select:none;
    top: 0;
    backdrop-filter: blur(10px);
    left: 0;
`

const ModalWrap = styled.div`
    position: absolute;
    width: 600px;
    border-radius: 20px;
    background-color: white;
    top: 20%;
    left: 30%;
    background-color: white;
    padding: 30px;
`
const Header = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-content:center;
`

const Image = styled.img`
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

const Attach = styled.div`
    width: 100%;
    height: 100%;
`
const Send = styled.button`
    position: relative;
    width: 100px;
    height: 30px;
    border-radius: 15px;
    border: 0;
    float:right;
`

function PostWrite({block, nick}) {

  // 상태 변수를 사용하여 내용과 포커스 상태를 관리합니다.
    const [title, setTitle] = useState('');

    // p 태그의 내용이 변경될 때마다 상태를 업데이트합니다.
    const handleContentChange = (e) => {
        setTitle(e.target.value);
    };

    return (
        block ? (
            <Wrap block={block}>
                <ModalWrap>
                    <Header>
                        <Image className="PostWriteUser" src="./user.png" alt="익명유저아이콘" />
                        <Span>
                            {nick}
                        </Span>
                    </Header>
                    <Content>
                        <p 
                            suppressContentEditableWarning={true}
                            contentEditable={true}
                            onInput={handleContentChange}
                            style={{ 
                                border: '0',
                                minHeight: '16px',
                                padding: 's5px',
                                color: 'initial',
                                outline: 'none'
                            }}
                        >
                            {title}
                        </p>
                        <Attach>
                            <FontAwesomeIcon 
                                icon={faImage} 
                                style={{marginRight: "10px", cursor:"pointer"}} 
                            />
                            <FontAwesomeIcon icon={faBarsStaggered} />
                            <Send>작성하기</Send>
                        </Attach>
                    </Content>
                </ModalWrap>
            </Wrap>
        ) : null
    )
}
export default PostWrite
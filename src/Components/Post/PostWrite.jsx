
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
    background-color: red;
    padding: 30px;
    border: 0.5px solid;
    border-color: rgb(40,40,40);
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
const Footer = styled.div`
`

function PostWrite({block}) {

  // 상태 변수를 사용하여 내용과 포커스 상태를 관리합니다.
    const [content, setContent] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    // p 태그의 내용이 변경될 때마다 상태를 업데이트합니다.
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    // p 태그에 포커스가 들어오거나 나갈 때 상태를 업데이트합니다.
    const handleFocusChange = (focused) => {
        setIsFocused(focused);
    };
    return (
        block ? (
            <Wrap block={block}>
                <ModalWrap>
                    <img className="PostWriteUser" src="./user.png" alt="익명유저아이콘" />
                    <Content>
                        <p 
                            contentEditable
                            onInput={handleContentChange}
                            onFocus={() => handleFocusChange(true)}
                            onBlur={() => handleFocusChange(false)}
                            style={{ 
                                border: '1px solid #ccc',
                                minHeight: '16px',
                                padding: '5px',
                                color: isFocused ? 'initial' : '#aaa', // 포커스 여부에 따라 글자색 변경,
                            }}
                        >
                            {content}
                        </p>
                        <Attach>
                            <FontAwesomeIcon icon={faImage} style={{marginRight: "10px"}}/>
                            <FontAwesomeIcon icon={faBarsStaggered} />
                        </Attach>
                    </Content>
                    <Footer>

                    </Footer>
                </ModalWrap>
            </Wrap>
        ) : null
    )
}
export default PostWrite
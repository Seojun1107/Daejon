
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
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
    z-index: 3;
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
    margin-left: 10px;
`

function PostWrite({block, nick, clickBtn}) {
  // 상태 변수를 사용하여 내용과 포커스 상태를 관리합니다.
    const [title, setTitle] = useState("");

    // p 태그의 내용이 변경될 때마다 상태를 업데이트합니다.
    const handleContentChange = (e) => {
        setTitle(e.target.value);
        textareaRef.current.style.height = 'auto'; // height 초기화
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    };
    const [ ip , setIp ] = useState();

    useEffect( () => {    
        axios.get('https://geolocation-db.com/json/')    
        .then((res) => {      
            setIp(res.data.IPv4)    
        })  
    },[clickBtn])

        
    // 글 작성 후 서버로 데이터를 전송하는 함수
    
    const SendPostData = async (ip, title, nick) => {
        try {
          const response = await axios.post("http://localhost:4002/post", {
            ip,
            title,
            nick,
          });
          console.log(response.data); // 서버로부터의 응답 확인
        } catch (error) {
          console.error("Error sending data:", error);
        }
      };
      
      // Send 버튼 클릭 시 호출되는 함수
      const handleSendClick = () => {
        SendPostData(ip, title, nick);
        setTitle("")
        clickBtn()

      };

    const textareaRef = useRef();
  
    return (
        block ? (
            <Wrap block={block} >
                <ModalWrap>
                    <Header>
                        <Image className="PostWriteUser" src="./user.png" alt="익명유저아이콘" />
                        <Span>
                            {nick}
                        </Span>
                    </Header>
                    <Content>
                        <textarea
                            onChange={handleContentChange}
                            style={{ 
                                border: '0',
                                minHeight: '16px',
                                padding: '5px',
                                color: 'initial',
                                outline: 'none'
                            }}
                            value={title}
                            ref={textareaRef}
                            rows={1} // 시작 높이 설정
                        >
                        </textarea>
                        <Attach>
                            <FontAwesomeIcon 
                                icon={faImage} 
                                style={{marginRight: "10px", cursor:"pointer"}} 
                            />
                            <FontAwesomeIcon icon={faBarsStaggered} />
                            <Send onClick={handleSendClick}>작성하기</Send>
                            <Send onClick={clickBtn}>취소</Send>
                        </Attach>
                    </Content>
                </ModalWrap>
            </Wrap>
        ) : null
    )
}
export default PostWrite
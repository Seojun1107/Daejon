import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./index.css";

function PostWrite({ block, nick, clickBtn}) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기 상태 추가
  const [ip, setIp] = useState();
  const id = Date.now()

  const handleContentChange = (e) => {
    setTitle(e.target.value);
    textareaRef.current.style.height = "auto"; // height 초기화
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  // 이미지 파일 선택 시 미리보기 생성
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }
  };


  useEffect(() => {
    axios.get("https://geolocation-db.com/json/").then((res) => {
      setIp(res.data.IPv4);
    });
  }, [clickBtn]);

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      alert("이미지 파일(jpeg, png, gif)만 업로드 가능합니다.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:4002/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const SendPostData = async (ip, title, nick) => {
    try {
      const response = await axios.post("http://localhost:4002/post", {
        id,
        ip,
        title,
        nick
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleSendClick = () => {
    handleUpload();
    SendPostData(ip, title, nick);
    setTitle("");
    setFile(null); // 이미지 초기화
    setImagePreview(null); // 이미지 미리보기 초기화
    clickBtn();
  };

  const textareaRef = useRef();

  return (
    block ? (
      <Wrap block={block} encType="multipart/form-data">
        <ModalWrap>
          <Header>
            <Image className="PostWriteUser" src="./user.png" alt="익명유저아이콘" />
            <Span>{nick}</Span>
          </Header>
          <Content>
            <textarea
              onChange={handleContentChange}
              style={{
                border: "0",
                minHeight: "16px",
                padding: "5px",
                color: "initial",
                outline: "none",
                resize: "none",
              }}
              value={title}
              ref={textareaRef}
              rows={1} // 시작 높이 설정
            />
            {imagePreview && <img src={imagePreview} alt="이미지 미리보기" style={{width:"40%"}}/>} {/* 이미지 미리보기 */}
            <Attach>
              <input
                type="file"
                name="file"
                id="file"
                required
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.gif" // 허용할 확장자 지정
              />
              <label className="custom-file-label" htmlFor="file">
                <FontAwesomeIcon icon={faImage} style={{ marginRight: "10px", cursor: "pointer" }} />
              </label>
              <FontAwesomeIcon icon={faBarsStaggered} />
              <Send onClick={handleSendClick} type="submit">
                작성하기
              </Send>
              <Send onClick={clickBtn}>취소</Send>
            </Attach>
          </Content>
        </ModalWrap>
      </Wrap>
    ) : null
  );
}



const Wrap = styled.form`
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

export default PostWrite
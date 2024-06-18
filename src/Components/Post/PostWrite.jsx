import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import badWords from '../Utils/badWord.json';
import "./index.css";
import Captcha from "../Utils/Captcha";

function PostWrite({ block, nick, clickBtn }) {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [ip, setIp] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const id = Date.now();
  const textareaRef = useRef();
  const [write, setWrite] = useState(true);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const handleContentChange = (e) => {
    setTitle(e.target.value);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    const previews = selectedFiles.map(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
      });
    });

    Promise.all(previews).then(setImagePreviews);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/posts');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [clickBtn]);

  useEffect(() => {
    if (!ip) {
      axios.get("https://geolocation-db.com/json/")
        .then((res) => {
          setIp(res.data.IPv4);
        })
        .catch((error) => {
          console.error('Error fetching IP:', error);
        });
    }
  }, [ip]);

  const containsBadWords = (text) => {
    return badWords.some(badWord => text.toLowerCase().includes(badWord.toLowerCase()));
  };

  const handleUpload = async (postIndex) => {
    if (!files.length) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

    if (!validFiles.length) {
      alert("이미지 파일(jpg, jpeg, png, gif)만 업로드 가능합니다.");
      return;
    }

    const formData = new FormData();
    validFiles.forEach((file) => {
      formData.append('image', file);
    });
    try {
      await axios.post("https://ask.seojun.xyz/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        params: { index: postIndex }
      });
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const sendPostData = async () => {
    if (!title.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      if (containsBadWords(title)) {
        alert('비속어가 포함되어 있습니다. 메시지를 수정해 주세요.');
        return;
      }
      const postIndex = data.length === 0 ? 1 : data.length + 1;
      await axios.post("https://ask.seojun.xyz/post", {
        id,
        ip,
        title,
        nick
      });
      await handleUpload(postIndex);
      setTitle("");
      setImagePreviews([]);
      setFiles([]);
      clickBtn();
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleSendClick = (e) => {
    e.preventDefault();
    setShowCaptcha(true);
  };

  const handleCaptchaVerify = async () => {
    setShowCaptcha(false);
    await sendPostData();
  };

  return (
    write === true ? (
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
                rows={1}
                placeholder="내용을 입력하세요..."
              />
              {imagePreviews.length > 0 && (
                <PreviewImgDiv>
                  {imagePreviews.map((preview, index) => (
                    <img key={index} src={preview} alt={`이미지 미리보기 ${index}`} />
                  ))}
                </PreviewImgDiv>
              )}
              <Attach>
                <input
                  type="file"
                  name="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.gif"
                  multiple
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
          {showCaptcha && (
            <CaptchaWrapper>
              <Captcha onCaptchaVerify={handleCaptchaVerify} />
            </CaptchaWrapper>
          )}
        </Wrap>
      ) : null
    ) : (
      <Wrap>
        <ModalWrap>
          <Captcha></Captcha>
        </ModalWrap>
      </Wrap>
    )
  );
}

const Wrap = styled.form`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  user-select: none;
  top: 0;
  backdrop-filter: blur(10px);
  left: 0;
  z-index: 3;
`;

const ModalWrap = styled.div`
  position: absolute;
  width: 80%;
  max-width: 600px;
  border-radius: 20px;
  background-color: white;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 30px;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-content: center;
`;

const Image = styled.img`
  display: flex;
  align-content: center;
`;

const Span = styled.div`
  display: flex;
  align-content: center;
  margin-left: 10px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  font-size: 18px;
`;

const Attach = styled.div`
  width: 100%;
  height: 100%;
`;

const Send = styled.button`
  position: relative;
  width: 100px;
  height: 30px;
  border-radius: 15px;
  border: 0;
  float: right;
  margin-left: 10px;
  cursor: pointer;
`;

const PreviewImgDiv = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: row;
  overflow: scroll;
  gap: 20px;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CaptchaWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default PostWrite;

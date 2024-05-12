import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./index.css";
import database from "../../data.json"

function PostWrite({ block, nick, clickBtn}) {
  const [data, setData] = useState(database)
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [ip, setIp] = useState();
  const [imagePreviews, setImagePreviews] = useState([]);
  const id = Date.now()
  const handleContentChange = (e) => {
    setTitle(e.target.value);
    textareaRef.current.style.height = "auto"; // height 초기화
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  // 이미지 파일 선택 시 미리보기 생성
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    const previews = [];
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.push(e.target.result);
        setImagePreviews([...previews]);
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    setData(database);
    console.log(data)
  },[clickBtn, data])
  useEffect(() => {
    axios.get("https://geolocation-db.com/json/").then((res) => {
      setIp(res.data.IPv4);
    });
  }, [clickBtn]);

  const handleUpload = async () => {
    if (!files.length) {
      return;
    }
  
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));
  
    if (!validFiles.length) {
      alert("이미지 파일(jpg, jpeg, png, gif)만 업로드 가능합니다.");
      return;
    }
  
    const formData = new FormData();
    validFiles.forEach((file, index) => {
      formData.append(`image`, file); // 각 파일을 formData에 추가
    });
  
    try {
      const res = await axios.post("https://ask.seojun.xyz/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        params: {
          index: data.length === 0 ? 1 : data.length + 1
        }
      });
      console.log(data)
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const SendPostData = async (ip, title, nick) => {
    try {
      const response = await axios.post("https://ask.seojun.xyz/post", {
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

  const handleSendClick = async (e) => {
    e.preventDefault();
    await SendPostData(ip, title, nick);
    await handleUpload();
    setTitle("");
    setImagePreviews([]); // 이미지 미리보기 초기화
    setFiles([]); // 이미지 초기화
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
                required
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.gif" // 허용할 확장자 지정
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
    width: 80%; /* 상대적인 단위로 변경 */
    max-width: 600px; /* 최대 너비 설정 */
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
const PreviewImgDiv = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: row;
  overflow:scroll;
  gap: 20px;

  /* 스크롤 바 디자인 제거 */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
      display: none; /* Chrome, Safari */
  }
`
export default PostWrite
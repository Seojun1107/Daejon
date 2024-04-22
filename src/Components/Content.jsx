import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostView from "./Post/PostView";
import axios from "axios";

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
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4002/data.json");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData(); // 페이지가 처음 로드될 때 데이터를 가져옴

    // 주기적으로 데이터를 업데이트하기 위한 타이머 설정 (예: 5초마다)
    const intervalId = setInterval(fetchData, 1000);

    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트될 때 타이머 해제
    };
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  return (
    <Wrap>
      {posts.map((post, index) => (
        <PostView key={index} title={post.title} nick={post.nick} />
      ))}
    </Wrap>
  );
}

export default Content;





/* 

import React, { useState, useEffect } from "react";
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
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // 초기 데이터 로드
        loadPosts();
    }, []);

    useEffect(() => {
        // 스크롤 이벤트 리스너 등록
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const loadPosts = () => {
        setLoading(true);
        // 여기서는 간단히 데이터를 추가하는 방식으로 구현합니다.
        setTimeout(() => {
            const newPosts = data.slice(posts.length, posts.length + 5); // 5개씩 추가
            setPosts(prevPosts => [...prevPosts, ...newPosts]);
            setLoading(false);
        }, 1000); // 임의의 로딩 시간 설정
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            // 페이지 하단에 도달하면 추가 데이터 로드
            if (!loading) {
                loadPosts();
            }
        }
    };

    return (
        <Wrap>
            {posts.map((post, index) => (
                <PostView key={index} title={post.title} nick={post.nick} />
            ))}
            {loading && <p>Loading...</p>}
        </Wrap>
    );
}

export default Content;

*/
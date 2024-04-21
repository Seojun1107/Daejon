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
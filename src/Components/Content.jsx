import React, { useEffect, useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import PostView from "./Post/PostView";

const Wrap = styled.div`
  position: relative;
  width: 620px; /* 변경된 부분 */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 3;
  top: 76px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 0 auto; /* 중앙 정렬을 위해 추가 */

  @media (max-width: 699px) { 
    width: 100%;
    top: 0;
  }
`;

function Content(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const socket = io("wss://ask.seojun.xyz");

    socket.on("posts", (data) => {
      setPosts(data.reverse());
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Wrap>
      {posts.map((post, index) => (
        <PostView
          key={index}
          index={post.index}
          title={post.title}
          nick={post.nick}
          heart={post.heart}
          setHeart={props.setHeart}
          time={post.id}
          images={post.image}
        />
      ))}
    </Wrap>
  );
}

export default Content;

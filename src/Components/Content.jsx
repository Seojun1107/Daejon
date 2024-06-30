import React, { useEffect, useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import PostView from "./Post/PostView";
import { useInView } from "react-intersection-observer";

const Wrap = styled.div`
  position: relative;
  width: 620px; 
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 3;
  top: 76px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 0 auto;

  @media (max-width: 699px) { 
    width: 100%;
    top: 0;
    padding-bottom: 75px;
  }
`;

const PostWrapper = styled.div`
  opacity: ${(props) => (props.inView ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
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
        <PostItem key={index} post={post} setHeart={props.setHeart} />
      ))}
    </Wrap>
  );
}

function PostItem({ post, setHeart }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <PostWrapper ref={ref} inView={inView}>
      <PostView
        index={post.index}
        title={post.title}
        nick={post.nick}
        heart={post.heart}
        setHeart={setHeart}
        time={post.id}
        images={post.image}
      />
    </PostWrapper>
  );
}

export default Content;

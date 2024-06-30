// src/components/PostImage.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Skeleton from '../Utils/Skeleton';

const ImageContainer = styled.div`
  position: relative;
  height: 180px;
`;

const StyledImage = styled.img`
  height: 180px;
  border-radius: 10px;
  object-fit: cover;
  display: ${props => (props.isLoaded ? 'block' : 'none')};
`;

const PostImage = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <ImageContainer>
      {!isLoaded && <Skeleton width="100px"/>}
      <StyledImage src={src} alt={alt} onLoad={handleImageLoad} isLoaded={isLoaded} />
    </ImageContainer>
  );
};

export default PostImage;
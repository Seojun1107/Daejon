import React from 'react';
import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

const SkeletonDiv = styled.div`
  height: 180px;
  background: linear-gradient(90deg, #f0f0f0, #e0e0e0, #f0f0f0);
  background-size: 200% 100%;
  animation: ${loading} 1.5s infinite linear;
  border-radius: 10px;
`;

const Skeleton = ({width}) => {
  return <SkeletonDiv style={{width:`${width}`}}></SkeletonDiv>;
};

export default Skeleton;
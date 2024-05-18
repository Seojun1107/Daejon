import React from "react";
import styled from "styled-components";


function MealMain(props) {
    return (
        <Wrap>
            
        </Wrap>
    )
}

const Wrap = styled.div`
  position: relative;
  width: 620px; /* 변경된 부분 */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 3;
  top: 76px;
  padding: 10px;
  margin: 0 auto; /* 중앙 정렬을 위해 추가 */

  @media (max-width: 699px) { 
    width: 100%;
    top: 0;
  }
`;
export default MealMain
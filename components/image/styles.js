import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  
  & .swiper-slide {
    text-align: center;
  }
`;
export const Header = styled.header`
  height: 44px;
  position: relative;
  padding: 0;
  text-align: center;
  
  & h1 {
    font-size: 16px;
    color: #333;
    line-height: 44px;
  }
  
  & button {
    width: 44px;
    height: 44px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 100;
    line-height: 1.5;
    border: none;
    cursor: pointer;
  }
`;
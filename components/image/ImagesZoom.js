import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import SwiperCore, { Lazy, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from "styled-components";

SwiperCore.use([Pagination, Lazy]);

import "swiper/swiper.min.css";

const getSwiperConfig = () =>({
  slidesPerView: 'auto',
  spaceBetween: 30,
  centeredSlides: true,
  centeredSlidesBounds: true,
  pagination: {
    clickable: true
  }
});
const Overlay = styled.div`
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
const Header = styled.header`
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

const ImagesZoom = ({ images, onClose }) => {
  return (
    <Overlay>
      <Header>
        <h1>상세 이미지</h1>
        <button onClick={onClose}>X</button>
      </Header>
      <div>
        <Swiper {...getSwiperConfig}>
          {images.map((history, index) => (
            <SwiperSlide key={index}>
              <img src={history.src} alt={history.src} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Overlay>
  )
}

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired
}

export default ImagesZoom;
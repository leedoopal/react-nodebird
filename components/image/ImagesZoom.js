import React from 'react';
import PropTypes from 'prop-types';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Overlay, Header } from './styles';

SwiperCore.use([Navigation, Pagination]);

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"

const getSwiperConfig = () => ({
  slidesPerView: 'auto',
  spaceBetween: 30,
  centeredSlides: true,
  centeredSlidesBounds: true,
  pagination: true
});

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
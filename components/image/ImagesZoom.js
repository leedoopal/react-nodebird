import React from 'react';
import PropTypes from 'prop-types';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { Overlay, Header } from './styles';
import urls from '../../config/urls';

SwiperCore.use([Navigation, Pagination]);

const getSwiperConfig = () => ({
  slidesPerView: 'auto',
  spaceBetween: 30,
  centeredSlides: true,
  centeredSlidesBounds: true,
  pagination: true,
});

const replaceImageUrl = (path) => `${urls.hostUrl}/${path}`;

const ImagesZoom = ({ images, onClose }) => (
  <Overlay>
    <Header>
      <h1>상세 이미지</h1>
      <button type="button" onClick={onClose}>
        X
      </button>
    </Header>
    <div>
      <Swiper {...getSwiperConfig}>
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <img
              src={replaceImageUrl(image.src)}
              alt={replaceImageUrl(image.src)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </Overlay>
);

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;

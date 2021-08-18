import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from '../image/ImagesZoom';

const PostImage = ({ images }) => {
  const styles = useMemo(
    () => ({
      margin: '16px 0',
      textAlign: 'center',
    }),
    [],
  );
  const imageStyles = useMemo(
    () => ({
      width: 'auto',
      maxHeight: '200px',
      display: 'flex',
      margin: '0 auto',
    }),
    [],
  );

  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
          style={imageStyles}
        />
        {showImagesZoom && <ImagesZoom image={images} onClose={onClose} />}
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <img
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
          style={imageStyles}
        />
        <img
          role="presentation"
          src={images[1].src}
          alt={images[0].src}
          onClick={onZoom}
          style={imageStyles}
        />
        {showImagesZoom && <ImagesZoom image={images} onClose={onClose} />}
      </>
    );
  }

  return (
    <>
      <div>
        <img
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
          style={{ width: '100%' }}
        />
        <div style={styles}>
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImage.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImage;

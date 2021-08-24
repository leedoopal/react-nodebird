import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { PlusOutlined } from '@ant-design/icons';

import urls from '../../config/urls';
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

  const replaceImageUrl = (path) => `${urls.hostUrl}/${path}`;

  return (
    <>
      <div>
        <img
          role="presentation"
          src={replaceImageUrl(images[0].src)}
          alt={replaceImageUrl(images[0].src)}
          onClick={onZoom}
          style={{ width: '100%' }}
        />
        {images.length > 1 && (
          <div style={styles} onClick={onZoom}>
            <PlusOutlined />
            <br />
            {images.length - 1}
            개의 사진 더보기
          </div>
        )}
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImage.propTypes = {
  // eslint-disable-next-line react/require-default-props
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImage;

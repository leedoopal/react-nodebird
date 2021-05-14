import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";

const PostImage = ({ images }) => {
  const styles = useMemo(() => ({
    margin: '16px 0',
    textAlign: 'center'
  }), []);
  const imageStyles = useMemo(() => ({
    width: '50%',
    maxHeight: '200px',
    display: 'inline-block'
  }), []);

  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img role="presentation" src={images[0].src} alt={images[0].src}
             onClick={onZoom} style={imageStyles} />
      </>
    )
  }

  if (images.length === 2) {
    return (
      <>
        <img role="presentation" src={images[0].src} alt={images[0].src}
             onClick={onZoom} style={imageStyles} />
        <img role="presentation" src={images[1].src} alt={images[0].src}
             onClick={onZoom} style={imageStyles} />
      </>
    )
  }

  return (
    <div>
      <img role="presentation" src={images[0].src} alt={images[0].src}
           onClick={onZoom} style={{ width: '100%' }} />
      <div style={styles}>
        <PlusOutlined />
        <br />
        {images.length - 1}개의 사진 더보기
      </div>
    </div>
  )
};

PostImage.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object)
}

export default PostImage;
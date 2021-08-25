import React, { useCallback, useRef } from 'react';
import Router from 'next/router';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { Button, Form, Input } from 'antd';

import urls from '../../config/urls';
import { currentImagePath, currentMainPosts } from '../../stores/post';
import { userMe } from '../../stores/user';
import useInput from '../../hooks/useInput';
import { addPostAction, uploadImagesAction } from '../../server/api/post';

const PostForm = () => {
  const me = useRecoilValue(userMe);
  const setMainPosts = useSetRecoilState(currentMainPosts);
  const [imagePaths, setImagePaths] = useRecoilState(currentImagePath);

  const imageInput = useRef();
  const [text, onChangeText, setText] = useInput('');

  // eslint-disable-next-line consistent-return
  const onSubmit = useCallback(async () => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }

    const formData = new FormData();

    if (imagePaths) {
      imagePaths.forEach((path) => {
        formData.append('image', path);
      });
    }

    formData.append('content', text);

    if (!me) Router.push('/');

    const data = await addPostAction(formData);
    data.content = data.content.replace(/['"]+/g, '');

    setMainPosts(data);
    setText('');
  }, [text, imagePaths]);
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback(async (e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (file) => {
      imageFormData.append('image', file);
    });
    const data = await uploadImagesAction(imageFormData);
    setImagePaths(data);
  }, []);

  const onRemoveImage = useCallback(
    (index) => {
      setImagePaths(imagePaths.filter((path, i) => i !== index));
    },
    [imagePaths],
  );

  return (
    <Form>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button type="button" onClick={onClickImageUpload}>
          이미지 업로드
        </Button>
        <Button type="button" onClick={onSubmit}>
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths &&
          imagePaths.map((image, i) => (
            <div key={image} style={{ display: 'inline-block' }}>
              <img
                src={`${urls.hostUrl}/${image}`}
                style={{ width: '200px' }}
                alt={image}
              />
              <div>
                <Button type="button" onClick={() => onRemoveImage(i)}>
                  제거
                </Button>
              </div>
            </div>
          ))}
      </div>
    </Form>
  );
};

export default PostForm;

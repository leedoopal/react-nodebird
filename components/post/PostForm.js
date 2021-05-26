import React, { useCallback, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import shortID from 'shortid';
import { updateMainPosts } from '../../stores/post';
import useInput from '../../hooks/useInput';

const PostForm = () => {
  const setMainPosts = useSetRecoilState(updateMainPosts);
  const imageInput = useRef();

  const [text, onChangeText, setText] = useInput('');
  const onSubmit = useCallback(() => {
    const newPost = {
      id: shortID.generate(),
      content: text,
      user: {
        email: 'cindy',
        nickname: 'cindy',
      },
    };
    setMainPosts(newPost);
    setText('');
  }, [text]);
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <div>
      <input
        type="text"
        onChange={onChangeText}
        placeholder="어떤 일이 있었나요?"
        value={text}
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <button onClick={onClickImageUpload}>이미지 업로드</button>
        <button onClick={onSubmit}>짹짹</button>
      </div>
    </div>
  );
};

export default PostForm;

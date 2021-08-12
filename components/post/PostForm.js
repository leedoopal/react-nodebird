import React, { useCallback, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import shortID from 'shortid';
import { currentMainPosts } from '../../stores/post';
import { userMe } from '../../stores/user';
import useInput from '../../hooks/useInput';
import { addPostAction } from '../../server/api/post';

const PostForm = () => {
  const me = useRecoilValue(userMe);
  const setMainPosts = useSetRecoilState(currentMainPosts);
  const imageInput = useRef();

  const [text, onChangeText, setText] = useInput('');
  const onSubmit = useCallback(async () => {
    const newPost = {
      id: shortID.generate(),
      content: text,
      user: {
        id: me.id,
        email: me.email,
        nickname: me.nickname,
      },
    };

    const data = await addPostAction(newPost);
    data.content = JSON.parse(data.content);
    setMainPosts(data);

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
        <button type="button" onClick={onClickImageUpload}>
          이미지 업로드
        </button>
        <button type="button" onClick={onSubmit}>
          짹짹
        </button>
      </div>
    </div>
  );
};

export default PostForm;

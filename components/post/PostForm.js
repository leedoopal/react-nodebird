import React, { useState, useCallback, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { getMainPosts } from "../../stores/post";

const PostForm = () => {
  const setMainPosts = useSetRecoilState(getMainPosts);
  const imageInput = useRef();

  const [text, setText] = useState('');
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, [text]);
  const onSubmit = useCallback(() => {
    const newPost = {
      id: 2,
      text,
    }
    setMainPosts(newPost);
    setText('');
  }, []);
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current])

  return (
    <div>
      <input type="text" onChange={onChangeText} placeholder="어떤 일이 있었나요?" value={text} />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <button onClick={onClickImageUpload}>이미지 업로드</button>
        <button onClick={onSubmit}>짹짹</button>
      </div>
    </div>
  )
}

export default PostForm;
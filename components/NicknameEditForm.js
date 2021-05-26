import React, { useState, useMemo } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { profileState } from '../stores/profile';

const NicknameEditForm = () => {
  const [nickname, setNickname] = useState('');
  const currentNinkname = useRecoilValue(profileState);
  const updateNickname = useSetRecoilState(profileState);

  const style = useMemo(() => ({
    marginBottom: '20px',
    border: '1px solid #d9d9d9',
    padding: '20px',
  }), []);

  function changeNickname(e) {
    setNickname(e.currentTarget.value);
  }

  function saveNickname() {
    updateNickname(nickname);
    setNickname('');
  }

  return (
    <div style={style}>
      {currentNinkname && (
      <p>
        현재 닉네임:
        {currentNinkname}
      </p>
      )}
      <input
        type="text"
        placeholder="닉네임"
        onChange={changeNickname}
        value={nickname}
      />
      <button onClick={saveNickname}>수정</button>
    </div>
  );
};

export default NicknameEditForm;

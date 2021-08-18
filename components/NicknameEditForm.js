import React, { useState, useMemo, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { userMe } from '../stores/user';
import { updateUserNicknameAction } from '../server/api/user';

const NicknameEditForm = () => {
  const [nickname, setNickname] = useState('');
  const [me, setUserMe] = useRecoilState(userMe);

  const style = useMemo(
    () => ({
      marginBottom: '20px',
      border: '1px solid #d9d9d9',
      padding: '20px',
    }),
    [],
  );

  function changeNickname(e) {
    setNickname(e.currentTarget.value);
  }

  const onSubmit = useCallback(async () => {
    await updateUserNicknameAction({ nickname });

    const updateUserMe = { ...me, nickname };
    setUserMe(updateUserMe);
    setNickname('');
  }, [nickname]);

  return (
    <div style={style}>
      <input
        type="text"
        placeholder="닉네임"
        onChange={changeNickname}
        value={nickname}
      />
      <button type="button" onClick={onSubmit}>
        수정
      </button>
    </div>
  );
};

export default NicknameEditForm;

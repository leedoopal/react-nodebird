import { useState, useCallback } from 'react';

const UseInput = (initialValue = null) => {
  const [value, setValue] = useState(initialValue);

  // component에 props로 넘기는 함수는 useCallback을 사용하자
  const handler = useCallback((e) => {
    if (e) setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};

export default UseInput;

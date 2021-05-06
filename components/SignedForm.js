import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { Form, Input, Button } from 'antd';

const SignedForm = () => {
  const [id, setID] = useState("");
  const [password, setPassword] = useState("");

  // component에 props로 넘기는 함수는 useCallback을 사용하자
  const onChangeID = useCallback((e) => {
    setID(e.target.value)
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value)
  }, []);

  return (
    <Form>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeID} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input name="user-password" type="password" value={password}
               onChange={onChangePassword}
               required />
      </div>
      <div>
        <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
        <Link href="signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </div>
    </Form>
  )
}

export default SignedForm;
import React, { useCallback } from "react";
import Link from "next/link";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { Form, Input, Button } from "antd";
import styled from "styled-components";

import useInput from "../hooks/useInput";
import { userIsSignedIn, userMe } from "../stores/user";
import { userSignInAction } from "../server/api/user";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;
const FormWrapper = styled(Form)`
  padding: 10px;
`;

const SignedForm = () => {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const setIsSignedIn = useSetRecoilState(userIsSignedIn);
  const isSignedIn = useRecoilValue(userIsSignedIn);
  const setUserMe = useSetRecoilState(userMe);

  const onSubmitForm = useCallback(async () => {
    setIsSignedIn(true);
    // const data = await userSignInAction({ email, password });
    setUserMe({
      email: "cindy",
      nickname: "cindy",
      posts: [{ id: 0 }, { id: 1 }, { id: 2 }],
    });
  }, [email, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">이메일</label>
        <br />
        <Input name="user-id" value={email} onChange={onChangeEmail} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={isSignedIn}>
          로그인
        </Button>
        <Link href="signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default SignedForm;

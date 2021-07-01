import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import PropTypes from 'prop-types';

import { Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import signUpApi from './api/user';

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const [terms, setTerms] = useState('');
  const [termsError, setTermsError] = useState('');
  const onChangeTerms = useCallback((e) => {
    setTerms(e.target.checked);
    setTermsError(false);
  }, []);

  const onSubmit = useCallback(async () => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!terms) {
      return setTermsError(true);
    }
    const data = await signUpApi({ email, nickname, password });
    console.log(data);
    return data && Router.push('/');
  }, [password, passwordCheck, terms]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | Cidny NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input
            name="user-email"
            value={email}
            required
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input
            name="user-nickname"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            name="user-password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호 확인</label>
          <br />
          <Input
            name="user-password-check"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={terms} onChange={onChangeTerms}>
            어쩌구 저쩌구 동의합니다
          </Checkbox>
          {termsError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
        </div>
        <div>
          <Button type="primary" htmlType="submit">
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

/* Signup.propTypes = {
  setIsSignedIn: PropTypes.func.isRequired,
}; */

export default Signup;

import React from 'react';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';

import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';

import UserProfile from './UserProfile';
import SignedForm from './SignedForm';
import { userMe } from '../stores/user';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const me = useRecoilValue(userMe);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="index">
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="search">
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me?.id ? <UserProfile /> : <SignedForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="http://github.ebaykorea.com/seongwoo"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made by seongwoo
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  // react의 node type (화면에 그릴 수 있는 모든 것들이 node)
  children: PropTypes.node.isRequired,
};

export default AppLayout;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';

import UserProfile from "./UserProfile";
import SignedForm from "./SignedForm";

const SearchInput = styled(Input.Search)`
  vertical-align: middle
`;

const AppLayout = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isSignedIn ? <UserProfile setIsSignedIn={setIsSignedIn} /> :
            <SignedForm setIsSignedIn={setIsSignedIn} />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="http://github.ebaykorea.com/seongwoo" target="_blank"
             rel="noreferrer noopener">
            Made by seongwoo
          </a>
        </Col>
      </Row>
    </div>
  )
}

AppLayout.propTypes = {
  // react의 node type (화면에 그릴 수 있는 모든 것들이 node)
  children: PropTypes.node.isRequired
}

export default AppLayout;
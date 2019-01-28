import React from 'react';
import styled from 'styled-components';
import { Header as Heading } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Div = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: flex-start;
`;

const HeaderLink = styled(Link)`
  color: #fefefe;

  &:hover {
    color: #fefefe;
    text-decoration: underline;
  }
`;

const Header = () => (
  <Div>
    <Heading floated="left" as="h2">
      <HeaderLink to="/">Social Media Dashboard</HeaderLink>
    </Heading>
  </Div>
);

export default Header;

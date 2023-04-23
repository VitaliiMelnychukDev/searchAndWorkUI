import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MenuItemWrapper = styled(Link)`
  text-decoration: none;
  color: black;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;
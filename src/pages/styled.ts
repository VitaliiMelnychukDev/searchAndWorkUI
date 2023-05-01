import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

export const NoDecorationLink = styled(Link)`
  text-decoration: none;
  margin-left: 20px;
`;

export const NoDecorationBlackLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export const PointerDeleteIcon = styled(DeleteIcon)`
  cursor: pointer;
`;

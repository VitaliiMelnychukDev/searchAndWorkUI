import styled from 'styled-components';
import { Button } from '@mui/material';

export const PanelContainer = styled.div`
  background-color: rgba(240, 239, 253, 0.6);
  border-radius: 30px;
  padding: 40px;
  margin: 20px 0;
`;

export const PanelDetailsContainer = styled.div`
  margin: 20px 0;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 50% 50%;
`;

export const PanelDetailItem = styled.div`
  display: flex;
`;

export const IconWrapper = styled.div`
`

export const DetailsText = styled.div`
  margin-left: 10px;
  font-size: 16px;
`
export const DescriptionBlock = styled.div`
  margin-top: 30px;
`;

export const DescriptionText = styled.div`
  margin-top: 7px;
  font-size: 16px;
`

export const BlockButton = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

export const BlocksIndent = styled.span`
  width: 70px;
`;

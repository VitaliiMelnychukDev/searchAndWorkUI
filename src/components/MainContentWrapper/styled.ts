import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

export const Content = styled.div<{ width?: number }>`
  width: ${({width}) => `${width || 1000}px`};
`;
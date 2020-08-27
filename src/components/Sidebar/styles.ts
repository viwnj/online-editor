import styled from 'styled-components';
import { palette } from 'styled-tools';
export const Container = styled.div`
  width: 400px;
  height: 100%;
  background: ${palette('background')};
  border-right: 1px solid ${palette('accent')};
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${palette('foreground')};
  background: ${palette('accent')};
  height: 25px;
  width: 100%;
  text-transform: uppercase;
  padding: 0 10px;
`;

export const FilesCollapsible = styled.div`
  display: flex;
  flex-direction: column;
`;

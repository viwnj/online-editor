import styled, { css } from 'styled-components';
import { palette, ifProp } from 'styled-tools';

interface IContainer {
  open?: boolean;
}
export const Container = styled.div.attrs((props: IContainer) => ({
  open: props.open,
}))`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  padding: 3px 10px;
  color: ${palette('foreground')};
  background: transparent;
  border: 0;
  font-size: 16px;

  .chevron-icon {
    ${ifProp(
      { open: true },
      css`
        transform: rotate(90deg);
      `
    )}
  }
`;

export const DirectoryHeader = styled.div.attrs((props: IContainer) => ({
  open: props.open,
}))`
  width: 100%;
  display: flex;
  p {
    user-select: none;
  }
  svg {
    margin-right: 5px;
  }
`;

export const ChildrenContainer = styled.div.attrs((props: IContainer) => ({
  open: props.open,
}))`
  width: 100%;
  padding-left: 10px;
  overflow: hidden;
  height: 0;
  ${ifProp(
    'open',
    css`
      height: auto;
    `
  )}
`;

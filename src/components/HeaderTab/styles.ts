import styled, { css } from 'styled-components';
import { palette, ifProp, prop, withProp } from 'styled-tools';
import { darken } from 'polished';
import { MdClose } from 'react-icons/md';

interface ContainerProps {
  isActive: boolean;
}

export const Container = styled.button.attrs((props: ContainerProps) => ({
  isActive: props.isActive,
}))`
  display: flex;
  height: 100%;
  max-width: 235px;
  background: ${palette('background')};
  align-items: center;
  border: 0;
  color: ${palette('foreground')};
  padding: 0 10px;
  border-top: 1px solid #ec559a;

  ${ifProp(
    { isActive: false },
    css`
      border: 0;
      background: ${withProp(prop('theme.palette.background'), darken(0.05))};
    `
  )}

  svg {
    margin-right: 5px;
  }
`;

interface CloseButtonProps {
  unsaved: boolean;
}

export const CloseButton = styled(MdClose).attrs((props: CloseButtonProps) => ({
  unsaved: props.unsaved,
}))`
  margin-left: 10px;
  width: 15px;
  height: 15px;
  border-radius: 50%;

  margin-right: 0;
  cursor: pointer;
  ${ifProp(
    'unsaved',
    css`
      width: 12px;
      height: 12px;
      background: white;

      &:hover {
        background: transparent;
      }
    `
  )}
`;

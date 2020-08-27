import styled, { css } from 'styled-components';
import { palette, ifProp } from 'styled-tools';

interface ContainerProps {
  unsaved: boolean;
  selected: boolean;
}
export const Container = styled.div.attrs((props: ContainerProps) => ({
  unsaved: props.unsaved,
  selected: props.selected,
}))`
  display: flex;
  align-items: center;
  color: ${palette('foreground')};

  ${ifProp(
    'unsaved',
    css`
      color: ${palette('contentModified')};
    `
  )}

  ${ifProp(
    'selected',
    css`
      background: rgba(255, 255, 255, 0.2);
    `
  )}
  
  padding: 5px 10px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  p {
    user-select: none;
  }

  svg {
    margin-right: 10px;
  }
`;

export const Row = styled.div`
  margin-left: 15px;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

export const StatusCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${palette('contentModified')};
  margin-left: 5px;
`;

export const ActionsContainer = styled.div`
  display: flex;
  margin-left: auto;
  svg {
    transition: color 0.5s;
    color: rgba(255, 255, 255, 0.5);
    &:hover {
      color: rgba(255, 255, 255, 1);
    }
  }
`;

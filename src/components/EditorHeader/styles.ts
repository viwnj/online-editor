import styled from 'styled-components';
import { palette, prop, withProp } from 'styled-tools';
import { lighten, darken } from 'polished';

export const Container = styled.header`
  display: flex;
  width: 100%;
  max-width: calc(100vw - 350px);
  height: 35px;
  overflow-x: auto;
  background: ${withProp(prop('theme.palette.accent'), darken(0.15))};

  /* width */
  ::-webkit-scrollbar {
    height: 5px;
    position: absolute;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${palette('background')};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${withProp(prop('theme.palette.accent'), lighten(0.1))};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${withProp(prop('theme.palette.accent'), lighten(0.1))};
  }
`;

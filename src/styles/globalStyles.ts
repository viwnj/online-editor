import { createGlobalStyle } from 'styled-components';
import { palette } from 'styled-tools';

const GlobalStyle = createGlobalStyle`
  html, body{
    padding: 0;
    margin: 0;
    height: 100%;
    background: ${palette('background')};
    font-family: Consolas, 'Courier New', Courier, monospace;
    overflow-x: hidden;
  }
  #root {
    display: flex;
    flex: 1;
    height: 100%;
  }

  * {
    box-sizing: border-box;
    outline: none;
    padding: 0;
    margin: 0;
  }
`;

export default GlobalStyle;

import { createGlobalStyle } from 'styled-components';

/* color palette */
// $color1: #fb6376ff;
// $color2: #7be0adff;
// $color3: #fffff3ff;
// $color4: #2ab7caff;
// $color5: #fed766ff;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
    font-family: 'Open Sans';
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 
  }
  html, body, #___gatsby, div[tabindex]{
    background-color: ${props => props.dark ? '#2ab7caff' : '#FFFFF3'};
    color: #333;
    height: 100%;
  }
`;

export default GlobalStyle;
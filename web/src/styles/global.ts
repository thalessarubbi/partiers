import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --color-primary: #F883BA;
    --color-secundary: #F883BA;
    --color-background: linear-gradient(167.9deg, #FC66A4 0%, #993CFF 98.7%);
    --color-background-overlay: linear-gradient( 167.9deg,
      rgba(252, 102, 164, 0.8), rgb(153, 60, 255, 0.8));
    --color-text-in-primary: #000;
    --color-text-in-secundary: #9D9B9B;
    --color-text-title: #FFF;
    --color-text-label: #565656;
    --color-box-base: #FFF;
    --color-box-secundary: #C4C4C4;
    --color-line-diver: #CCC;
    --color-input-border: #CCC;

    font-size: 60%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html, body, #root {
    height: 100vh;
    width: 100vw;
  }

  body {
    background: var(--color-background);
    color: var(--color-text-in-primary);
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    font-family: 'Quicksand', serif;
    font-size: 1.25rem;
  }

  button {
    cursor: pointer;
  }

  @media (min-width: 700px) {
    :root {
      font-size: 62.5%;
    }
  }
`;

import { css, createGlobalStyle } from "styled-components"

export const size = {
  small: 360,
  medium: 480,
  mediumL: 768,
  large: 1024,
  largeL: 1280,
  huge: 1360,
  hugeS: 1366,
  hugeM: 1440,
  hugeL: 1600,

}

export const above = Object.keys(size).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${size[label]}px) {
      ${css(...args)}
    }
  `
  return acc
}, {})

export const under = Object.keys(size).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${size[label]}px) {
      ${css(...args)}
    }
  `
  return acc
}, {})

// Estilos globales
// atribute main
// body > ___gatsby > components__Content > main
export const GlobalStyles = createGlobalStyle`
  button:focus {
    outline: 0px dotted;
    outline: 0px auto -webkit-focus-ring-color !importan;
  }
  .___gatsby{
    position: absolute;
  }
  main{
    // padding-top: 3.5rem;
  }
  ${above.medium`
   main{
      // padding-top: calc(3.5rem - 100vh);
    }
    `}
  ${above.large`
   main{
      // padding-top: calc(4.5rem - 100vh);
    }
  `}
`

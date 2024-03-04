import { createGlobalStyle } from 'styled-components'

interface DarkModeProps {
  isDarkMode: Boolean;
}

export const GlobalStyle = createGlobalStyle<DarkModeProps>`

:root {
    --background: #fff;
    --backgroundsilver:#f0f2f5;
    --backgroundDarkMode:#1e1f20;
    --backgroundDarkMode2:#29292b;
    --backgroundInputDarkMode: #3a3a3a;
    --iconDarkMode:#5429CC;//#34cc96;
    --AppBar: #5429CC;
    --Green: #33CC95;
    --Blue: #437fff;
    --Red: #ff0000;
    --Gold : gold;
    --Orange: #f1b445;
    --Pink:#e96090
}



html {
  @media (max-width:1080px){
    font-size:93.75%;
  }
  @media (max-width: 720px) {
    font-size:87.5%;
  }
}

button{
  cursor:pointer;
}

[disabled]{
  opacity:0.6;
  cursor:not-allowed;
}

body {
    overflow: auto !important;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)!important' : '#fff')}; 
    
  }

footer{
  background-color: ${props => (props.isDarkMode ? 'var(--backgroundDarkMode2)!important' : 'var(--background)!important;')}; 

}
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  `
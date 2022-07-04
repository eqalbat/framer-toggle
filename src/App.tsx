import styled, { createGlobalStyle } from "styled-components";
import Toggle from "./Toggle";
import { ThemeProvider } from "./themeProvider";

function App() {
  return (
    <ThemeProvider>
      <S.Global />
      <S.Main>
        <Toggle />
      </S.Main>
    </ThemeProvider>
  );
}

export default App;

const S: any = {};
S.Global = createGlobalStyle`
  html, body {
    background-color: ${({ theme }) => theme.colors.bgColor};
    padding: 0;
    margin: 0;
    transition: background-color 0.3s;
  }
`;
S.Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-content: center;
`;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./utils/Theme";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import SignIn from "./pages/SignIn";
import { useState } from "react";
import Video from "./pages/Video";
import Home from "./pages/Home";
import Search from "./pages/Search";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App() {

  const [darkMode, setDarkMode] = useState(true);
  // const { currentUser } = useSelector((state) => state.user);

  return (
    <ThemeProvider    
      theme={darkMode ? darkTheme : lightTheme}  // check utils for more info
    >
      <Container>
        <BrowserRouter>
          {/* menu */}
          <Menu 
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          {/* main */}
          <Main>
            <Navbar />
            <Wrapper>
                <Routes>
                  <Route path="/">
                    <Route index element={<Home type="random" />} />     {/* just to remind you, this is get method in your backend */}
                    <Route path="trends" element={<Home type="trend" />} />   {/* random, trend, sub */}
                    <Route path="subscriptions" element={<Home type="sub" />} />
                    <Route path="search" element={<Search />} />
                    <Route
                      path="signin"
                      element={<SignIn />}
                      // element={currentUser ? <Home /> : <SignIn />}
                    />
                    <Route path="video">
                      <Route path=":id" element={<Video />} />
                    </Route>
                  </Route>
                </Routes>
              </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;

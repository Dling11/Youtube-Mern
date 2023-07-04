import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
// import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
// import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import styled from "styled-components";     // also just a tip there is a extension that can do prediction in your css || styled-components
import myLogo from "../img/logo.png"
import { useSelector } from "react-redux";

// container logo | img
const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};      // this is a method in styled-component check => utils for info's
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 12px;
  position: sticky;
  top: 0;
  border-right: 0.2px solid #75757539;      // remove this if ugly
`
const Wrapper = styled.div`
  padding: 15px 15px;
  /* padding: 18px, 26px, 0, 26px; */
  gap: 2px;
`
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  font-weight: bold;
  margin-bottom: 10px;
`
const Img = styled.img`
  height: 25px;
`
// Menu's | buttons | Icons
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 19px;
  cursor: pointer;
  padding: 6.6px 0px;  // old - 7.5px
  transition: all .2s;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
    border-radius: 2px;
  }
`
const Hr = styled.hr`
  margin: 12px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`
// Login
const Login = styled.div`

`
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #e88b27;
  color: #e88b27;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`

const Title = styled.h2`
  font-size: 12px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 10px;
`;

const Menu = ({ darkMode, setDarkMode }) => {

  const { currentUser } = useSelector(state => state.user);  // check for a user || if there is return info of the user
  // const currentUser = useSelector(state => state.user.currentUser); take note that if we don't destructure > { currentUser } make sure to say "state.user.currentUser"
                      // redux useSelector() is very easy if you have Redux Dev tools
  return (
    <Container>
      <Wrapper>
      {/* Main logo */}
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={myLogo} />
            of Dling
          </Logo>
        </Link>
      {/* Menus || icon */}
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
              <HomeIcon /> Home
          </Item>
        </Link>
      {/* Return a trend video from backend */}
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreOutlinedIcon 
              style={{fontSize: "20px"}}
            /> Explore
          </Item>
        </Link>
      {/* Return a sub video from backend */}
        <Link to="subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <SubscriptionsOutlinedIcon style={{fontSize: "20px"}}  /> Subscriptions
          </Item>
        </Link>
        <Hr />
        <Item>
          <VideoLibraryOutlinedIcon style={{fontSize: "20px"}} /> Library
        </Item>
        <Item>
          <HistoryOutlinedIcon style={{fontSize: "20px"}} /> History
        </Item>
        <Hr />
        {/* login */}
        {!currentUser &&                  // if there is no currentUser don't show this
          <>
            <Login>
              Sign in to like videos, comment, and subcribe.
              <Link
                to="signin"
                // style={{}}
              >
                <Button>
                  <AccountCircleOutlinedIcon style={{fontSize: "20px"}} /> Sign In
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        }
        <Title>BEST OF ALL TIME</Title>
        <Item>
          <LibraryMusicOutlinedIcon style={{fontSize: "20px"}} /> Music
        </Item>
        <Item>
          <SportsBasketballOutlinedIcon style={{fontSize: "20px"}} /> Sports
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon style={{fontSize: "20px"}} /> Gaming
        </Item>
        {/* <Item>
          <MovieOutlinedIcon style={{fontSize: "20px"}} /> Movies
        </Item>
        <Item>
          <ArticleOutlinedIcon style={{fontSize: "20px"}} /> News
        </Item> */}
        <Item>
          <LiveTvOutlinedIcon style={{fontSize: "20px"}} /> Live
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon style={{fontSize: "20px"}} /> Settings
        </Item>
        <Item>
          <FlagOutlinedIcon style={{fontSize: "20px"}} /> Report
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon style={{fontSize: "20px"}} /> Help
        </Item>
        <Item
          onClick={() => setDarkMode(!darkMode)}
        >
        <SettingsBrightnessOutlinedIcon style={{fontSize: "20px"}} /> 
        {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  )
}

export default Menu
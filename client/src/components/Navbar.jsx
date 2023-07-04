import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Upload from "./Upload";

// container & wrapper
const Container = styled.div`
  position: sticky;           // should be sticky
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  z-index: 2;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
  /* width: 100%; */
`;
// search & input & button
const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;
const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  width: 90%;

`;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #e88b27;
  color: #e88b27;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;


const Navbar = () => {

  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);  // check for a user || if there is return info of the user
  // const currentUser = useSelector(state => state.user.currentUser); take note that if we don't destructure > { currentUser } make sure to say "state.user.currentUser"
                      // redux useSelector() is very easy if you have Redux Dev tools
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  return (
    <>
      <Container>

        <Wrapper>
          {/* Search Method */}
          <Search>
            <Input 
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon 
              onClick={()=>navigate(`/search?q=${q}`)} // incase you forgot "req.params.q" is at the backend, return 40 limit
            />
          </Search>
          {currentUser ? (
            <User>
              {/* Upload Video */}
              <VideoCallOutlinedIcon
                onClick={() => setOpen(!open)}
                style={{cursor: "pointer"}}
              />
              <Avatar 
                src={currentUser.img}
              />
              {currentUser.name}
            </User>
          ) : <Link
            to="signin"
          >
            <Button>
            <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Link>}
        </Wrapper>

      </Container>
      {open && 
        <Upload 
          setOpen={setOpen}
          open={open}
        />
      }
    </>
  )
}

export default Navbar
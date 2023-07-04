import { useState } from 'react';
import styled from 'styled-components';
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { auth, provider } from "../firebase";
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// Container || wrapper
const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px); // if you are wondering why do some calc cause I am a nerd.. joke navbar heigth 56px
  color: ${({ theme }) => theme.text};
`
const Wrapper = styled.div`
  display: flex;
  width: 35%;
  min-width: 350px;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
  box-shadow: 1px 1px 10px 1px rgba(80, 80, 80, 0.204);
`
// Tittle | Buttons | Inputs
const Title = styled.h1`
  font-size: 20px;
`;
const SubTitle = styled.h2`
  font-size: 18px;
  font-weight: 300;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
  outline: none;
  
  &:active {
    background-color: ${({ theme }) => theme.Soft};
  }
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};

  &:hover {
    animation: pulse 1s infinite;     // COOL interface :)
    transition: .3s;
  }

  @keyframes pulse {
  0% {
    transform: scale(1);
  }
  70% {
    transform: scale(.9);
  }
    100% {
    transform: scale(1);
  }
}
`;
const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
  cursor: pointer;
`;
const Links = styled.div`
  margin-left: 50px;
  cursor: pointer;
`;
const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // login fecth
  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch(loginStart()); // as you will observe, redux > userSlice loginStart() is invoke, means loading = true, also there is no payload

    try {
      const res = await axios.post("/auth/signin", { name, password } )
      dispatch(loginSuccess(res.data))  // as you will observe here loginSuccess() is invoke | bcause it has a action.payload we need to //===
    } catch (err) {                                     //==> pass it our res.data at there | so that we can make our user store in our state
      dispatch(loginFailure());       // you can also return your "err" as a payload if you want
      navigate("/")
    }
  }     // also go to "Navbar.jsx" and see the currentUser => useSelector is very neat

  const signInWithGoogle = async () => {  // check firebase docu. it has everything on it
    signInWithPopup(auth, provider)
    .then((result) => {  // try consoling result if you want to know || return an info about google accounts
      axios
        .post("/auth/google", {           // check google at backend for details
          name: result.user.displayName,
          email: result.user.email,
          img: result.user.photoURL,
        })
        .then((res) => {
          console.log(res)
          dispatch(loginSuccess(res.data));   // then we use dispatch()
          navigate("/");
        });
    })
    .catch((error) => {
      dispatch(loginFailure());
    });
  }

  return (
    <Container>

      <Wrapper>
        <Title> Sign in </Title>
        <SubTitle> Login to be Hacked...! </SubTitle>
        <Input                                        // username
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input                                        // password
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}> Sign In </Button>

        {/* Google signin || using firebase */}
        <Title> or </Title>
        <Button
          onClick={signInWithGoogle}
        >Sign in with Google instead</Button>

        {/* Sign Up */}
        <Title> Don't have a Account ?</Title>
        <Input                                      // username | signup
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input                                      // password | | signup
          type="password"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button 
        onClick={handleLogin}> Sign Up </Button>
      </Wrapper>
      {/* More Links */}
      <More>
        English(BISAYA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>

    </Container>
  )
}

export default SignIn
import styled from 'styled-components';
// import bartIcon from "../img/Bart1.png";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
// import one from "../img/1.jpg";
import { format } from "timeago.js"; // take note that this is a new version
// import timeago from 'timeago.js';

// container 
const Container = styled.div`
  /* width: ${(props) => props.type !== "sm" && "360px"}; */
  width: ${(props) => props.type === "sm" ? "400px" : "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")}; // don't be compuse if used at the "home" because as u remembr /==>
  cursor: pointer;           //==> There is no "type" then used 45px, while at the "/video" > "recommendation" type is declared then used "10px"
  display: ${(props) => props.type === "sm" && "flex"}; //basically emphasizing that if "sm" then small
  gap: 10px;
`                         // ===> or if you dislike this kind of method you can always create a component in render another one lel
const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  /* margin-top: 16px; */
  gap: 12px;
  flex-basis: 50%;
`;
// img | desc | name
const Image = styled.img`
  width: 100%;
  height: ${(props) => props.type === "sm" ? "130px" : "202px"}; //202
  background-color: #6d6d6dbc;
  flex-basis: 50%;
  /* flex: 1; */
`
const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"}; // I just realized that, this will be ignore if doesn't meet props => "&&"
`;
const Texts = styled.div`
  flex-basis: 100%;
`;
const Title = styled.h1`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;
const Info = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => { //video is from Home.jsx
  
  // const timeagoInstance = timeago();
  const [userChannel, setUserChannel] = useState({}); // we are using object instead of array because, in backend it return a object

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video.userId}`);   // take note that in video, it has the userId, so we can use it
      setUserChannel(res.data);
    }
    fetchChannel();
  },[video.userId])   // run this only if we use vide.userId

  return (
    <Link 
      to={`/video/${video._id}`}
    >
      <Container
        type={type}   // In styled component we can pass props, and use it as a logic | control the functionality of your app
      >
        <Image 
          type={type}
          src={video.imgUrl}
        />
        <Details
          type={type}
        >
          <ChannelImage 
            type={type}
            src={userChannel.img}
          />
            <Texts>
              <Title> {video.title} </Title>
              <ChannelName> {userChannel.name} </ChannelName>    
              {/* <Info>{video.views} views • {timeagoInstance.format(video.createdAt)}</Info>  */}
              <Info>{video.views} views • {format(video.createdAt)}</Info> 
            </Texts>             {/* New cool info, timeago.js => converted createdAt to a specfic time - so cool !!! | ex. 9 hours ago */}
        </Details>     {/* I just realized time ago is working but annoying in terminal, large quantity of warning will show*/}
      </Container>                   {/* also i install old version 3.0.2 | but read the version 3.0.2 it's not disame with the latest*/}
    </Link>
  )
}

export default Card
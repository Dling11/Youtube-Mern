import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useDispatch, useSelector } from "react-redux";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { subscription } from "../redux/userSlice";
import { useLocation } from "react-router-dom";
import Comments from "../components/Comments";
import { useEffect, useState } from "react";
import iconLogo from "../img/Bart1.png";
import styled from "styled-components";
import Card from "../components/Card";
import { format } from "timeago.js";
import axios from "axios";
import Recommendation from "../components/Recommendation";

// container
const Container = styled.div`
  display: flex;
  gap: 24px;
`
// Video Side || Left side
const Content = styled.div`
  flex: 5;
`
const VideoWrapper = styled.div`

`
const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
// Bottom Area | channel area | subcribe
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
const Subscribe = styled.button`
  background-color: #da8428;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  transition: all .4s;
  
  &:hover {
    background-color: #ba6c1a;
  }
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 500;
`;
const ChannelCounter = styled.span`
  margin: 5px 0px 20px 0px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;
const Description = styled.p`
  font-size: 13px;
`;
const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
  z-index: 1;
`;

const Video = () => {

  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  // const [video, setVideo] = useState({}); // always remember that we can do this, but using redux is better | instead of realoading always ur UI
  const [channel, setChannel] = useState({});
  // const [dataFetch, setDatafetch] = useState({});

  // console.log(currentVideo)
  console.log(currentUser)
  // console.log(`The video: ${currentVideo?.title}`);

  useEffect(() => {
    const fecthData = async () => {
      try {
        //fetch data
        const videoRes = await axios.get(`/videos/find/${path}`);  // incase you forgot path is splitted with only videoId => check Card.jsx
        const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`);
        
        // setDatafetch(videoRes.data)
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));    // using redux | so that we can implement direct update on the UI
      } catch (err) {}      // I am having trouble in this currentVideo, that return's undefined | fix this someday
    }                // even you use question mark, I still can't reload it on the state === okay update i figure it out
    fecthData();                          // should be || {currentVideo?.title}
  }, [path, dispatch])

  // handle like
  const handleLike = async () => {
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));      // take note that this must have a payload or the "currentUser._id"
  };

  // handle dislike
  const handleDislike = async () => {
    await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  // handle Subcribe
  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id)   // basically disame with the redux check userSlice()
      ? await axios.put(`/users/unsub/${channel._id}`)
      : await axios.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

    //TODO: DELETE VIDEO FUNCTIONALITY

  return (
    <Container>
      {/* Video Content || currentVideo */}
      <Content>
        {/* <VideoWrapper>
        <iframe 
          width="100%" 
          height="456" 
          src="https://www.youtube.com/embed/DHjqpvDnNGE" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; 
          autoplay; 
          clipboard-write; 
          encrypted-media; 
          gyroscope; 
          picture-in-picture; 
          web-share" 
          allowfullscreen></iframe>
        </VideoWrapper> */}
          <VideoWrapper>
            <VideoFrame 
              src={currentVideo?.videoUrl} 
              controls 
            />
        </VideoWrapper>
        <Title> {currentVideo?.title}  </Title>
        {/* <Title> {dataFetch?.title} </Title> */}
        <Details>
          {/* <Info> 
            { currentVideo?.view} • 
            { format(currentVideo?.createdAt) || format(dataFetch?.createdAt) }
          </Info> */}
          <Info> {currentVideo?.views} views • {format(currentVideo?.createdAt)}</Info>
          {/* icons */}
          <Buttons>

            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              {/* {dataFetch.likes?.length} */}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>

          </Buttons>
        </Details>
        <Hr />
        {/* Channel area || sub button */}
        <Channel>
          <ChannelInfo>
            <Image src={channel.img}/>
            <ChannelDetail>
              <ChannelName> {channel.name} </ChannelName>
              <ChannelCounter> {channel.subscribers} subcribers </ChannelCounter>
              <Description> 
                {currentVideo?.desc}
                {/* {dataFetch?.desc} */}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          {/* Subscribe button */}
          <Subscribe onClick={handleSub}>
            {currentUser?.subscribedUsers?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        {/* Comment Section */}
        <Comments 
          videoId={currentVideo?._id} 
        />
      </Content>

      {/* Right side video bars */}
      <Recommendation 
        tags={currentVideo?.tags} 
      />

    </Container>
  )
}

export default Video
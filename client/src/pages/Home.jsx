import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await axios.get(`/videos/${type}`);   // check app.js return | random | trend | sub
      setVideos(res.data);
    }
    fetchVideo();
  },[type])

  return (
    <Container>
      {
        videos.map(video => (
          <Card 
            key={video._id}
            video={video}
          />
        ))
      }
    </Container>
  )
}

export default Home
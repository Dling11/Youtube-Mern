import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

// Container || wrapper || this container wrap ALL SCREEN
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;
const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
// Upload Info || inputs || textarea
const Title = styled.h1`
  text-align: center;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  resize: none;
`;
const Button = styled.button`
  background-color: #da8428;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  transition: all .4s;
  width: 60%;
  margin: 0 auto;
  transition: .2s ease-in-out all;

  &:hover {
    background-color: #ba6c1a;
    transform: scale(1.1);
  }
`;
// const Button = styled.button`
//   border-radius: 3px;
//   border: none;
//   padding: 10px 20px;
//   font-weight: 500;
//   cursor: pointer;
//   background-color: ${({ theme }) => theme.soft};
//   color: ${({ theme }) => theme.textSoft};
// `;

const Label = styled.label`
  font-size: 14px;
`;

const Upload = ({ setOpen, open }) => {
  
  const [img, setImg] = useState(undefined);  // or null
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);        // uploading showcase
  const [videoPerc, setVideoPerc] = useState(0);   // uploading showcase
  const [inputs, setInputs] = useState({});     // handle all inputs
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  // handleChange of each inputs
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  // handle tags => this is different | because it has it's own useState()
  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  // Firebase || refer to the documentation => https://firebase.google.com/docs/storage/web/upload-files => "Full Example"
  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);    // app is from firebase.js incase you forgot
    const fileName = new Date().getTime() + file.name; // take note that this, is very smart | incase there are duplicate names use Date()
    const storageRef = ref(storage, fileName);    // this is where you download || or this is the storage

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress)); // determined the loading sequence
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:        // don't forget to inplement default, in document there is none || react stuff
            break;
        }
      },
      (error) => {},
      () => {   // lastly sending it to your database | mongoDb
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  // upload video
  useEffect(() => {       // uploadFile is a firebase process
    video && uploadFile(video , "videoUrl");   // take note that it is important to emphasize that if we have a video then, invoke uloadFile()
  }, [video]);

  // upload Image
  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  // handleUpload to the database
  const handleUpload = async (e)=>{
    e.preventDefault();
    const res = await axios.post("/videos", {...inputs, tags});
    setOpen(false);  //===> close the popup if upload it success || also you can create a functionality at here too if u want
    res.status === 201 && navigate(`/video/${res.data._id}`);
  }

  return (
    <Container>
      <Wrapper>
        <Close 
          onClick={() => setOpen(false)}
        >
        <CloseIcon />
        </Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        {videoPerc > 0 ? (    // show this
          "Uploading:" + videoPerc
        ) : (
          <Input
            type="file"
            accept="video/*"            // this concept is that, it only accept only videos not por-- :)
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        {/* input informations */}
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <Desc
          placeholder="Description"
          name="desc"
          rows={8}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Separate the tags with commas."
          onChance={handleTags}
        />
        {/* Thumbnail Image */}
        <Label>Image:</Label>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button 
          onClick={handleUpload}
        >Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;

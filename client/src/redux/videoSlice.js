import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    like: (state, action) => {            // don't be confuse, this basically means that if the user didn't like before then give payload
      if (!state.currentVideo.likes.includes(action.payload)) { // take note that redux toolkit alow us to push | also we cannot mutate the value. tnx to redux toolkit we can
        state.currentVideo.likes.push(action.payload);   // take note that in currentVideo || it has a likes [] created in backend, so we push the payload 
        state.currentVideo.dislikes.splice(       // using splice will remove the dislike 
          state.currentVideo.dislikes.findIndex(
            (userId) => userId === action.payload     // the currentUser._id
          ),
          1                     // then 1 || delete
        );
      }
    },
    dislike: (state, action) => {                                   // just the opposite way
      if (!state.currentVideo.dislikes.includes(action.payload)) {
        state.currentVideo.dislikes.push(action.payload);
        state.currentVideo.likes.splice(
          state.currentVideo.likes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } =
  videoSlice.actions;

export default videoSlice.reducer;

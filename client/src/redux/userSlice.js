import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  loading: false,
  error: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {           //+ if a user click the login button return a state.loading = true
    loginStart: (state) => {    // take note that because it is just a loginStart, we don't need a action || set only the loading to true
      state.loading = true;
    },              // as you will observe loginSuccess it has an action, by means that it has a payload or user that will be store in the //==
    loginSuccess: (state, action) => {                        //==> initial state
      state.loading = false;              // loading return false, to provide loading functionality
      state.currentUser = action.payload;      //+ if we have a user then provide a payload 
    },
    loginFailure: (state) => {          //+ if we have a login failure then provide this state 
      state.loading = false;               // if failure set loading again to false
      state.error = true;       // and set the error to true
    },
    logout: (state) => {        //+ simply means that a user logout return the default "initialState"
      state.currentUser = null;
      state.loading = false;
      state.error = false;
      // also we can do this
      // return initialState    //===> if you want a smaller code, it exactly disame
    },
    subscription: (state, action) => {// take note that in currentUser, it has a => subscribedUsers // that includes the payload of this || or this is use
      if (state.currentUser.subscribedUsers.includes(action.payload)) { 
        state.currentUser.subscribedUsers.splice(       //Then basically remove the user subcription of the subscribedUsers[]
          state.currentUser.subscribedUsers.findIndex(    // because it is inside an array, use findIndex
            (channelId) => channelId === action.payload
          ),
          1           //remove
        );
      } else {
        state.currentUser.subscribedUsers.push(action.payload);   // it is important to push the subscribedUsers || because this return all //==
      }                                                // the subscribedUsers back to it's position
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, subscription } = userSlice.actions

export default userSlice.reducer;
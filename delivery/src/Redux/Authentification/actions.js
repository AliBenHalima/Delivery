// const { LOGIN } = require("./types")
import { LOGIN,LOGOUT,POSTREQUEST,POSTSUCCESS,POSTFAILED,POST_LOGUP_REQUEST,POST_LOGUP_SUCCESS,POST_LOGUP_FAILED, REFRESH_STORE} from "./types";
import { VALUE } from "./types";
import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILED } from "./types";
import axios from 'axios';
import { useHistory } from "react-router-dom";

export const login = () => {
  return {
    type: LOGIN,
    payload: ""
  };
};
export const logout = () => {
  return {
    type: LOGOUT,
    payload: "",
  };
};


// export const actionReducer2 = () => {
//   return {
//     type: VALUE,
//     payload: "this is a 2ND reducer Payload",
//   };
// };

export const FetchRequest = () => {
  return {
    type: FETCH_REQUEST,
  };
};

export const FetchSuccess = (users) => {
  return {
    type: FETCH_SUCCESS,
    payload: users,
  };
};

export const FetchFailed = (error) => {
  return {
    type: FETCH_FAILED,
    payload: error,
  };
};

export const postrequest = () => {
  return {
    type: POSTREQUEST,
  };
};

export const postsuccess = (status) => {
  return {
    type: POSTSUCCESS,
    payload: status,
  };
};

export const postfailed = (status) => {
  return {
    type: POSTFAILED,
    payload: status,
  };
};

export const post_logup_success = (status) => {
  return {
    type: POST_LOGUP_SUCCESS,
    payload: status,
  };
};

export const post_logup_failed = (status) => {
  return {
    type: POST_LOGUP_FAILED,
    payload: status,
  };
};

export const refreshStore = () => {
  return {
    type: REFRESH_STORE,
    payload: "store refreshed"
  };
};



export const FetchUsers = () => {
  return (dispatch) => {
    dispatch(FetchRequest());
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      const users = response.data;
      dispatch(FetchSuccess(response.data.status));
    }).catch(error=>{
        const errorMsg = error.message;
        dispatch(FetchFailed(errorMsg));
    });

  };
};


export const PostLogin =  (Data) => {
  return (dispatch) => {
    axios.post("http://localhost:3000/Sign/SignIn",Data).then((response) => {
      const info = response.data
      console.log("infos are ",info);
      if (response.data.status=="POST SUCCEEDED")
      { localStorage.setItem("token",response.data.token);}
       response.data.status=="POST SUCCEEDED" ? 
         dispatch(postsuccess(info)) : dispatch(postfailed(response.data.error))
       
    }).catch(error=>{
        const errorMsg = error.message;
        dispatch(postfailed(errorMsg));
    });

  };
};


export const Postlogup =  (Data) => {
  return (dispatch) => {
    axios.post("http://localhost:3000/Sign/SignUp",Data).then((response) => {
      const info = response.data
      console.log("Logup infos are ",info);
     
       if(response.data.hasOwnProperty("success")) {
         dispatch(post_logup_success(info))
         }else{
           dispatch(post_logup_failed(response.data.error))
         }
    }).catch(error=>{
        const errorMsg = error.message;
        dispatch(post_logup_failed(errorMsg));
    });

  };
};
 
 
// Authentication Actions :


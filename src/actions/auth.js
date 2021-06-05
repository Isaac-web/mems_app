import * as API from '../api/index';
import {AUTH} from '../constants/actionContants';

export const signUpUser = (formData, history) => async dispatch => {
   try {
    const {data, status} = await API.signUpUser(formData);

    dispatch({type: AUTH, data, status});
    history.replace("/");
   }
   catch(err) {
       console.log("Something went wrong...");
   }
}


export const signInUser = (formData, history) => async dispatch => {
   try {
        const {data, status} = await API.signInUser(formData);
        
        // console.log(data);
        dispatch({type: AUTH, data, status});
        history.replace("/");
   }
   catch(err) {
       console.log(err);
   }
}
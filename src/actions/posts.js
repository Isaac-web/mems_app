import * as API from '../api/index';
import {FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionContants';

export const getPosts = () => async dispatch => {
    const {data, status} = await API.getPosts();

    dispatch({type: FETCH_ALL, data, status});
}


export const createPost = (formData) => async dispatch => {
    const {data, status} = await API.createPost(formData);
    dispatch({type: CREATE, data, status});
}

export const deletePost = (id) => async dispatch => {
    const {status} = await API.deletePost(id);

    dispatch({type: DELETE, data: id, status});
}


export const updatePost = (id, postData) => async dispatch => {
    const {data, status} = await API.updatePost(id, postData);

    dispatch({type: UPDATE, data, status});
}


export const likePost = (id, userId) => async dispatch => {
    const {data, status} = await API.likePost(id, {user: userId});

    dispatch({type: UPDATE, data, status});
}
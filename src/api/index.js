import axios from "axios";

const API = axios.create({baseURL: "https://infinite-atoll-92328.herokuapp.com/api/"}); 

API.interceptors.request.use(req => {
    if(JSON.parse(localStorage.getItem("profile"))){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }
    return req;
})


export const getPosts = () => API.get("/posts");
export const createPost = (formData) => API.post("/posts", formData);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const updatePost = (id, postData) => API.patch(`/posts/${id}`, postData);
export const likePost = (id, userId) => API.patch(`/posts/${id}/like`, userId);

export const signUpUser = (formData) => API.post("/user/signup", formData);
export const signInUser = (formData) => API.post("/user/signin", formData);
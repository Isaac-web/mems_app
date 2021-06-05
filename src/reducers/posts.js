import {FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionContants';

const postReducer = (posts = {}, action) => {
    switch(action.type) {
        case FETCH_ALL:
            return ({data: action.data, status: action.status});
            
        case CREATE: 
            return ({data: [action.data, ...posts.data], status: action.status});

        case UPDATE:
            return ({data: posts.data.map(post => post._id === action.data._id ? action.data : post)});
            
        case DELETE: 
            const reservedPosts = posts.data.filter(post => post._id !== action.data);
            return ({data: reservedPosts, status: action.status});
        default: 
            return posts;
    }
}

export default postReducer;
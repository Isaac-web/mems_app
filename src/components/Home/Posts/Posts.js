import React from 'react';
import {useSelector} from 'react-redux';
import {Grid} from '@material-ui/core';

import Post from './Post/Post';


const Posts = ({user, setCurrentPostId, currentPostId, setFormOpen, formData, setFormData}) => {
    const {data: posts} = useSelector(state => state.posts);
    
    return (
        <Grid container spacing={3}>
           {
               posts.map(post => (
                <Post 
                    key={post._id} 
                    id={post._id}
                    author={post.name} 
                    title={post.title} 
                    message={post.message} 
                    tags={post.tags} 
                    image={post.selectedFile}
                    createdAt={post.createdAt}
                    creator={post.creator}
                    likes={post.likes}
                    user={user}
                    currentPostId={currentPostId}
                    setCurrentPostId={setCurrentPostId}
                    setFormOpen={setFormOpen}
                    setFormData={setFormData}
                />
               ))
           }
        </Grid>
    )
}

export default Posts

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CircularProgress, Container, Grid, Grow, Typography, Fab} from "@material-ui/core";
import FeedbackIcon from '@material-ui/icons/Feedback';
import CreateIcon from '@material-ui/icons/Create';
import {useHistory} from "react-router-dom";


import {getPosts} from "../../actions/posts";
import Form from './Form/Form';
import Posts from './Posts/Posts';

import useStyles from './style';

const Home = ({user}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const {data: posts, status} = useSelector(state => state.posts);
    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState({title: "", message: "", tags: "", selectedFile: ""});
    const [currentPostId, setCurrentPostId] = useState(null);


    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    const handleOpenDialog = () => {
        if(JSON.parse(localStorage.getItem("profile"))?.token) {
            setFormOpen(true);
        }
        else {
            history.push("/auth");
        }
    }



    const Loader = (user) => {
        if(status === 200) {
            return <Grid item container direction="column" alignItems="center">
                    <FeedbackIcon style={{fontSize: "8em", color: "rgba(0, 0, 0, 0.1)"}}/>
                    <Typography variant="h3" style={{color: "rgba(0, 0, 0, 0.8)"}}>No posts yet.</Typography>
                    <Typography variant="subtitle1" onClick={handleOpenDialog} color="primary" align="center" style={{cursor: "pointer"}}>Click here to add one.</Typography>
                </Grid>
        }

        return <Grid item>
                <>
                    <CircularProgress size={100} thickness={1}/>
                </>
            </Grid>

    }
    

    const LoadingScreen = () => {
       return <Grid container justify="center" alignItems="center" style={{height: "85vh"}}>
           <Loader/>
       </Grid>
    }


    return (
        <>
            <Container maxWidth="lg">
                {!posts?.length ? 
                <LoadingScreen/> : 
                    <Grow in>
                        <Posts 
                            user={user} 
                            setCurrentPostId={setCurrentPostId} 
                            currentPostId={currentPostId}
                            setFormOpen={setFormOpen}
                            formData={formData} 
                            setFormData={setFormData}
                        />
                    </Grow>
                }
            </Container>
            <Form open={formOpen}
                  onClose={() => setFormOpen(false)} 
                  currentPostId={currentPostId} 
                  setCurrentPostId={setCurrentPostId}
                  formData={formData} 
                  setFormData={setFormData}
            />
          
          {user &&   <Fab className={classes.createButton} onClick={() => setFormOpen(true)}>
                    <CreateIcon/>
            </Fab>}
        </>
    )
}

export default Home

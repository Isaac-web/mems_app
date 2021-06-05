import React, {useState, useEffect} from 'react';
import {Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, 
    Button, Typography, Menu, MenuItem
} from '@material-ui/core';
import {useTheme} from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import useStyles from './style';
import {deletePost, likePost} from '../../../../actions/posts';

const Post = ({
              id, author, title, message, tags, image, 
              creator, user, createdAt, setCurrentPostId, 
              currentPostId, setFormOpen, setFormData, likes
            }) => {

    const theme = useTheme();
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();


    const [openPostMenu, setOpenPostMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const timeCreated = moment(createdAt).fromNow();
    const formatedCreatedAt = timeCreated.replace(timeCreated.charAt(0), timeCreated.charAt(0).toUpperCase());
    const googleId = user?.profile?.googleId;
    const userId = user?.profile?._id;

    const currentPost = useSelector(state => state.posts.data).find(post => post._id === currentPostId);
    
    const isLiked = likes.indexOf(userId) > -1 || likes.indexOf(googleId) > -1;
    const handleOpenMenu = ({currentTarget: icon}) => {
        setAnchorEl(icon);
        setOpenPostMenu(true);
    }

    const handleDelete = (id) => {
        dispatch(deletePost(id));
        setOpenPostMenu(false)
    }


    const handleUpdate = () => {
        setCurrentPostId(id);
        setFormOpen(true);
        setOpenPostMenu(false)
    }

    const handleLike = () => {
        if(!user) return history.push("/auth");
        dispatch(likePost(id, userId || googleId));
    }


    useEffect(() => {
        if(currentPost) {
            setFormData({
                title: currentPost.title, 
                message: currentPost.message, 
                tags: currentPost.tags, 
                selectedFile: currentPost.selectedFile
            });
        }
    }, [currentPostId, currentPost, setFormData]);


    return (
        <Grid item xs={12} md={3}>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar>
                            {author.substr(0, 1)}
                        </Avatar>
                    }
                    title={author}
                    subheader={formatedCreatedAt}
                    action={
                        <>
                           {googleId === creator || userId === creator ? 
                           <IconButton
                            aria-label={anchorEl ? "post-menu" : undefined}
                            aria-haspopup={anchorEl ? true: false}
                            onClick={handleOpenMenu}
                            >
                                <MoreVertIcon/>
                            </IconButton>: null}
                        </>
                    }
                />
                    
                <CardMedia className={classes.media} image={image} alt="Post Image"/>

                <CardContent>
                    <div>
                        <Typography className={classes.tags} variant="subtitle2">{tags.split(", ").map(tag => `#${tag} `)}</Typography>
                    </div>

                    <Typography variant="h5">{title}</Typography>

                    <Typography variant="body2">
                        {message}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Grid container justify="space-between">
                        <Grid item>
                            <Button 
                                onClick={handleLike}
                                className={classes.likeButton}
                                >
                                    <FavoriteIcon 
                                        style={{color: isLiked && theme.palette.secondary.main}}
                                    /> 
                                    <span style={{marginLeft: 5}}>
                                        {likes.length === 0 ? "No likes yet" : likes.length}
                                    </span>
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button disabled={!user} className={classes.commentButton}><CommentIcon/></Button>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>

            <>
              <Menu 
                id="post-menu"
                anchorEl={anchorEl}
                open={openPostMenu}
                onClose={() => setOpenPostMenu(false)}
                keepMounted
              >
                  <MenuItem className={classes.menuItem} onClick={handleUpdate}> <UpdateIcon style={{marginRight: 10}}/> Update</MenuItem>
                <MenuItem 
                  className={classes.menuItem} 
                  onClick={() => handleDelete(id)}
                >
                    <DeleteIcon style={{marginRight: 10}}/> Delete
                </MenuItem>
              </Menu>
            </>
        </Grid>
    )
}

export default Post

import React, {useRef} from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Grid, Typography, IconButton, Button, useMediaQuery} from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import {useTheme} from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';

import Input from './Input/Input';
import useStyles from './styles';
import {createPost, updatePost} from '../../../actions/posts';

const Form = ({open, onClose, formData, setFormData, setCurrentPostId, currentPostId}) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
    const imageInput = useRef();

    const handleFormChange = ({currentTarget: input}) => {
        setFormData({...formData, [input.name]: input.value})
    }

    const handleFilePic = e => {
        const file = e.target.files[0];

        if(file && file.type.substr(0, 5) === "image") {
            const reader = new FileReader();

            reader.onloadend = () => setFormData({...formData, selectedFile: reader.result});

            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = JSON.parse(localStorage.getItem("profile"))?.profile?.name;
        
        if(currentPostId) {
            dispatch(updatePost(currentPostId, formData));
        }
        else {
            if(name) formData.name = name
        else {console.log("Author's name is not provided."); 
            return;
        }
        
        dispatch(createPost(formData));
        }
        
        clear();
    }

    const clear = () => {
        setFormData({title: "", message: "", tags: "", selectedFile: ""});
        setCurrentPostId(null);
        onClose();
    }

    return (
      <Dialog open={open} onClose={onClose} fullScreen={matchesXS} PaperProps={{className: classes.dialog}} fullWidth maxWidth="xs">
          <DialogTitle>
                <Grid container justify="center">
                    <Grid item>
                        <Typography variant="h5" align="center">{currentPostId ? "Editing a ":"Add a new"} post</Typography>
                    </Grid>
                </Grid>  
          </DialogTitle>

          <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Input name="title" value={formData.title} label="Title" onChange={handleFormChange} autoFocus/>
                        <Input name="tags" value={formData.tags} label="Tags(Comma separated)" onChange={handleFormChange}/>
                        <Input name="message" value={formData.message} rows={5} label="Message" onChange={handleFormChange}/>
                    </Grid>
                    <Grid item container className={classes.formActions} spacing={2} justify="center" alignItems="center">
                        <Grid item>
                            <IconButton 
                                style={
                                        {
                                            backgroundColor: formData.selectedFile && theme.palette.primary.main, 
                                            color: formData.selectedFile && theme.palette.common.white,                                             
                                        }
                                    } 
                                onClick={() => imageInput.current.click()}>
                                {formData.selectedFile ? <CheckIcon/> : <CameraAltIcon/>}
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Button type="submit" className={classes.postButton} variant="contained">
                                Post 
                            </Button>
                        </Grid>
                        <Grid item>
                            <IconButton className={classes.closeButton} onClick={clear}>
                                <CloseIcon/>
                            </IconButton>
                        </Grid>

                        <input style={{display: "none"}} ref={imageInput} type="file" accept="image/*" onChange={handleFilePic}/>
                    </Grid>
                </form>
          </DialogContent>

          <DialogActions>

          </DialogActions>
      </Dialog>
    )
}

export default Form

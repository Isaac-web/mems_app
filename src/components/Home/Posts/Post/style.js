import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(theme => ({
    media: {
        height: "12em", 
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        backgroundPosition: "center"
    }, 
    likeButton: {
        color: theme.palette.common.grey, 
        textTransform: "none", 
    },
    commentButton: {
        color: theme.palette.common.grey
    }, 
    menuItem: {
        width: 140
    }, 
    tags: {
        color: theme.palette.grey[400]
      }
}));
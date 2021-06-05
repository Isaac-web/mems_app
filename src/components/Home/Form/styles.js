import {makeStyles} from '@material-ui/core/styles'

export default makeStyles(theme => ({
    postButton: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        width: 120, 
        padding: "15px 50px", 
        borderRadius: 50, 
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
        }
    }, 
    pictureIcon: {
        backgroundColor: theme.palette.primary.main
    }, 
    formActions: {
        marginTop: "2em", 
    }, 
    closeButton: {
        "&:hover": {
            color: "red"
        }
    }, 
    dialog: {
        [theme.breakpoints.down("xs")]: {
            paddingTop: "10em", 
        }
    }
}));
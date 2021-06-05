import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(theme => ({
    paper: {
        padding: "2em", 
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(5),
    }, 
    autBanner: {
        width: "5em", 
        height: "5em", 
        backgroundImage: "linear-gradient(-45deg, #0078FF,#00C6FF)"
    }, 
    submitButton: {
        backgroundImage: "linear-gradient(45deg, #0078FF,#00C6FF)", 
        color: theme.palette.common.white, 
        // fontSize: "0.85rem", 
        padding: 5
    }, 
    googleIcon: {
        height: 17, 
        margin: "0 8px"
    }, 
    toggleButton: {
        textDecoration: "underline", 
        opacity: "0.6", 
        cursor: "pointer", 
        "&:hover": {
            opacity: "0.9",
        }
    }
}));
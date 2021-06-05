import {makeStyles} from "@material-ui/core/styles";

export default makeStyles(theme => ({
    createButton: {
        position: "fixed",
        bottom: "5em", 
        right: "5em", 
        backgroundImage: "linear-gradient(45deg, #0078FF,#00C6FF)",
        color: theme.palette.common.white, 
        [theme.breakpoints.down("xs")]: {
            bottom: "1.5em", 
        right: "2em", 
        }
    }
}));
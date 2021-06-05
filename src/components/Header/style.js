import {makeStyles} from '@material-ui/core/styles'

export default makeStyles(theme => ({
    header: {
        backgroundColor: theme.palette.common.white, 
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)"
    }, 
    headerMargin: {
        ...theme.mixins.toolbar
    }, 
    logo: {
        width: "3em", 
        height: "3em", 
        background: theme.palette.primary.main, 
        borderRadius: "50%", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
    }, 
    loginButton: {
        backgroundImage: "linear-gradient(60deg, #0078FF,#00C6FF)",
        width: 100,
        color: theme.palette.common.white, 
        textTransform: "none", 
        "&:hover": {
            backgroundImage: "linear-gradient(65deg, #0078FF,#00C6FF)",
        }
    }, 
    profileWrapper: {
        padding: "2px 4px", 
        paddingRight: '6px',
        borderRadius: "50px", 
        background: "rgba(0, 0, 0, 0.02)"
    }
}))
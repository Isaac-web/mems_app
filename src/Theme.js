import {createMuiTheme} from '@material-ui/core/styles';

const facebookBlue = "#006AFF";
const pink = "#EE1D52";
const white = "#FFFFFF";
const grey = "#CCCCCC"
const darkGrey = "#555555"
const black = "#010101";
const skyBlue = "#00C6FF";

export default createMuiTheme({
    palette: {
        common: {
            white, black, facebookBlue, grey, darkGrey
        }, 
        primary: {
            main: skyBlue
        }, 
        secondary: {
            main: pink
        }
    }, 
    
    overrides: {
        MuiInput: {
            root: {
                color: darkGrey
            }, 
            underline: {
                "&:hover:not($disabled):not($focused):not($error):before": {
                    borderBottom: `2px solid ${skyBlue}`
                }
            }
        }
    }
})
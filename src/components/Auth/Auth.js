import React, {useState} from 'react'
import {Paper, Grid, Button, Typography, Avatar, Container, useMediaQuery} from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useTheme} from '@material-ui/core/styles';

import googleIcon from '../../assets/images/google-icon.svg';
import {AUTH} from '../../constants/actionContants';

import Input from './Input';
import useStyles from './styles';
import {signInUser, signUpUser} from '../../actions/auth';

const Auth = () => {
    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
    const dispatch = useDispatch();
    const history = useHistory();

    
    const [isSignUp, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({firstname: "", lastname: "", email: "", password: "", confirmPassword: ""})
    const classes = useStyles();

    const handleChange = ({currentTarget: input}) => setFormData(prev => ({...prev, [input.name]: input.value}));

    const googleSuccess = async (res) => {
        const profile = res?.profileObj;
        const token = res?.tokenId;

        const data = {user: profile, token};
        
        dispatch({type: AUTH, data});
        history.replace("/");
    } 

    const googleFailure = (error) => {
        console.error(error);
    } 

    const handleShowPassword = () => {
        setShowPassword(prev => !prev);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(isSignUp){
            const {firstname, lastname, email, password, confirmPassword} = formData;
            if(firstname && lastname && email && password && confirmPassword) {
                dispatch(signUpUser(formData, history));
            }
            else console.log("Missing required fields.");
        }
        else {
            if(formData.email && formData.password) {
                const reqData = {email: formData.email, password: formData.password};
                dispatch(signInUser(reqData, history));
            }
            else console.log("Missing required fields.");
        }
    }

    return (
      <Container maxWidth={isSignUp ? "sm" : "xs"}>
          <form onSubmit={handleSubmit}>
            <Paper elevation={matchesXS ? 0: 1} className={classes.paper}>
                <Grid container spacing={3} justify="center">
                    <Grid item container direction="column" justify="center" alignItems="center">
                        <Grid item>
                            <Avatar className={classes.autBanner}/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">{isSignUp ? "Sign Up": "Sign In"}</Typography>
                        </Grid>
                    </Grid>
                    {isSignUp && <>
                            <Input name="firstname" value={formData.firstname} onChange={handleChange} label="First Name" half/>
                            <Input name="lastname" value={formData.lastname} onChange={handleChange} label="Last Name" half/>
                        </>}

                        <>
                            <Input name="email" value={formData.email} onChange={handleChange} label="Email"/>    
                            <Input name="password" value={formData.password} onChange={handleChange} type={showPassword ? "text": "password"} showPassword={showPassword} onShowPassword={handleShowPassword} label="Password"/>
                    {isSignUp && <Input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type={"password"} label="Confirm Password"/>}
                        </>

                        <Grid item container spacing={3} alignItems="center">
                            <Grid item xs={12}>
                                <Button className={classes.submitButton} variant="contained" type="submit" fullWidth>{isSignUp ? "Sign Up" : "Sign In"}</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <GoogleLogin
                                    clientId="146547570883-p0v4p189uq646v102qa34uqdmmp7g70k.apps.googleusercontent.com"
                                    render={renderProps => (
                                        <Button 
                                        color="primary" 
                                        variant="outlined" 
                                        type="submit" 
                                        fullWidth
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        style={{textTransform: "none"}}
                                        > 
                                        <img src={googleIcon} alt="Google Icon" className={classes.googleIcon}/>
                                        Sign In With Google
                                        </Button>
                                    )}
                                    onSuccess={googleSuccess}
                                    onFailure={googleFailure}
                                    cookiePolicy="single_host_origin"
                                />
                            </Grid>
                            <Grid item container justify="center">
                                <Grid item>
                                    <Typography className={classes.toggleButton} onClick={() => setIsSignup(prev => !prev)}  color="secondary" variant="subtitle2">{isSignUp? "Already have an account? Sign In": "Don't have an account? Sign Up"}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                </Grid>
            </Paper>              
          </form>
      </Container>
    )
}

export default Auth

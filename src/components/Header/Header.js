import React, {useState, useEffect} from 'react';
import {AppBar, Typography, Toolbar, Button, Avatar, Menu, MenuItem, Grid, Dialog, 
DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {useDispatch} from 'react-redux';
import {Link, useLocation} from "react-router-dom";
import {LOGOUT} from '../../constants/actionContants';

import useStyles from './style';

const Header = ({user, setUser}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const location = useLocation();


    const handleLogout = () => {
        dispatch({type: LOGOUT});
        setUser(null);
        setOpenDialog(false);
    }


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location.pathname, setUser]);
    


    return (
        <>
            <AppBar className={classes.header}>
                <Toolbar>
                        <Link to="/" style={{textDecoration: "none"}}>
                            <div className={classes.logo}>
                                <Typography varaint="h6"
                                style={
                                    {   fontFamily: "cursive", 
                                        color: "white", 
                                        textDecoration: "none", 
                                        fontSize: "2rem", 
                                        fontWeight: 700
                                    }
                                    }>M</Typography>
                            </div></Link>
                        <div style={{marginLeft: "auto"}}>
                            {user?.profile ? 
                                <div 
                                    aria-label={anchorEl ? "profile-menu": undefined}
                                    aria-haspopup={anchorEl ? true: undefined}
                                    onClick={(e) => {setAnchorEl(e.currentTarget); setOpenMenu(true)}}
                                    className={classes.profileWrapper}
                                >
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <Avatar src={user.profile?.imageUrl}>{user.profile.name.charAt(0)}</Avatar>
                                        </Grid>
                                        <Grid item>
                                            <MoreHorizIcon style={{cursor: "pointer", color: "#aaaaaa", marginLeft: 5}}/>
                                        </Grid>
                                    </Grid>
                                </div>: 
                                <>
                                    {location.pathname === "/auth" ? null : <Button variant="contained" className={classes.loginButton} component={Link} to="/auth">Login</Button>}
                                </>
                            }
                        </div>
                </Toolbar>
            </AppBar>
            <div className={classes.headerMargin}/>

            <>
                <Menu
                    id="profile-menu" 
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={() => setOpenMenu(false)}
                    keepMounted                    
                >
                    <MenuItem onClick={() => {setOpenDialog(true); setOpenMenu(false)}}>Logout</MenuItem>
                </Menu>
            </>

            <>
                <Dialog open={openDialog} fullWidth maxWidth="xs" onClose={() => setOpenDialog(false)}>
                    <DialogTitle >
                            <Grid container>
                                <Grid item>
                                    <Typography variant="h5">Comfirmation</Typography>
                                </Grid>
                            </Grid>
                    </DialogTitle>
                    <DialogContent>
                            <DialogContentText>Are you sure you want to logout?</DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button size="small" onClick={() => setOpenDialog(false)}>No</Button>
                        <Button size="small" onClick={handleLogout}>Yes</Button>
                    </DialogActions>
                </Dialog>      
            </>
        </>
    )
}

export default Header

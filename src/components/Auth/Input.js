import React from 'react'
import {TextField, Grid, InputAdornment, IconButton} from '@material-ui/core';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';


const Input = ({name, value, onChange, autoFocus, onShowPassword, showPassword, half, label, type = "text"}) => {
    return (
      <Grid item xs={half ? 6 : 12}>
          <TextField 
            name={name}
            value={value}
            label={label}
            type={type}
            onChange={onChange}
            autoFocus={autoFocus}
            variant="standard"
            autoComplete="off"
            fullWidth
            InputProps={{
                endAdornment: name === "password" ? 
                <InputAdornment onClick={onShowPassword}>
                    <IconButton>
                        {showPassword ? 
                        <VisibilityOffIcon/>: 
                        <VisibilityIcon/>
                        }
                    </IconButton>
                </InputAdornment>: null
            }}
          />
      </Grid>
    )
}

export default Input

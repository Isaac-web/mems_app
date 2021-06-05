import { TextField, Grid} from '@material-ui/core'
import React from 'react'

const Input = ({name, value, onChange, half, label, rows, autoFocus}) => {
    return (
      <Grid item xs={half ? 6 : 12}>
        <TextField
            name={name}
            value={value}
            onChange={onChange}
            variant="standard"
            label={label}
            autoComplete="off"
            rows={rows}
            autoFocus={autoFocus}
            multiline={rows > 1}
            fullWidth
        />
      </Grid>
    )
}

export default Input

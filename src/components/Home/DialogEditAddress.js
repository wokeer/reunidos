import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default (props) => {
    const { open, toggle, handleClick, directionSelect } = props;
    const [value, setValue] = React.useState(directionSelect ? directionSelect.adr_address : '')
    const onChangeText = event => setValue(event.target.value)
    return (
        <div>
        <Dialog open={open} onClose={toggle} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">¿Desea actualizar la dirección?</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="address"
                label="Nueva dirección"
                type="text"
                fullWidth
                onChange={onChangeText}
                value={value}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={toggle} color="primary">
                Cancel
            </Button>
            <Button onClick={handleClick(value)} color="primary">
                Actualizar
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}

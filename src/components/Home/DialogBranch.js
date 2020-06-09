import React, { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Dialog,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    AppBar,
    Slide,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import useMediaQuery from '@material-ui/core/useMediaQuery';

/** import hooks */
import { useQueryRestaurant } from '../../hooks/useQueryRestaurant'

import Image from "../image";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    dialog: {
        '& .MuiDialog-paperWidthSm': {
            maxWidth: 360,
        }
    },
    appBar: {
        maxWidth: 360,
        right: 'inherit',
    },
    toolbar: {
       '& h4': {
            margin: 0,
            padding: 0,
            marginLeft: 10,
            fontWeight: 'bold',
            color: '#848484',
       }
    },
    image: {
        height: 30,
        width: 30,
    }
}));


export default (props) => {
    const { open, toggle, handleListItemClick } = props;
    const classes = useStyles()
    const fullScreen = useMediaQuery('@media (max-width: 768px)');
    const branch = useQueryRestaurant()

    console.log('branch', branch.toJS())

    return (
        <Dialog 
            fullScreen 
            open={open} 
            onClose={toggle} 
            TransitionComponent={Transition}
            className={fullScreen ? null : classes.dialog}
        >
            <AppBar className={fullScreen ? null : classes.appBar} style={{ backgroundColor: 'white', }}>
                <Toolbar className={classes.toolbar}>
                    <Image name='rtPh' className={classes.image} />
                    <h4>Sucursales</h4>
                    <IconButton 
                        edge="start" 
                        onClick={toggle} 
                        aria-label="close"
                        style={{ position: 'absolute', top: -10, right: -10, color: '#585858' }}
                    >
                        <CancelIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <List style={{ marginTop: 60 }}>
                {branch.get('resBranchOffice').map((e, index) =>
                    <div key={index}>
                        <ListItem button onClick={handleListItemClick(e)}>
                            <ListItemText primary={e.get('rbo_name')} />
                        </ListItem>
                        <Divider />
                    </div>
                )}
            </List>
        </Dialog>
    );
}
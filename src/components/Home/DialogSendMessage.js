import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import {
    Dialog,
    Slide,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LinearProgress from '@material-ui/core/LinearProgress';

import Image from '../image';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: theme.palette.background,
        backgroundColor: '#FAFAFA',
        // pointerEvents: 'none',
        width: 360,
        height: '100vh',
    },
    dialog: {
        '& .MuiDialog-paperWidthSm': {
            maxWidth: 360,
        },
    },
    image: {
        height: '100%',
        width: '100%',
    },
    imageIcon: {
        // backgroundColor: 'red',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        bottom: 0,
        left: 0,
        padding: 50,
        right: 0,
        width: '100%',
    },
    imageI: {
        height: 100,
        width: 100,
    },
    text: {
        margin: 20, 
        padding: 0, 
        color: theme.palette.primary.main, 
    }
  }));

export default () => {

    const classes = useStyles();
    const loading = useSelector(({ orders }) => orders.loading);
    const fullScreen = useMediaQuery('@media (max-width: 768px)');

    return (
        <Dialog 
            fullScreen 
            open={loading} 
            onClose={() => console.log('modale')} 
            TransitionComponent={Transition}
            className={fullScreen ? null : classes.dialog}
        >
            <div style={{ height: '100%', width: '100%'}}>
                <Image name='mesero' className={classes.image} />
            </div>
            <div className={classes.imageIcon}>
                <Image name='rdIcCargarPedido' className={classes.imageI} />
                <p className={classes.text}>Enviando orden al restaurante</p>
                <Image name='profile' className={classes.imageI} />
            </div>
            <LinearProgress color="primary" />
        </Dialog>
    );
}
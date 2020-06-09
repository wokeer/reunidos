import React from 'react';
import {Snackbar, IconButton, SnackbarContent} from '@material-ui/core';
import {green, amber, blue} from '@material-ui/core/colors';

import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';

import {useDispatch, useSelector} from 'react-redux';
import clsx from 'clsx';
import * as Actions from '../../redux/actions';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    root   : {
        alignSelf: 'center',
        // width: '100%',
    },
    success: {
        backgroundColor: green[600],
        color          : '#FFFFFF',
    },
    error  : {
        backgroundColor: 'red',
        color          : '#FFFFFF'
    },
    info   : {
        backgroundColor: blue[600],
        color          : '#FFFFFF'
    },
    warning: {
        backgroundColor: amber[600],
        color          : '#FFFFFF'
    }
}));

const variantIcon = {
    success: "check_circle",
    warning: "warning",
    error  : "error_outline",
    info   : "info"
};

function Message(props)
{
    const dispatch = useDispatch();
    const state = useSelector(({message}) => message.state);
    const options = useSelector(({message}) => message.options);

    const classes = useStyles();

    const renderIcon = (key) => {
        switch (key) {
            case 'check_circle':
                return <CheckCircleIcon/>
            case 'warning':
                return <WarningIcon/>
            case 'error_outline':
                return <ErrorIcon/>
            case 'info':
                return <InfoIcon/>
            default:
                return <CheckCircleIcon/>
        }
    }

    return (
        <Snackbar
            {...options}
            open={state}
            onClose={() => dispatch(Actions.hideMessage())}
            classes={{
                root: classes.root
            }}
            ContentProps={{
                variant        : 'body2',
                headlineMapping: {
                    body1: 'div',
                    body2: 'div'
                }
            }}
        >
            <SnackbarContent
                className={clsx(classes[options.variant])}
                message={
                    <div className="flex items-center">
                        {variantIcon[options.variant] && (
                            // <Icon className="mr-8" color="inherit">{variantIcon[options.variant]}</Icon>
                            renderIcon(variantIcon[options.variant])
                        )}
                        {options.message}
                    </div>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => dispatch(Actions.hideMessage())}
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        </Snackbar>
    );
}

export default React.memo(Message);

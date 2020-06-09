import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { navigate } from 'gatsby';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';

import * as Actions from '../../redux/actions'

import { useQueryRestaurant } from '../../hooks/useQueryRestaurant'

import Image from '../image'
import ImageS3 from '../imageS3'

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        //   justifyContent: 'space-around',
        // backgroundColor: theme.palette.background,
        backgroundColor: 'white',
        // pointerEvents: 'none',
        height: '100vh',
    },
    appBar: {
        backgroundColor: 'white',
        maxWidth: 360,
        minHeight: 30,
        right: 'inherit',
    },
    appBar2: {
        backgroundColor: 'white',
        minHeight: 30,
    },
    toolbar: {
        justifyContent: 'space-between',
        paddingLeft: '2.5%',
        paddingRight: '2.5%',
        minHeight: 30,
    },
    contanerBox: {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 30,
        paddingLeft: '2.5%',
        paddingRight: '2.5%',
        width: '100%',
        '& h6': {
            marginTop: 5,
            textAlign: 'left',
            fontWeight: 'bold',
        }, 
        '& p': {
            textAlign: 'left',
        }
    },
    image: {
        alignSelf: 'center',
        borderRadius: 5,
        height: 100,
        width: 100,
    },
    imageProduct: {
        alignSelf: 'center',
        borderRadius: 5,
        height: 100,
        width: 100,
    },
}));

export default (props) => {
    const { item } = props.state;

    const classes = useStyles()
    const fullScreen = useMediaQuery('@media (max-width: 768px)');
    const [data, setData] = useState(fromJS({}))
    const branch = useQueryRestaurant()
    const [localBranch, setLocalBranch] = useState(null);

    useEffect(() => {
        async function fetch() {
            const br = Actions.getLocalBranch()
                if (br) {
                    setLocalBranch(br)
                } 
        }
        fetch()
    }, [])

    useEffect(() => {
        if (item) {
            setData(fromJS(item))
        }
    }, [item])
    
    const goBack = () => navigate('/app/home')

    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar className={fullScreen ? classes.appBar2 : classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton aria-label="delete" className={classes.margin} size="small" onClick={goBack}>
                            <ArrowBackRoundedIcon fontSize="small" color='primary' />
                        </IconButton>
                        <IconButton aria-label="delete" className={classes.margin} size="small">
                            <ShareRoundedIcon fontSize="small" />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.contanerBox}>
                {data.get('pt_image') ? 
                    <ImageS3 name={`${branch.get('rest_folder')}/${localBranch.rbo_folder}/${data.get('pt_image')}`} className={classes.imageProduct} />
                : 
                    <Image name='rdPhProduct' className={classes.image} />
                }
                <h6>{data.size !== 0 ? data.get('pt_name') : ''}</h6>
                <p>{data.size !== 0 ? data.get('pt_description') : ''}</p>
            </div>
        </React.Fragment>
    );
}

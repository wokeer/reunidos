import React, { forwardRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {
    Dialog,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    InputBase,
    Toolbar,
    AppBar,
    Slide,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import { fade, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { fromJS } from 'immutable';

import * as Actions from '../../redux/actions'

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
    search: {
        position: 'relative',
        // borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.10),
        margin: 0,
        alignSelf: 'center',
        borderRadius: 20,
        width: '90%',
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#848484'
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
    },
}));

export default (props) => {
    const { open, handleClose, handleListItemClick } = props;
    const classes = useStyles()
    const dispatch = useDispatch()
    const fullScreen = useMediaQuery('@media (max-width: 768px)');
    const cities = useSelector(({ register }) => register.data)
    const [data, setData] = useState(fromJS([]))
    const [value, setValue] = useState('')

    useEffect(() => {
        setData(fromJS(cities))
    }, [cities])
    
    const onChangeText = event => {
        setValue(event.target.value)
        if (event.target.value.length > 3) {
            dispatch(Actions.getCities(event.target.value))
        }
    }

    return (
        <Dialog 
            fullScreen 
            open={open} 
            onClose={handleClose} 
            TransitionComponent={Transition}
            className={fullScreen ? null : classes.dialog}
        >
            <AppBar className={fullScreen ? null : classes.appBar} style={{ backgroundColor: 'white', }}>
                <Toolbar style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Buscar ciudad / departamento"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={onChangeText}
                            value={value}
                        />
                    </div>
                    <IconButton 
                        edge="start" 
                        onClick={handleClose} 
                        aria-label="close"
                        style={{ position: 'absolute', top: -10, right: -10, color: '#585858' }}
                    >
                        <CancelIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <List style={{ marginTop: 60 }}>
                {data.map((e, index) =>
                    <div key={index}>
                        <ListItem button onClick={handleListItemClick(e)}>
                            <ListItemText primary={e.get('nameFull')} />
                        </ListItem>
                        <Divider />
                    </div>
                )}
            </List>
        </Dialog>
    );
}

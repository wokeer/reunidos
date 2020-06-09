import React, { forwardRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import _ from 'lodash'
import { fade, makeStyles } from '@material-ui/core/styles';
import {
    Dialog,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    InputBase,
    Toolbar,
    AppBar,
    Slide,
    Button,
    Menu,
    MenuItem,
    Typography,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import * as Actions from '../../redux/actions'

import Image from "../image";
import DialogAddress from './DialogEditAddress'

/** import syles */
import { colors } from '../../styles/components/splash'

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
       '& h6': {
            margin: 0,
            padding: 0,
            marginLeft: 10,
            fontWeight: 'bold',
            color: '#848484',
       }
    },
    boxContainer: {
        paddingTop: 10,
        width: '100%'
    },
    boxImage: {
        display: 'flex',
        alignItems: 'center',
    },
    image: {
        height: 20,
        width: 20,
    },
    search: {
        position: 'relative',
        // borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.10),
        margin: 0,
        alignSelf: 'center',
        borderRadius: 5,
        width: '100%',
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
        padding: theme.spacing(1, 0, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
    },
    boxInput: { 
        // backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        width: '100%',
    },
    boxInfo: {
        // backgroundColor: 'red',
        display: 'flex',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
    },
    imageInfo: {
        height: 30,
        width: 30,
    },
    boxText: {
        // backgroundColor: 'green',
        display: 'flex',
        flexDirection: 'column',
        jistifyContent: 'center',
        marginLeft: 10,
        '& p': {
            margin: 0,
            padding: 0,
        },
        '& .p-1-address': {
            color: 'black',
            // lineHeight: 1,
        },
        '& .p-2-address': {
            color: theme.palette.primary.main,
            // lineHeight: 1,
        }
    },
    imageIcon: {
        marginRight: 10,
        height: 20,
        width: 20,
    },
}));

const ITEM_HEIGHT = 48;

export default (props) => {
    const { open, toggle } = props;
    const classes = useStyles();
    const dispatch = useDispatch()
    const address = useSelector(({ customer }) => customer.data);
    const directions = !_.isEmpty(address) ? address.cliAddress.filter((d) => d.adr_principal === 1) : []
    const fullScreen = useMediaQuery('@media (max-width: 768px)');
    
    const [dialog, setDialog] = useState(false)
    const [direction, setDirection] = useState('')
    const [directionSelect, setDirectionSelect] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    
    const handleClick = (e) => (event) => {
        setDirectionSelect(e)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = type => () => {
        switch (type) {
            case 'edit':
                // dispatch(Actions.editAddress(directionSelect.adr_id, text));
                setDialog(true)
                break;
            case 'delete':
                dispatch(Actions.deleteAddress(directionSelect.adr_id));
                break;
            case 'asing':
                dispatch(Actions.principalAddress(directionSelect.adr_id));
                break;
        
            default:
                break;
        }
        setAnchorEl(null);
    };

    const onChangeText = event => setDirection(event.target.value)

    const saveAddress = () => {
        if (direction) {
            dispatch(Actions.saveAddress(direction))
            setDirection('')
        } else {
            dispatch(Actions.showMessage({ message: 'Ingrese una dirección', variant: 'warning' }))
        }
    }

    const toggleAddress = () => {
        setDialog(!dialog)
    }

    const handleClickAddress = (text) => () => {
        if (text) {
            dispatch(Actions.editAddress(directionSelect.adr_id, text));
            setDialog(false)
        } else {
            dispatch(Actions.showMessage({ message: 'Ingrese una dirección', variant: 'warning' }))
        }
    }

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
                    <div className={classes.boxContainer}>
                        <div className={classes.boxImage}>
                            <Image name='rdU' className={classes.image} />
                            <h6>Agrega o escoge una dirección</h6>
                        </div>
                        <div className={classes.boxInput}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <LocationOnRoundedIcon fontSize='small'/>
                                </div>
                                <InputBase
                                    placeholder="Nueva dirección"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={onChangeText}
                                    value={direction}
                                />
                            </div>
                            <Button
                                variant='contained'
                                color='primary'
                                size='small'
                                style={{ marginLeft: 5, textTransform: 'none', color: 'white' }}
                                onClick={saveAddress}
                            >
                                Agregar
                            </Button>
                        </div>
                        <div className={classes.boxInfo}>
                            <Image name='rdDireccion' className={classes.imageInfo} />
                            <div className={classes.boxText}>
                                <p className='p-1-address'>{directions.length > 0 ? directions[0]['adr_address'] : '' }</p>
                                <p className='p-2-address'>Principal</p>
                            </div>
                        </div>
                    </div>
                    
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
            <Toolbar/>
            <List style={{ marginTop: 100 }}>
                {!_.isEmpty(address) ? address.cliAddress.map((e, index) =>
                    <div key={index}>
                        <ListItem >
                            <ListItemIcon>
                                <LocationOnRoundedIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText primary={e.adr_address} />
                            <ListItemSecondaryAction>
                                <IconButton 
                                    edge="end"
                                    onClick={handleClick(e)}
                                    aria-label="close"
                                    aria-controls="long-menu"
                                >
                                    <MoreVertRoundedIcon color='primary' />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </div>
                ) : null}
            </List>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={openMenu}
                onClose={handleClose('close')}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '16ch',
                        border: `1px ${colors.primaryColor} solid`,
                    },
                }}
            >
                <MenuItem onClick={handleClose('edit')}>
                    <Image name='rdEdit' className={classes.imageIcon}/>
                    <Typography variant="inherit">
                        Editar
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose('delete')}>
                    <Image name='rdEliminar' className={classes.imageIcon}/>
                    <p style={{ margin: 0, padding: 0 }}>Eliminar</p>
                </MenuItem>
                <MenuItem onClick={handleClose('asing')}>
                    <Image name='rdDireccion' className={classes.imageIcon}/>
                    <p style={{ margin: 0, padding: 0 }}>Principal</p>
                </MenuItem>
            </Menu>
            {dialog ?
                <DialogAddress
                    open={dialog}
                    toggle={toggleAddress}
                    handleClick={handleClickAddress}
                    directionSelect={directionSelect}
                />
            : null}
        </Dialog>
    );
}
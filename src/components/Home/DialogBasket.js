import React, { forwardRef, useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
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
    Button,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import useMediaQuery from '@material-ui/core/useMediaQuery';

/** import hooks */
// import { useQueryRestaurant } from '../../hooks/useQueryRestaurant'

import * as Actions from '../../redux/actions'
import priceFormat from '../../utils/priceFormat'

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
    boxContainer: {
        paddingTop: 10,
        width: '100%'
    },
    boxTitle: {
        display: 'flex',
        alignItems: 'center',
    },
    boxContainerTitle: { 
        // backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        width: '100%',
        '& span': {
            margin: 0,
            padding: 0,
            marginLeft: 10,
            fontSize: 14,
        },
        '& .span-2-text': {
            color: theme.palette.primary.main,
            fontWeight: 'bold',
        }
    },
    iconButton: {
        borderRadius: 40,
    },
    imageProduct: {
        borderRadius: 5,
        height: 50,
        width: 50,
    },
    imageProductEdit: {
        alignSelf: 'flex-start',
        marginLeft: 2,
        height: 10,
        width: 10,
    },
    boxText: {
        '& span': {
            fontSize: 13,
        }
    },
    boxAddNumber: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        border: '1px solid',
        borderColor: '#aaaa',
        borderRadius: 20,
    },
    btnAdd: {
        color: 'black',
        textTransform: 'none',
        margin: 0,
        padding: 0,
        minWidth: 30,
        fontSize: 12,
    },
    containerBottom: {
        backgroundColor: 'white',
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 10,
        paddingBottom: 10,
        width: 360,
    },
    containerBottomSm: {
        backgroundColor: 'white',
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 10,
        paddingBottom: 10,
        width: '100%',
    },
    containerCar: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '2.5%',
        paddingBottom: 10,
        marginTop: 30,
        '& .containerDivCar': {
            marginLeft: 10,
            '& p': {
                margin: 0,
                padding: 0,
                fontSize: 14,
            },
            '& .textPriceDomi':{
                fontWeight: 'bold',
            }
        }
    },
    car: {
        height: 30,
        width: 30,
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: `linear-gradient(to right, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        alignSelf: 'center',
        width: 340,
        '& p': {
            color: 'white',
            margin: 0,
            padding: 0,
        },
        '& .cant_plate': {
            backgroundColor: theme.palette.primary.main,
            borderRadius: 3,
            fontSize: 14,
            height: 20,
            width: 20,
        }
    },
    buttonSm: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: `linear-gradient(to right, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        alignSelf: 'center',
        width: '95%',
        '& p': {
            color: 'white',
            margin: 0,
            padding: 0,
        },
        '& .cant_plate': {
            backgroundColor: theme.palette.primary.main,
            borderRadius: 3,
            fontSize: 14,
            height: 20,
            width: 20,
        }
    },
    btn: {
        textTransform: 'none',
        color: '#848484'
    },
    noFoundData: {
        textAlign: 'center',
    }
}));

export default (props) => {
    const { open, platesLocal, localBranch, toggle, total, toggleOrde } = props;
    const classes = useStyles();
    const dispatch = useDispatch()
    const fullScreen = useMediaQuery('@media (max-width: 768px)');
    // const rest = useQueryRestaurant()
    const [discont, setDiscont] = useState(0)

    useEffect(() => {
        async function fetch() {
            if (platesLocal.size !== 0) {
                let disc = 0
                for await (const i of platesLocal) {
                    disc += ((i.get('pt_discount') / 100) * i.get('pt_price')) * i.get('cant_plate')
                }
                setDiscont(disc)
            }
        }
        fetch()
    }, [platesLocal])

    const handleClick = (e) => (event) => {
        console.log('e', e)
    };

    const hanledRemove = item => () => {
        if (item.get('cant_plate') > 1) {
            const findIndexItem = platesLocal.findIndex((e) => e.get('UUII') === item.get('UUII'))
            const newItem = item.set('cant_plate', item.get('cant_plate') - 1)
            const newData = platesLocal.set(findIndexItem, newItem)
            dispatch(Actions.setPlateById(newData.toJS()))
        } else {
            const newData = platesLocal.filter((e) => e.get('UUII') !== item.get('UUII'))
            dispatch(Actions.setPlateById(newData.toJS()))
        }
        
    }

    const hanledAdd = item => () => {
        const findIndexItem = platesLocal.findIndex((e) => e.get('UUII') === item.get('UUII'))
        const newItem = item.set('cant_plate', item.get('cant_plate') + 1)
        const newData = platesLocal.set(findIndexItem, newItem)
        dispatch(Actions.setPlateById(newData.toJS()))
    }

    const outBasket = () => {
        dispatch(Actions.setPlateById([]))
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
                        <div className={classes.boxTitle}>
                            <h4>Mi Canasta</h4>
                        </div>
                        {platesLocal.size !== 0 && discont > 0 ?
                            <div className={classes.boxContainerTitle}>
                                <ErrorRoundedIcon fontSize='small' />
                                <span>Descuentos de esta orden: </span>
                                <span className='span-2-text'>- $ {priceFormat(discont)}</span>
                            </div>
                        : null}
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
            <List style={{ marginTop: 30, marginBottom: 300 }}>
                {platesLocal.size !== 0 ? platesLocal.map((e, index) =>
                    <div key={index}>
                        <ListItem >
                            <IconButton 
                                edge="start"
                                onClick={handleClick(e)}
                                aria-label="close"
                                className={classes.iconButton}
                            >
                                <Image name='rdPhProduct' className={classes.imageProduct}/>
                                <Image name='rdEdit' className={classes.imageProductEdit}/>
                            </IconButton>
                            <ListItemText 
                                className={classes.boxText}
                                primary={
                                    <span>{`${e.get('pt_name')} ${e.get('pt_discount') > 0 ? `${e.get('pt_discount')}% off` : '' }`}</span>
                                } 
                                secondary={
                                    <span>${priceFormat(e.get('total') + e.get('totalAdicional'))}</span>
                                }
                            />
                            <div className={classes.boxAddNumber}>
                                <Button 
                                    size="small" 
                                    className={classes.btnAdd} 
                                    onClick={hanledRemove(e)}
                                    // disabled={dataHanled.get('cant_plate') === 1}
                                >
                                    -
                                </Button>
                                <span>{e.get('cant_plate')}</span>
                                <Button 
                                    size="small" 
                                    className={classes.btnAdd} 
                                    onClick={hanledAdd(e)}
                                >
                                    +
                                </Button>
                            </div>
                        </ListItem>
                        <Divider />
                    </div>
                ) : <p className={classes.noFoundData}>¡Tu canasta se encuentra vacia!</p>}
                {platesLocal.size !== 0 ?
                    <div className={classes.containerCar}>
                        <Image name='rdDomi' className={classes.car} />
                        <div className='containerDivCar'>
                            <p>Valor del domicilio</p>
                            <p className='textPriceDomi'>$ {localBranch ? localBranch.rbo_domicile_value : ''}</p>
                        </div>
                    </div>
                : null}
            </List>
            {platesLocal.size !== 0 ?
                <div className={fullScreen ? classes.containerBottomSm : classes.containerBottom}>
                    <IconButton
                        aria-label="delete"
                        className={fullScreen ? classes.buttonSm : classes.button}
                        size="small"
                        onClick={toggleOrde}
                    >
                        <p className='cant_plate'>{platesLocal.size}</p>
                        <p style={{ marginLeft: '20%' }}>Continuar</p>
                        <p>$ {priceFormat(total)}</p>
                    </IconButton>
                    <Button
                        className={classes.btn}
                        startIcon={<ShoppingCartRoundedIcon />}
                        onClick={outBasket}
                    >
                        Vaciar canasta
                    </Button>
                </div>
            : null}
        </Dialog>
    );
}
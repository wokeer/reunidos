import React, { forwardRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import _ from 'lodash'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Dialog,
    IconButton,
    Toolbar,
    AppBar,
    Slide,
    Button,
    TextField,
    InputAdornment,
    Radio,
} from '@material-ui/core';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import * as Actions from '../../redux/actions'
import priceFormat from '../../utils/priceFormat'

/** import hooks */
// import { useQueryRestaurant } from '../../hooks/useQueryRestaurant'

import Image from "../image";
import DialogSendMessage from './DialogSendMessage';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const GlobalRadio = withStyles({
    root: {
        color: '#a2aaad',
        '&$checked': {
            color: '#43484c',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
    dialog: {
        '& .MuiDialog-paperWidthSm': {
            backgroundColor: '#FAFAFA',
            maxWidth: 360,
        },
    },
    dialog1: {
        '& .MuiDialog-paperWidthSm': {
            backgroundColor: '#FAFAFA',
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
    containerAddress: {
        display: 'flex',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 10,
        paddingLeft: '2.5%',
        '& p': {
            margin: 0,
            padding: 0,
            fontSize: 13,
            marginLeft: 10,
        }
    },
    imageEdit: {
        height: 15,
        width: 15,
    },
    containerProducts: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginTop: 30,
        paddingLeft: '4%',
        '& p': {
            margin: 0,
            padding: 0,
            fontSize: 13,
            width: 80,
        },
        '& .text-you': {
            fontWeight: 'bold',
        }
    },
    boxImages: {
        alignItems: 'center',
        display: 'flex',
        overflowX: 'scroll',
        flexWrap: 'nowrap',
        // width: 200,
        WebkitOverflowScrolling: 'touch',
    },
    imagePro: {
        flex: '0 0 auto',
        margin: 2,
        borderRadius: 15,
        height: 30,
        width: 30,
    },
    containerBottom: {
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width: 360,
    },
    containerBottomSm: {
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
    },
    boxTotal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '2.5%',
        paddingTop: 10,
        paddingBottom: 10,
        width: '100%',
        '& .content-total p': {
            margin: 0,
            padding: 0,
        },
        '& .total-text': {
            color: 'black',
            fontWeight: 'bold',
        },
        '& .number-total': {
            color: 'black',
            fontWeight: 'bold',
            marginRight: '2.5%',
        }
    },
    btn: {
        alignSelf: 'center',
        marginBottom: 20,
        color: 'white',
        width: '95%',
    },
    containerRadio: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px #bfbbba solid',
        paddingLeft: '2.5%',
        '& p': {
            margin: 0,
            padding: 0,
        }
    },
    textNormal: { 
        backgroundColor: '#bfbbba', 
        paddingLeft: '2.5%', 
        paddingTop: 5, 
        paddingBottom: 5,
        marginTop: 20,
        '& p': {
            margin: 0,
            padding: 0,
        }
    },
}));

export default (props) => {
    const { open, toggle, platesLocal, localBranch, total, cleanAll } = props;
    const classes = useStyles();
    const dispatch = useDispatch()
    // const rest = useQueryRestaurant()
    const fullScreen = useMediaQuery('@media (max-width: 768px)');
    const address = useSelector(({ customer }) => customer.data);
    const directions = !_.isEmpty(address) ? address.cliAddress.filter((d) => d.adr_principal === 1) : []

    const [radio, setRadio] = useState({
        radio1: false,
        radio2: false,
    })
    const [text, setText] = useState('Piso 3')
    const [textP, setTextP] = useState('')

    useEffect(() => {
        if (localBranch) {
            if (!localBranch.rbo_datafono) {
                setRadio({
                    radio1: true,
                    radio2: false,
                })
            }
        }
    }, [localBranch])

    const gotoWhatsapp = () => {
        if (radio.radio1) {
            if (textP) {
                const body = {
                    plates: platesLocal.toJS(),
                    order: {
                        ord_total_order: total,
                        ord_valor_domicilio: localBranch.rbo_domicile_value,
                        ord_direction: directions[0].adr_address,
                        ord_direction_id: directions[0].adr_id,
                        ord_comentario_direccion: text,
                        ord_payment_type: 1, 
                        ord_payment_value: textP,
                        ord_sucursal_id: localBranch.rbo_id,
                    }
                }
                console.log('bodyt', body)
                dispatch(Actions.createOrders(body))
                cleanAll()
            } else {
                dispatch(Actions.showMessage({ message: '¡Ingresa con cuanto pagarás!',  variant: 'warning' }))
            }
        } else if (radio.radio2) {
            const body = {
                plates: platesLocal.toJS(),
                order: {
                    ord_total_order: total,
                    ord_valor_domicilio: localBranch.rbo_domicile_value,
                    ord_direction: directions[0].adr_address,
                    ord_direction_id: directions[0].adr_id,
                    ord_comentario_direccion: text,
                    ord_payment_type: 2, 
                    ord_payment_value: textP,
                    ord_sucursal_id: localBranch.rbo_id,
                }
            }
            dispatch(Actions.createOrders(body))
            cleanAll()
        } else {
            dispatch(Actions.showMessage({ message: '¡Elija metodo de pago!',  variant: 'warning' }))
        }

//         const messageUrl = `https://wa.me/${'573187704246'}?text=`
//         const message = `Hola, soy ${'alexis Noriega'}, 
// hice esta orden en ${'Charlies'}:
// Mi orden: ${'https://aliados.reunidos.co/id_orden/123'}
// -----------------------------
// Valor: $${'95.000'} (Incluye domicilio)
// -----------------------------
// Tu orden se confirmará en los próximos
// minutos. Si no hay respuesta por parte
// del restaurante, esta orden se cancelará.`

//         window.location.href = `${messageUrl}${encodeURIComponent(message).replace(/%20/g,'+')}`
    }

    const handleRadio = type => () => {
        if (type === 'radio1') {
            setRadio({
                radio1: true,
                radio2: false,
            })
        } else {
            setRadio({
                radio1: false,
                radio2: true,
            })
        }
    }

    const onChangeText = e => setText(e.target.value)
    const onChangeTextP = e => setTextP(e.target.value)

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={toggle}
            TransitionComponent={Transition}
            className={fullScreen ? classes.dialog1 : classes.dialog}
        >
            <AppBar className={fullScreen ? null : classes.appBar} style={{ backgroundColor: 'white', }}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.boxContainer}>
                        <IconButton
                            edge="start"
                            size='small'
                            onClick={toggle}
                            style={{ top: 0, left: -10 }}
                        >
                            <ArrowBackRoundedIcon color='primary' size='small' />
                        </IconButton>
                        <div className={classes.boxTitle}>
                            <h4>Tu Orden</h4>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <div className={classes.containerAddress}>
                <LocationOnRoundedIcon fontSize='small' />
                <div>
                    <p>DIRECCIÓN DE ENTREGA</p>
                    <p>{directions.length > 0 ? directions[0]['adr_address'] : 'selecciona una direccion' }</p>
                </div>
            </div>
            <TextField
                id="outlined-basic-2"
                label="Ej: Oficina 302"
                variant="outlined"
                fullWidth
                size='small'
                style={{ marginTop: 5, width: '95%', alignSelf: 'center' }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Image name='rdEdit' className={classes.imageEdit} />
                        </InputAdornment>
                    ),
                }}
                value={text}
                onChange={onChangeText}
            />
            <div className={classes.containerProducts}>
                <div>
                    <p>Tu Orden</p>
                    <p className='text-you'>{platesLocal.size} productos</p>
                </div>
                <div className={classes.boxImages}>
                    {platesLocal.map((e) => {
                        return <Image name='rdPhProduct' className={classes.imagePro} />
                    })}
                </div>
                <IconButton
                    edge="end"
                    size='small'
                    onClick={toggle}
                >
                    <NavigateNextRoundedIcon size='small' />
                </IconButton>
            </div>
            <div className={classes.textNormal}>
                <p>¿Qué método de pago utilizarás?</p>
            </div>
            <div className={classes.containerRadio}>
                <p>Efectivo</p>
                <GlobalRadio 
                    size="small"
                    checked={radio.radio1}
                    onChange={handleRadio('radio1')}
                />
            </div>
            {localBranch ?
                localBranch.rbo_datafono ?
                    <div className={classes.containerRadio}>
                        <p>Datáfono</p>
                        <GlobalRadio 
                            size="small"
                            checked={radio.radio2}
                            onChange={handleRadio('radio2')}
                        />
                    </div>
                : null 
            : null }
            {radio.radio1 ?
                <TextField
                    id="outlined-basic"
                    label="¿Con cuanto pagarás?"
                    variant="outlined"
                    size='small'
                    style={{ marginTop: 20, width: '95%', alignSelf: 'center' }}
                    value={textP}
                    onChange={onChangeTextP}
                    type='number'
                />
            : null}
            <div className={fullScreen ? classes.containerBottomSm : classes.containerBottom}>
                <div className={classes.boxTotal}>
                    <div className='content-total'>
                        <p className='total-text'>Total a cobrar</p>
                        <p>Con efectivo</p>
                    </div>
                    <p className='number-total'>$ {priceFormat(total + (localBranch ? localBranch.rbo_domicile_value : 0))}</p>
                </div>
                <Button
                    className={classes.btn}
                    color='primary'
                    variant="contained"
                    size='small'
                    onClick={gotoWhatsapp}
                >
                    Hacer Orden
                </Button>
            </div>
            <DialogSendMessage />
        </Dialog>
    );
}
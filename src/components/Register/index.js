import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { navigate } from "gatsby"
import { fromJS } from 'immutable';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Button,
    TextField,
    InputAdornment,
} from '@material-ui/core';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';

import * as Actions from '../../redux/actions'
import Image from '../image'
import DialogCities from './DialogCities'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        // backgroundColor: theme.palette.background,
        backgroundColor: '#FAFAFA',
        // pointerEvents: 'none',
        height: '100vh',
    },
    boxImageLogo: {
        borderRadius: 75,
        // marginTop: 20,
        height: 150,
        width: 150,
    },
    image: {
        borderRadius: 75,
        height: 150,
        width: 150,
    },
    boxContainer: {
        // backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        width: '100%',
    },
    boxInputs: {
        // backgroundColor: 'red',
        // margin: 5,
        marginTop: 10,
        width: '90%',
        '& p': {
            margin: 0,
            padding: 0,
            fontSize: 13,
            color: '#848484',
        },
        '& .MuiBox-root': {
            borderRadius: 4,
            '& input': {
                color: '#848484',
                fontWeight: 'bold',
            }
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'transparent',
            },
        },
    },
    button: {
        color: theme.palette.secondary.light,
        fontWeight: 'bold',
        width: '90%',
    },
    buttonBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 0,
        backgroundColor: 'white',
        border: '0px',
        borderRadius: '4px',
        height: 40,
        width: '100%',
    },
    boxBtn: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 13,
        '& p': {
            marginLeft: 7,
            fontWeight: 'bold',
        }
    }
}));

export default (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = useSelector(({ users }) => users.user)

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState(fromJS({}))
    const [modalCities, setModalCities] = useState(false)




    useEffect(() => {
        if (user['customers'][0].cli_name) {
          navigate('/app/home')
        } else {
          dispatch(Actions.getCities('a'))
        }
    }, [])

    const toggle = () => setModalCities(!modalCities)

    const handleListItemClick = item => () => {
        setCity(item)
        setModalCities(false)
    }

    const onChangeTextName = (event) => setName(event.target.value)
    const onChangeTextAddress = (event) => setAddress(event.target.value)

    const verifyInfo = async () => {
        if (!name || !address || city.size === 0) {
            dispatch(Actions.showMessage({ message: 'Ingrese todo los datos', variant: 'warning' }))
        } else {
            const body = {
                cli_name: name,
                adr_city_id: city.get('id'),
                adr_address: address,
            }
            const resultUpdate = await dispatch(Actions.updateCustomer(body, user['customers'][0].cli_id))
            console.log('resultUpdate', resultUpdate)
            if (resultUpdate) {
                navigate('/app/home')
            }
        }
    }

    return (
        <div className={classes.root}>
            <Box
                boxShadow={10}
                bgcolor="background.paper"
                className={classes.boxImageLogo}
            >
                <Image name='profile' className={classes.image} />
            </Box>
            <div className={classes.boxContainer}>
                <div className={classes.boxInputs} style={{ marginTop: 0 }}>
                    <p>Nombres y apellidos:</p>
                    <Box
                        boxShadow={10}
                        bgcolor="background.paper"
                    >
                        <TextField
                            id="input-with-icon-textfield1"
                            variant="outlined"
                            size='small'
                            fullWidth
                            onChange={onChangeTextName}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonRoundedIcon style={{ color: '#848484' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </div>
                <div className={classes.boxInputs}>
                    <p>Ciudad:</p>
                    <Box
                        boxShadow={10}
                        bgcolor="background.paper"
                    >
                        <button className={classes.buttonBox} onClick={toggle}>
                            <div className={classes.boxBtn}>
                                <LocationOnRoundedIcon style={{ color: '#848484' }} />
                                <p>{city.size !== 0 ? city.get('nameFull') : ''}</p>
                            </div>
                            <ArrowDropDownRoundedIcon style={{ color: '#848484' }} />
                        </button>
                    </Box>
                </div>
                <div className={classes.boxInputs}>
                    <p>Dirección:</p>
                    <Box
                        boxShadow={10}
                        bgcolor="background.paper"
                    >
                        <TextField
                            id="input-with-icon-textfield3"
                            variant="outlined"
                            size='small'
                            fullWidth
                            onChange={onChangeTextAddress}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HomeRoundedIcon style={{ color: '#848484' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </div>
            </div>
            <Button
                variant="contained"
                size="medium"
                color="primary"
                className={classes.button}
                onClick={verifyInfo}
            >
                Confirmar
            </Button>
            <DialogCities
                open={modalCities}
                handleClose={toggle}
                handleListItemClick={handleListItemClick}
            />
        </div>
    );
}
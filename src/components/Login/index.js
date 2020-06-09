import React, { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Slide, CircularProgress, Box, Link } from '@material-ui/core';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import { fromJS } from 'immutable';
import { navigate } from "gatsby"

/** import actions */
import * as Actions from '../../redux/actions'

import Image from '../image'
import ImageIcon from '../imageIcon'
import DialogCountry from './DialogCountry'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'space-around',
    // backgroundColor: theme.palette.background,
    backgroundColor: '#FAFAFA',
    // pointerEvents: 'none',
    height: '100vh',
  },
  image: {
    borderRadius: 75,
    height: 150,
    width: 150,
  },
  boxText: {
    height: 60,
    width: '90%',
    marginTop: 30,
    '& p': {
      padding: 0,
      margin: 0,
      fontSize: 13
    }
  },
  boxInput: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
    height: 40,
  },
  boxIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    border: 0,
    borderRadius: 5,
    padding: 0,
    paddingLeft: 2,
    height: '100%',
    '& p': {
      marginLeft: 2,
      fontSize: 16,
      fontWeight: 'bold'
    }
  },
  iconCountry: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    border: 0,
    borderRadius: 5,
    padding: 0,
    margin: 0,
    height: '100%',
    outLine: 0,
    '&:focus': {
      outline: 0,
    }
  },
  button: {
    color: theme.palette.secondary.light,
    fontWeight: 'bold',
    marginTop: '10%',
    width: '90%',
  },
  buttonTwo: {
    textTransform: 'none',
    color: theme.palette.primary.main,
    marginTop: '10%',
  },
  logo: {
    marginTop: 10,
    height: 50,
    width: 60,
  }
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default () => {

  const dispatch = useDispatch()
  const classes = useStyles()
  const loadingSendCode = useSelector(({users}) => users.loadingSendCode)

  const [open, setOpen] = useState(false);
  const [text, setText] = useState('')
  const [icon, setIcon] = useState('colombia')
  const [item, setItem] = useState(fromJS({
    country_code: "CO",
    country_name: "Colombia",
    dialling_code: "+57"
  }))

  useEffect(() => {
    async function fetch() {
      const result = await dispatch(Actions.isLoggedIn())
      console.log('result Home', result)
      if (result) {
        if (!result.customers[0].cli_name) {
          navigate('/app/register')
        } else {
          navigate('/app/home')
        }
      }
    }
    fetch()
  }, [])

  const onChangeText = event => setText(event.target.value)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false);

  const handleListItemClick = item => () => {
    setItem(item);
    setOpen(false);
  };

  const sendCode = async () => {
    if (text) {
      const body = {
        phone: text,
        code_country: item.get('dialling_code'),
        usr_device_imei: "12345"
      }
      const result = await dispatch(Actions.sendCode(body))
      if (result) {
        navigate('/app/verificar', {
          state: { phone: text, code_country: item.get('dialling_code') }
        })
      }
    } else {
      dispatch(Actions.showMessage({ message: 'Ingrese un numero de whatsapp', variant: 'warning' }))
    }
  }

  return (
    <div className={classes.root}>
      <Box
        boxShadow={10}
        bgcolor="background.paper"
        style={{ width: 150, height: 150, borderRadius: 75, marginTop: '15%' }}
      >
        <Image name='profile' className={classes.image} />
      </Box>

      <div className={classes.boxText}>
        <p>Ingresa tu número de whatsapp:</p>
        <Box
          boxShadow={10}
          bgcolor="background.paper"
          className={classes.boxInput}
        >
          <button 
            className={classes.boxIcon}
            onClick={handleClickOpen}
          >
            <ImageIcon name={icon} className={classes.iconCountry} />
            <p>{item.get('dialling_code')}</p>
            <ArrowDropDownRoundedIcon />
          </button>
          <input 
            type="text"
            id="numberW" 
            name="numberW"
            placeholder='Número whatsapp'
            onChange={onChangeText}
            value={text}
            className={classes.input}
          />
        </Box>
      </div>
      {loadingSendCode ?
        <CircularProgress color="primary" />
      : 
        <Button 
          variant="contained" 
          size="medium" 
          color="primary" 
          className={classes.button}
          onClick={sendCode}
        >
          Continuar...
        </Button>
      }

      <Button 
        size="small" 
        className={classes.buttonTwo}
      >
        <Link href="https://reunidos.co" target="_blank">
          ¿Quiéres tu propia tienda?
        </Link>
      </Button>
      
      <Image name='logoDark' className={classes.logo} />
      <DialogCountry 
        open={open} 
        Transition={Transition}
        handleClose={handleClose}
        handleListItemClick={handleListItemClick}
      />
    </div>
  );
}
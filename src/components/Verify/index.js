import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import {
    Box,
    IconButton,
    Typography,
    TextField,
    CircularProgress,
} from '@material-ui/core';
import { navigate } from "gatsby"

/** import actions */
import { auth, isLoggedIn } from "../../redux/actions";

import Image from '../image'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    //   justifyContent: 'space-around',
      // backgroundColor: theme.palette.background,
      backgroundColor: '#FAFAFA',
      // pointerEvents: 'none',
      height: '100vh',
    },
    header: {
        // backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 5,
        paddingLeft: 5,
        height: 40,
        width: '100%'
    },
    logo: {
        height: 30,
        width: 30,
    },
    image: {
        borderRadius: 75,
        height: 150,
        width: 150,
    },
    boxText: {
        display: 'flex',
        flexDirection: 'column',
        // backgroundColor: 'red',
        marginTop: 30,
        width: '90%',
    },
    text: {
        color: theme.palette.secondary.dark,
        fontSize: 13,
        margin: 0,
        padding: 0,
        fontWeight: 'bold'
    },
    textPhone: {
        color: theme.palette.primary.main,
        fontSize: 13,
        margin: 0,
        padding: 0,
        fontWeight: 'bold'
    },
    button: {
        color: theme.palette.secondary.light,
        fontWeight: 'bold',
        marginTop: 30,
        width: '90%',
    },
    boxInputs: {
        display: 'flex',
        // backgroundColor: 'red',
        justifyContent: 'space-between',
        marginTop: 30,
        width: '90%',
        '& .MuiInputBase-root': {
            boxShadow: `rgba(0, 0, 0, 0.2) 0px 6px 6px -3px, rgba(0, 0, 0, 0.14) 0px 10px 14px 1px, rgba(0, 0, 0, 0.12) 0px 4px 18px 3px;`,
        },
    },
    input: {
        width: 70,
        alignItems: 'center',
        
        '& .MuiOutlinedInput-input': {
            height: 40,
            textAlign: 'center',
            fontSize: 30,
        }
    }
}));

export default (props) => {

    const { phone, code_country } = props.location.state || (typeof props.history === 'object' && props.history.state);

    const dispatch = useDispatch()
    const loading = useSelector(({ users }) => users.loading)
    const classes = useStyles()

    const [text1, setText1] = React.useState('')
    const [text2, setText2] = React.useState('')
    const [text3, setText3] = React.useState('')
    const [text4, setText4] = React.useState('')

    const input1 = React.createRef()
    const input2 = React.createRef()
    const input3 = React.createRef()
    const input4 = React.createRef()

    React.useEffect(() => {
        async function fetch() {
          const result = await dispatch(isLoggedIn())
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

    React.useEffect(() => {
        if (text4.length > 0) {
            validate()
        }
    }, [text4])

    const onChangeText1 = event => {
        if (event.target.value.length > 0) {
            setText1(event.target.value)
            input2.current.focus()
        } else {
            setText1(event.target.value)
        }
    }
    const onChangeText2 = event => {
        if (event.target.value.length > 0) {
            setText2(event.target.value)
            input3.current.focus()
        } else {
            setText2(event.target.value)
            input1.current.focus()
        }
    }
    const onChangeText3 = event => {
        if (event.target.value.length > 0) {
            setText3(event.target.value)
            input4.current.focus()
        } else {
            setText3(event.target.value)
            input2.current.focus()
        }
    }
    const onChangeText4 = event => {
        if (event.target.value.length > 0) {
            setText4(event.target.value)
        } else {
            setText4(event.target.value)
            input3.current.focus()
        }
    }

    const validate = async () => {
        const code = `${text1}${text2}${text3}${text4}`
        if (code.length === 4) {
            console.log('==== code', code)
            const body = {
                code,
                phone,
                usr_device_imei: '12345',
            }
            const result = await dispatch(auth(body))
            console.log('resulrt', result)
            if (result) {
              if (!result.customers[0].cli_name) {
                navigate('/app/register')
              } else {
                navigate('/app/home')
              }
            } else {
                setText1('')
                setText2('')
                setText3('')
                setText4('')
            }
        }
    }
    
    const goBack = () => {
        navigate('/app/login')
    }

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <IconButton 
                    edge="start" 
                    onClick={goBack} 
                    aria-label="close"
                    size='small'
                >
                    <ArrowBackRoundedIcon color='primary' />
                </IconButton>
                <Image name='logoDark' className={classes.logo} />
            </div>
            <Box
                boxShadow={10}
                bgcolor="background.paper"
                style={{ width: 150, height: 150, borderRadius: 75 }}
            >
                <Image name='profile' className={classes.image} />
            </Box>
            <div className={classes.boxText}>
                <Typography variant="body1" component="body1" className={classes.text}>
                    Introduce tu código enviado al:
                </Typography>
                <Typography variant="body1" component="body1" className={classes.textPhone}>
                    {code_country}{phone}
                </Typography>
            </div>
            {loading ?
                <CircularProgress color="primary" />
            : 
                <div className={classes.boxInputs}>
                    <TextField
                        inputRef={input1}
                        id="outlined-size-small1"
                        variant="outlined"
                        className={classes.input}
                        inputProps={{ maxLength: 1 }}
                        value={text1}
                        onChange={onChangeText1}
                        // disabled={text2.length > 0 ? true : false}
                    />
                    <TextField
                        inputRef={input2}
                        id="outlined-size-small2"
                        variant="outlined"
                        className={classes.input}
                        inputProps={{ maxLength: 1 }}
                        value={text2}
                        onChange={onChangeText2}
                    />
                    <TextField
                        inputRef={input3}
                        id="outlined-size-small3"
                        variant="outlined"
                        className={classes.input}
                        inputProps={{ maxLength: 1 }}
                        value={text3}
                        onChange={onChangeText3}
                    />
                    <TextField
                        inputRef={input4}
                        id="outlined-size-small4"
                        variant="outlined"
                        className={classes.input}
                        inputProps={{ maxLength: 1 }}
                        value={text4}
                        onChange={onChangeText4}
                    />
                </div>
            }
            {/* <Button 
                variant="contained" 
                size="large" 
                color="primary" 
                className={classes.button}
                // onClick={sendCode}
            >
                Continuar...
            </Button> */}
        </div>
    )
}
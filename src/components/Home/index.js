import React, { useState, useEffect } from "react"
import { fromJS } from 'immutable';
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import { navigate } from 'gatsby'
import { Storage } from 'aws-amplify';

import * as Actions from '../../redux/actions'
import priceFormat from '../../utils/priceFormat'

/** import components */
import Header from './header'
import RenderItem from './renderItem'
import DialogBranch from './DialogBranch'
import DialogAddress from './DialogAddress'
import DialogBasket from './DialogBasket'
import DialogOrde from './DialogOrde'

/** import styles */
import { HomeStyles } from '../../styles/components/home';

const useStyles = makeStyles((theme) => ({
    button: {
        position: 'fixed',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: `linear-gradient(to right, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
        bottom: 5,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 10,
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
        position: 'fixed',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: `linear-gradient(to right, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
        bottom: 5,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: '5%',
        width: '90%',
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
}));

export default (props) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const fullScreen = useMediaQuery('@media (max-width: 768px)');
    const loadingAddress = useSelector(({ customer }) => customer.loadingAll);
    const loadingPlateLocal = useSelector(({ plates }) => plates.loadingPlate);

    /** Dialogs */
    const [dialogBranch, setDialogBranch] = useState(false);
    const [dialogAddress, setDialogAddress] = useState(false);
    const [dialogBasket, setDialogBasket] = useState(false);
    const [dialogOrde, setDialogOrde] = useState(false);

    const [platesLocal, setPlatesLocal] = useState(fromJS([]));
    const [total, setTotal] = useState(0);

    const [localBranch, setLocalBranch] = useState(null);

    useEffect(() => {

        async function fetch() {
            const verif = await dispatch(Actions.getAllAddress())
            if (verif) {
                const br = Actions.getLocalBranch()
                if (br) {
                    setLocalBranch(br)
                } else {
                    setDialogBranch(true)
                }
            }
        }
        fetch()
    }, [])

    useEffect(() => {
        async function fetch() {
            // Storage.get('59ec8efb0a964d6d0dd8fd297e7854b1/01529ec71c10622225a45657ca071656.png', { download: true, level: 'public' })
            // .then (result => {
            //     console.log('result aws', result.Body)
            //     const reader = new FileReader();
            //     reader.readAsDataURL(result.Body); 
            //     reader.onloadend = function() {
            //         const base64data = reader.result;                
            //         console.log('base64data', base64data);
            //     }
            // }) // {key: "test.txt"}
            // .catch(err => console.log('error:', err));
            const result = await dispatch(Actions.getPlateLocal())
            console.log('====', result)
            if (result) {
                let t = 0
                for (const iterator of result) {
                    t += (iterator.total + iterator.totalAdicional) * iterator.cant_plate
                }
                setTotal(t)
                setPlatesLocal(fromJS(result))
            }
        }
        fetch()
    }, [loadingPlateLocal])

    useEffect(() => {
        loadingAddress ? (
            dispatch(Actions.getAllAddress()) // params: user_id logueado
        ) : console.log('not loading')
    }, [loadingAddress]);

    const toggleBranch = () => setDialogBranch(!dialogBranch)
    const toggleAddress = () => setDialogAddress(!dialogAddress)
    const toggleBasket = () => setDialogBasket(!dialogBasket)
    const toggleOrde = () => setDialogOrde(!dialogOrde)

    const handleListItemClickBranch = br => () => {
        setDialogBranch(false)
        setLocalBranch(br.toJS())
        Actions.saveLocalBranch(br.toJS())
    }

    const handleClickItem = item => () => {
        navigate(`/app/producto/${item.get('pt_id')}`, { state: { item: item.toJS() } })
    }

    const cleanAll = () => {
        setDialogOrde(!dialogOrde)
        setDialogBasket(!dialogBasket)
    }

    return (
        <HomeStyles>
            <div style={{ backgroundColor: '#F6F5F5', marginBottom: 50 }}>
                <CssBaseline />
                <Header
                    {...props}
                    toggleBranch={toggleBranch}
                    toggleAddress={toggleAddress}
                    toggleBasket={toggleBasket}
                    localBranch={localBranch}
                    platesLocal={platesLocal}
                />
                {/* <div style={{ height: 250}} /> */}
                <div style={{ height: 300 }} />
                <RenderItem
                    {...props}
                    handleClickItem={handleClickItem}
                    localBranch={localBranch}
                />
            </div>
            {!dialogBasket && platesLocal.size > 0 ?
                <IconButton
                    aria-label="delete"
                    className={fullScreen ? classes.buttonSm : classes.button}
                    size="small"
                    onClick={toggleBasket}
                >
                    <p className='cant_plate'>{platesLocal.size}</p>
                    <p style={{ marginLeft: '10%' }}>Ver canasta</p>
                    <p>$ {priceFormat(total)}</p>
                </IconButton>
            : null}
            <DialogBranch
                open={dialogBranch}
                toggle={toggleBranch}
                handleListItemClick={handleListItemClickBranch}
            />
            <DialogAddress
                open={dialogAddress}
                toggle={toggleAddress}
            />
            <DialogOrde
                open={dialogOrde}
                toggle={toggleOrde}
                platesLocal={platesLocal}
                localBranch={localBranch}
                total={total}
                cleanAll={cleanAll}
            />
            <DialogBasket
                open={dialogBasket}
                toggle={toggleBasket}
                toggleOrde={toggleOrde}
                platesLocal={platesLocal}
                localBranch={localBranch}
                total={total}
            />
        </HomeStyles>
    );
}

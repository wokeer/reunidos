import React from 'react'
import {
    Dialog,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    InputBase,
    Toolbar,
    AppBar,
    Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import { fade, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { fromJS } from 'immutable';

import ImageIcon from '../imageIcon'
import dataCountries from "../../data/countries.json";

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
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
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
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
    },
    imageIcon: {
        height: 20,
        width: 20,
    },
    titleCode: {
        
    }
}));

export default (props) => {
    const { Transition, open, handleClose, handleListItemClick } = props;
    const classes = useStyles()
    const fullScreen = useMediaQuery('@media (max-width: 768px)');
    const countries = fromJS(dataCountries)
    const [data, setData] = React.useState(countries)
    const [value, setValue] = React.useState('')

    React.useEffect(() => {
        if (!open) {
            setValue('')
            setData(countries)
        }
    }, [open])
    
    const onChangeText = event => {
        setValue(event.target.value)
        setData(countries.filter((e) => e.get('country_name').toLowerCase().indexOf(value.toLowerCase()) > -1))
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
                        placeholder="Buscar país"
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
                            <ListItemAvatar>
                                <ImageIcon name='colombia' className={classes.imageIcon} />
                            </ListItemAvatar>
                            <ListItemText primary={e.get('country_name')} />
                            <Typography variant="body1" className={classes.titleCode}>
                                ({e.get('dialling_code')})
                            </Typography>
                        </ListItem>
                        <Divider />
                    </div>
                )}
            </List>
        </Dialog>
    )
}
import React from 'react';
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { fromJS } from 'immutable';
import { fade, makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import InstagramIcon from '@material-ui/icons/Instagram';
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link as LinkShare } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import { Link } from "react-scroll";

import ScrollMenu from 'react-horizontal-scrolling-menu';

/** import styles */
import { HomeStyles } from '../../styles/components/home';

/** import components */
import ImageBg from '../imageBg'
import Image from '../image'

/** import query hooks */
import { useQueryCategories } from '../../hooks/useQueryCategories'

const useStyles = makeStyles((theme) => ({
    appBar: {
      maxWidth: 360,
      right: 'inherit',
    },
    search: {
      position: 'relative',
    //   borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.50),
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
    logoImage: {
      height: 60,
      width: 60,
      borderRadius: 30,
      position: 'absolute',
      bottom: -30,
      left: 15,
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
    },
    itemHeader: {
        margin: 5,
        backgroundColor: 'white',
    },
    barInfo: {
        backgroundColor: 'white', 
        textAlign: 'center',
        height: 45, 
        width: '100%', 
        '& .title-text-1': {
            margin: 0,
            padding: 0,
            color: '#BDBDBD',
            fontWeight: 'bold',
        },
    },
    leftArrow: {
        position: 'absolute',
        borderColor: `${theme.palette.primary.main} transparent transparent ${theme.palette.primary.main}`,
        borderStyle: 'solid',
        borderWidth: '40px 40px 40px 40px',
        height: '80px',
        width: '80px',
        top: 0,
    },
    reunidos: {
        position: 'absolute',
        top: -20,
        bottom: 0,
        left: -35,
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        zIndex: 9999,
        transform: 'rotate(-45deg)',
    },
    iconCard: {
        position: 'absolute',
        top: 0,
        button: 0,
        right: 0,
        '& .MuiBadge-colorPrimary': {
            color: 'white'
        }
    },
    containerMenu: {
        '& div div .menu-wrapper--inner': {
            // backgroundColor: 'red',
        },
        '& .horizontal-menu .menu-wrapper .menu-wrapper--inner': {
            display: 'flex',
            alignItems: 'center',
        },
        '& a.active': {
            color: theme.palette.primary.main,
            // transition: 'width .3s',
            borderBottom: `1px ${theme.palette.primary.main} solid`,
        }
    }
}));

export default (props) => {
    const { 
        window, 
        toggleBranch, 
        toggleAddress, 
        toggleBasket,
        localBranch, 
        platesLocal,
    } = props;

    const classes = useStyles();
    const fullScreen = useMediaQuery('@media (max-width: 768px)');
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
    const catgData = useQueryCategories();

    const address = useSelector(({ customer }) => customer.data);
    const directions = !_.isEmpty(address) ? address.cliAddress.filter((d) => d.adr_principal === 1) : []

    const [data, setdata] = React.useState(fromJS([]))

    React.useEffect(() => {
        if (props.localBranch) {
            const newData = catgData.filter((e) => e.get('dcg_branch_office_id') === props.localBranch.rbo_id)
            if (newData.size > 0) {
                setdata(fromJS([{ dcg_name : 'Menú' }, ...newData]))
            } else {
                setdata(newData)
            }
        }
    }, [props.localBranch])
    
    const [selected, setSelected] = React.useState('Menú')
    // const selected = 'Menú'
    const [translateScroll, setTranslateScroll] = React.useState(-1)
    const MenuItem = ({ text, selected, index }) => {
        return (
            <Link
                activeClass="active"
                to={index === 0 ? catgData.getIn([0, 'dcg_name']) : text}
                spy={true}
                smooth={true}
                offset={index === 1 ? -400 : -180}
                duration={500}
                isDynamic={true}
                className={classes.itemHeader}
                // {...a11yProps(0)}
            >
                {/* {e.get('dcg_name')} */}
                {text}
            </Link>
        );
    };
    const Menu = (list, selected) => list.map((el, index) => {
        const { dcg_name } = el;
        return <MenuItem text={dcg_name} key={dcg_name} index={index} selected={selected} />
    });
    const menu = Menu(data.toJS(), selected);
    const onUpdate = (prop) => setTranslateScroll(prop.translate)

    const shared = () => {
        if (navigator.share) {
            navigator.share({
              title: 'Compartir este restaurante',
              text: 'Check out reunidos.co',
              url: 'https://web.dev/',
            })
              .then(() => console.log('Successful share'))
              .catch((error) => console.log('Error sharing', error));
          }
    }
    
    return (
        <HomeStyles>
            <div>
                <AppBar className={fullScreen ? null : classes.appBar} style={{ backgroundColor: 'white', }}>
                    <Toolbar style={{ padding: 0}}>
                        <div style={{ width: '100%' }}>
                            <ImageBg name='bg_1' className=''>
                                {!trigger ?
                                <div className={classes.barInfo}>
                                    <div className={classes.leftArrow}>
                                        <span className={classes.reunidos}>reunidos.co</span>
                                    </div>
                                    <p className='title-text-1'>ENTREGAR EN:</p>
                                    <Button
                                        size='small'
                                        style={{ fontWeight: 'bold', textTransform: 'none', margin: 0, paddingTop: 0, paddingBottom: 0 }}
                                        endIcon={<ArrowDropDownRoundedIcon />}
                                        onClick={toggleAddress}
                                    >
                                        {directions.length > 0 ? directions[0]['adr_address'] : 'selecciona una direccion' }
                                    </Button>
                                    <IconButton 
                                        className={classes.iconCard} 
                                        size='medium'
                                        onClick={toggleBasket}
                                    >
                                        <Badge badgeContent={platesLocal.size} color="primary">
                                            <ShoppingCartRoundedIcon color='primary' fontSize='small' />
                                        </Badge>
                                    </IconButton>
                                </div>
                                : null}
                                <div style={{ width: '100%', paddingTop: 30, paddingBottom: !trigger ? 0 : 30, display: 'flex', justifyContent: 'center' }}>
                                    <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                            <SearchIcon />
                                        </div>
                                        <InputBase
                                            placeholder="Buscar un producto"
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            inputProps={{ 'aria-label': 'search' }}
                                            // onChange={onChangeText}
                                            // value={value}
                                        />
                                    </div>
                                </div>
                                {!trigger ?
                                    <Image name='profile' className={classes.logoImage} />
                                : null}
                            </ImageBg>
                                <div>
                                    {!trigger ?
                                        <div style={{ padding: 5, width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                                            <LinkShare href="https://instagram.com/reunidos_co?igshid=j46i7eqdq1hi" color="inherit" target="_blank">
                                                <InstagramIcon  color='primary' style={{ marginRight: 5 }} />  
                                            </LinkShare>
                                            <LinkShare onClick={shared} color="inherit" component="button">
                                                <ShareRoundedIcon  style={{ marginRight: 5 }} />  
                                            </LinkShare>
                                        </div>
                                    : null}
                                    
                                    <Button
                                        style={{ fontWeight: 'bold' }}
                                        endIcon={<ArrowDropDownRoundedIcon />}
                                        onClick={toggleBranch}
                                    >
                                        {!localBranch ? 'Selecciona una sucursal' : localBranch.rbo_name}
                                    </Button>
                                    <div className={classes.containerMenu}>
                                        <ScrollMenu
                                            data={menu}
                                            // arrowLeft={<ArrowBackIosRoundedIcon color='primary' />}
                                            // arrowRight={<ArrowForwardIosRoundedIcon color='primary' />}
                                            selected={selected}
                                            translate={translateScroll}
                                            onUpdate={onUpdate}
                                            useButtonRole={true}
                                            hideArrows={true}
                                            hideSingleArrow={true}
                                            // onSelect={this.onSelect}
                                        />
                                    </div>
                                </div>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        </HomeStyles>
    );
}
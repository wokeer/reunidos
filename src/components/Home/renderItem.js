import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { fromJS } from 'immutable';

/** import utils */
import { createValue } from "../../utils/createValue"
import formatprice from "../../utils/priceFormat"

/** import query hooks */
import { useQueryCategories } from '../../hooks/useQueryCategories'
import { useQueryRestaurant } from '../../hooks/useQueryRestaurant'

/** import components */
import Image from '../image'
import ImageS3 from '../imageS3'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    listSection: {
        backgroundColor: 'inherit',
        display: 'flex',
        marginBottom: 0,
        width: '100%',
    },
    ul: {
        padding: 0,
        margin: 0,
        width: '100%',
    },
    header: {
        backgroundColor: 'white',
        color: 'black',
        fontWeight: 'bold',
        paddingLeft: '2.5%',
        paddingRight: '2.5%',
        marginBottom: 0,
    },
    item:  {
        paddingLeft: '2.5%',
    },
    imageProduct: {
        borderRadius: 4,
        marginRight: 5,
        maxHeight: 80,
        maxWidth: 80,
    },
    containerText: {
        margin: 0,
        padding: 0,
        '& .MuiTypography-body1': {
            lineHeight: 1,
        },
        '& .MuiTypography-body2': {
            lineHeight: 1,
        },
        '& .MuiListItemText-multiline': {
            marginTop: 1,
        }
    },
    containerText2: {
        '& .MuiTypography-body2': {
            marginTop: 4,
        }
    },
    badge: {
        backgroundColor: theme.palette.primary.main,
        margin: 0,
        fontSize: 10,
        fontWeight: 'bold',
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 5, 
        paddingRight: 5,
        borderRadius: 10,
        color: 'white',
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
    },
    subTitle: {
        margin: 0,
        padding: 0,
        fontSize: 12,
        color: '#848484',
    },
    containerPrice: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 14,
        '& .span-1-text': {
            color: 'black',
            fontWeight: 'bold',
        },
        '& .span-2-text': {
            color: '#848484',
            textDecoration: 'line-through',
        },
        '& .btnAdd': {
            backgroundColor: theme.palette.primary.main,
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: 8,
            paddingLeft: 8,
            borderRadius: 5,
            color: 'white',
            fontWeight: 'bold',
        }
    },
    noFound: {
        textAlign: 'center',
        margin: 0,
        padding: 20,

    }
}));

export default (props) => {
    const { handleClickItem, localBranch } = props;
    const classes = useStyles();
    const catgData = useQueryCategories();
    const branch = useQueryRestaurant()

    const [data, setdata] = React.useState(fromJS([]))

    React.useEffect(() => {
        if (props.localBranch) {
            const newData = catgData.filter((e) => e.get('dcg_branch_office_id') === props.localBranch.rbo_id)
            setdata(newData )
        }
    }, [props.localBranch])
    
    return (
        data.size !== 0 ?
            data.map((sectionId) => (
                <li key={`section-${sectionId}`} className={classes.listSection}>
                    <ul className={classes.ul}>
                        <ListSubheader id={sectionId.get('dcg_name')} className={classes.header}>{sectionId.get('dcg_name')}</ListSubheader>
                        {sectionId.get('plate').map((item) => (
                            <div key={`item-${sectionId}-${item.get('pt_name')}`}>
                                <Divider/>
                                <ListItem className={classes.item} alignItems="center" button onClick={handleClickItem(item)}>
                                    <ListItemAvatar>
                                        {item.get('pt_image') ? 
                                            <ImageS3 name={`${branch.get('rest_folder')}/${localBranch.rbo_folder}/${item.get('pt_image')}`} className={classes.imageProduct} />
                                        : 
                                            <Image name='rdPhProduct' className={classes.imageProduct}/>
                                        }
                                        
                                        {/* <Image name='rdPhProduct' className={classes.imageProduct}/> */}
                                    </ListItemAvatar>
                                    <ListItemText 
                                        className={classes.containerText}
                                        primary={
                                            <React.Fragment>
                                                <ListItemText
                                                    className={classes.containerText2}
                                                    primary={
                                                        item.get('pt_discount') > 0 ?
                                                            <span className={classes.badge}>-{item.get('pt_discount')} %</span>
                                                        : null
                                                        
                                                    } 
                                                    secondary={
                                                        <span className={classes.title}>{item.get('pt_name')}</span>
                                                    }
                                                />
                                            </React.Fragment>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <ListItemText
                                                    primary={
                                                        <span className={classes.subTitle}>{item.get('pt_description')}</span>
                                                    }
                                                    secondary={
                                                        <div className={classes.containerPrice}>
                                                            <span className='span-1-text'>
                                                                $ {item.get('pt_discount') > 0 ? createValue(item.toJS()) : formatprice(item.get('pt_price')) }
                                                            </span>
                                                            {item.get('pt_discount') > 0 ?
                                                                <span className='span-2-text'>$ {formatprice(item.get('pt_price'))}</span>
                                                            : null}
                                                            <div className='btnAdd'>Agregar</div>
                                                        </div>
                                                    }
                                                />
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            </div>
                        ))}
                    </ul>
                </li>
            ))
        : <p className={classes.noFound}>Por el momento no tenemos platos en esta sucursal...</p>
    )
}
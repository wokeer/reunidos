import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    item: {
        display: 'flex',
        marginTop: 1,
        marginBottom: 1,
        paddingLeft: '2.5%',
        paddingRight: '2.5%',
        borderBottom: '1px #f5f5f5 solid',
        width: '100%',
    },
    button: {
        color: 'black',
        minWidth: 35,
        textTransform: 'full-width',
        fontWeight: 'bold',
    },
}));

export default (props) =>  {
    const { item, section, handlerMinMax } = props
    const classes = useStyles()

    return (
        <div className={classes.item}>
            <ListItemText 
                primary={`${item.getIn(['proProduct', 'pro_name'])}`} 
                secondary={
                    section.get('pls_required') === 0 ?   
                    <span>$ {item.getIn(['proProduct', 'pro_price_add'])}</span>
                    : ''
                }
            />
            <div>
                <Button 
                    size="small" 
                    className={classes.button} 
                    onClick={handlerMinMax(item, section, 'min')}
                    disabled={item.get('value') === 0}
                >
                    -
                </Button>
                <span style={{ margin: 5 }}>{item.get('value')}</span>
                <Button 
                    size="small" 
                    className={classes.button} 
                    onClick={handlerMinMax(item, section, 'max')}
                    disabled={item.get('value') === item.get('plsp_max_products')}
                >
                    +
                </Button>
            </div>
        </div>
    );
}
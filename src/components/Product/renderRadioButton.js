import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded';
import RadioButtonCheckedRoundedIcon from '@material-ui/icons/RadioButtonCheckedRounded';

const useStyles = makeStyles((theme) => ({
    item: {
        display: 'flex',
        marginTop: 1,
        marginBottom: 1,
        paddingLeft: '2.5%',
        paddingRight: '2.5%',
        borderBottom: '1px #f5f5f5 solid',
        width: '100%',
    }
}));

export default (props) => {
    const { item, section, handlerRadioButton } = props
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
            <IconButton 
                aria-label="delete" 
                // className={classes.margin} 
                size="small"
                onClick={handlerRadioButton(item, section)}
            >
                {item.get('value') ?
                    <RadioButtonCheckedRoundedIcon />
                : <RadioButtonUncheckedRoundedIcon />}
            </IconButton>
        </div>
    );
}
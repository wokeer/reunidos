import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

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

const GreenCheckbox = withStyles({
    root: {
      color: '#a2aaad',
      '&$checked': {
        color: '#43484c',
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

export default (props) => {
    const { item, section, handlerCheckBox } = props
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
            <GreenCheckbox
                edge="end"
                checked={item.get('value')}
                onChange={handlerCheckBox(item, section)}
            />
        </div>
    );
}
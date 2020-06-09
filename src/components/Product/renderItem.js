import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import RenderOption from './renderOption'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'white',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    listSection: {
        backgroundColor: 'white',
        display: 'flex',
        marginBottom: 0,
        width: '100%',
    },
    ul: {
        padding: 0,
        margin: 0,
        width: '100%',
    },
    title: {
        backgroundColor: '#f5f5f5',
        color: 'black',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '2.5%',
        paddingRight: '2.5%',
    },
    containerBadge: {
        backgroundColor: '#bfbbba',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 10,
    },
    badge: {
        fontSize: 12,
        color: 'white',
        padding: 0,
        margin: 0,
    }
}));

export default (props) => {
    const { 
        data, 
        handlerRadioButton, 
        handlerCheckBox,
        handlerMinMax,
    } = props;
    const classes = useStyles();

    return (
        data.size !== 0 ? data.map((section, index) => (
            <li key={`section-${index}`} className={classes.listSection}>
                <ul className={classes.ul}>
                    <ListSubheader className={classes.title}>
                        <span>{section.getIn(['plaTypeSection', 'pts_name'])}</span>
                        {section.get('pls_required') === 1 ?
                            <div className={classes.containerBadge}>
                                <span className={classes.badge}>Obligatorio</span>
                            </div>
                            : null}
                    </ListSubheader>
                    {section.get('plaSectionProduct').map((item, index) => (
                        <RenderOption
                            handlerRadioButton={handlerRadioButton}
                            handlerCheckBox={handlerCheckBox}
                            handlerMinMax={handlerMinMax}
                            key={`itemSection-${index}`}
                            item={item}
                            section={section}
                        />
                    ))}
                </ul>
            </li>
        )) : <p>Este plato no tiene secciones</p>
    );
}

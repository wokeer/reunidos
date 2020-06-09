import React from 'react'

import RenderMinMax from './renderMinMax'
import RenderCheckBox from './renderCheckBox'
import RenderRadioButton from './renderRadioButton'

export default (props) => {
    const { section } = props
    /**
     * cuando sea pls_required, nunca lleva checkbox
     * si el maximo_producto = 1 entonces radio button
     * si es mayor a 1 min max
     */

    // Radio button obligatorio
    if (section.get('pls_required') === 1 && section.get('pls_selection') === 1) {
        return <RenderRadioButton {...props} />
    } else // Min - Max pls_required
        if (section.get('pls_required') === 1 && section.get('pls_selection') === 2 && section.get('pls_max_products') > 1) {
            return <RenderMinMax {...props} />
        } else // Radio button opcional
            if (section.get('pls_required') === 0 && section.get('pls_selection') === 1) {
                return <RenderRadioButton {...props} /> /* <RenderCheckBox {...props} /> */
            } else
                if (section.get('pls_required') === 0 && section.get('pls_selection') === 2 && section.get('pls_max_products') > 1 && section.get('checkBox')) {
                    return <RenderCheckBox {...props} />
                } else
                    if (section.get('pls_required') === 0 && section.get('pls_selection') === 2 && section.get('pls_max_products') > 1 && !section.get('checkBox')) {
                        return <RenderMinMax {...props} />
                    } else {
                        return (
                            <p>default</p>
                            // <ListItem
                            //     key={`item-${e.get('id_seccion')}-${item.get('plsp_id')}`}
                            //     className={classes.item}
                            // >
                            //     <ListItemText primary={`${item.getIn(['proProduct', 'pro_name'])}`} className={classes.itemText} />
                            // </ListItem>
                        )
                    }
}
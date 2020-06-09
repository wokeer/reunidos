import React, { useState, useEffect } from 'react';
import { fromJS } from 'immutable';
import { navigate } from 'gatsby';
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { createTotal } from '../../utils/createValue'
import priceFormat from '../../utils/priceFormat'

import * as Actions from '../../redux/actions'

/** import components */
import Header from './header'
import RenderItem from './renderItem'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    //   justifyContent: 'space-around',
    // backgroundColor: theme.palette.background,
    backgroundColor: 'white',
    // pointerEvents: 'none',
    height: '100vh',
  },
  containerAdd: {
    position: 'fixed',
    bottom: 0,
    zIndex: 99999,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTop: '1px black solid',
    paddingBottom: 10,
    width: 360,
  },
  containerAddSm: {
    position: 'fixed',
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 99999,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px black solid',
    paddingBottom: 10,
    width: '100%',
  },
  boxAdd: {
    display: 'flex',
    justifyContent: 'space-between',
    // backgroundColor: 'blue',
    paddingTop: 10,
    width: '100%',
  },
  btnAdd: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    textTransform: 'none',
    // margin: 0,
  },
  boxAddNumber: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    border: '1px solid',
    borderColor: '#aaaa',
    borderRadius: 20,
  }
}));

export default (props) => {
  const { location, history } = props;
  const state = location.state || (typeof history === 'object' && history.state);
  const classes = useStyles()
  const dispatch = useDispatch()
  const fullScreen = useMediaQuery('@media (max-width: 768px)');

  const [data, setData] = useState(fromJS([]))
  const [dataHanled, setDataHanled] = useState(fromJS({}))

  useEffect(() => {
    if (state) {
      const transforItem = fromJS({
        ...state.item,
        cant_plate: 1, 
        text_comments: '', 
        total: createTotal({ pt_price: state.item.pt_price, pt_discount: state.item.pt_discount }),
        totalAdicional: 0,
      })

      const mapSect = transforItem.get('plaSection').size !== 0 ? transforItem.get('plaSection').map((e) => {
        let count = true
        const newP = e.get('plaSectionProduct').map((r) => {
          if (r.get('plsp_max_products') > 1) {
            count = false
          }
          return r
        })
        const setc = e.set('checkBox', count)
        return setc.set('plaSectionProduct', newP)
      }) : fromJS([])

      const newSection = mapSect.size !== 0 ? mapSect.map((e) => {
        const newP = e.get('plaSectionProduct').map((r) => {
          if (e.get('pls_required') === 1 && e.get('pls_selection') === 1) {
            return r.set('value', false)
          } else if (e.get('pls_required') === 1 && e.get('pls_selection') === 2 && e.get('pls_max_products') > 1) {
            return r.set('value', 0)
          } else if (e.get('pls_required') === 0 && e.get('pls_selection') === 1) {
            return r.set('value', false)
          } else if (e.get('pls_required') === 0 && e.get('pls_selection') === 2 && e.get('pls_max_products') > 1 && e.get('checkBox')) {
            return r.set('value', false)
          } else if (e.get('pls_required') === 0 && e.get('pls_selection') === 2 && e.get('pls_max_products') > 1 && !e.get('checkBox')) {
            return r.set('value', 0)
          } else {
            return r.set('value', false)
          }
        })
        return e.set('plaSectionProduct', newP)
      }) : fromJS([])
      setData(newSection)
      setDataHanled(transforItem)
    }
  }, [state])

  const setHanledData = (d) => {
    const rt = d.filter((e) => e.get('pls_required') === 0)
    let priceT = 0
    rt.map((e) => {
      e.get('plaSectionProduct').map((r) => {
        if (e.get('pls_required') === 0 && e.get('pls_selection') === 1) {
          if (r.get('value') === true) {
            priceT += r.getIn(['proProduct', 'pro_price_add'])
          }     
        } else if (e.get('pls_required') === 0 && e.get('pls_selection') === 2 && e.get('pls_max_products') > 1 && e.get('checkBox')) {
          if (r.get('value') === true) {
            priceT += r.getIn(['proProduct', 'pro_price_add'])
          }
        } else if (e.get('pls_required') === 0 && e.get('pls_selection') === 2 && e.get('pls_max_products') > 1 && !e.get('checkBox')) {
          if (r.get('value') !== 0) {
            priceT += (r.get('value') * r.getIn(['proProduct', 'pro_price_add']))
          }
        }
      })
    })
    const newData = dataHanled.set('plaSection', d)
    const setTotal = newData.set('totalAdicional', priceT)
    setDataHanled(setTotal)
  }

  const handlerRadioButton = (item, section) => () => {
    const indexSection = data.findIndex((s) => s.get('pls_id') === section.get('pls_id'))
    const setProducts = section.get('plaSectionProduct').map((u) => {
      if (u.get('plsp_id') === item.get('plsp_id')) {
        return u.set('value', !u.get('value'))
      } else {
        return u.set('value', false)
      }
    })
    const updateSection = section.set('plaSectionProduct', setProducts)
    const setDataJS = data.set(indexSection, updateSection)
    setData(setDataJS)
    setHanledData(setDataJS)
  }

  const handlerCheckBox = (item, section) => () => {
    const cant_item_select = section.get('plaSectionProduct').filter((e) => e.get('value') === true)
    if (item.get('value')) {
      const indexSection = data.findIndex((s) => s.get('pls_id') === section.get('pls_id'))
      const indexItem = section.get('plaSectionProduct').findIndex((i) => i.get('plsp_id') === item.get('plsp_id'))
      const updateSection = section.setIn(['plaSectionProduct', indexItem, 'value'], !item.get('value'))
      const setDataJS = data.set(indexSection, updateSection)
      setData(setDataJS)
      setHanledData(setDataJS)
    } else {
      if (cant_item_select.size < section.get('pls_max_products')) {
        const indexSection = data.findIndex((s) => s.get('pls_id') === section.get('pls_id'))
        const indexItem = section.get('plaSectionProduct').findIndex((i) => i.get('plsp_id') === item.get('plsp_id'))
        const updateSection = section.setIn(['plaSectionProduct', indexItem, 'value'], !item.get('value'))
        const setDataJS = data.set(indexSection, updateSection)
        setData(setDataJS)
        setHanledData(setDataJS)
      }
    }
  }

  const handlerMinMax = (item, section, type) => () => {
    if (type === 'min') {
      const indexSection = data.findIndex((s) => s.get('pls_id') === section.get('pls_id'))
      const indexItem = section.get('plaSectionProduct').findIndex((i) => i.get('plsp_id') === item.get('plsp_id'))
      const newValue = type === 'min' ? item.get('value') - 1 : item.get('value') + 1
      const updateSection = section.setIn(['plaSectionProduct', indexItem, 'value'], newValue)
      const setDataJS = data.set(indexSection, updateSection)
      setData(setDataJS)
      setHanledData(setDataJS)
    } else {
      let count_products = 0
      section.get('plaSectionProduct').map((e) => { count_products += e.get('value') })
      if (count_products < section.get('pls_max_products')) {
        const indexSection = data.findIndex((s) => s.get('pls_id') === section.get('pls_id'))
        const indexItem = section.get('plaSectionProduct').findIndex((i) => i.get('plsp_id') === item.get('plsp_id'))
        const newValue = type === 'min' ? item.get('value') - 1 : item.get('value') + 1
        const updateSection = section.setIn(['plaSectionProduct', indexItem, 'value'], newValue)
        const setDataJS = data.set(indexSection, updateSection)
        setData(setDataJS)
        setHanledData(setDataJS)
      }
    }
  }

  const hanledItem = (type) => () => {
    if (type === 'add') {
      const setCant = dataHanled.set('cant_plate', dataHanled.get('cant_plate') + 1)
      setDataHanled(setCant)
    } else {
      if (dataHanled.get('cant_plate') > 1) {
        const setCant = dataHanled.set('cant_plate', dataHanled.get('cant_plate') - 1)
        setDataHanled(setCant)
      } 
    }
  }

  const addToCard = async () => {
    const rows = dataHanled.get('plaSection').filter((e) => e.get('pls_required') === 1)
    const verify = rows.map((e) => {
      let verf = false
      const verif = e.get('plaSectionProduct').map((r) => {
        if (r.get('value')) {
          if (e.get('pls_required') === 1 && e.get('pls_selection') === 1) {
            if (r.get('value') === true) {
              verf = true
            }
            return r
          } else if (e.get('pls_required') === 1 && e.get('pls_selection') === 2 && e.get('pls_max_products') > 1) {
            if (r.get('value') !== 0) {
              verf = true
            }
            return r
          } else if (e.get('pls_required') === 0 && e.get('pls_selection') === 1) {
            if (r.get('value') === true) {
              verf = true
            }
            return r        
          } else if (e.get('pls_required') === 0 && e.get('pls_selection') === 2 && e.get('pls_max_products') > 1 && e.get('checkBox')) {
            if (r.get('value') === true) {
              verf = true
            }
            return r
          } else if (e.get('pls_required') === 0 && e.get('pls_selection') === 2 && e.get('pls_max_products') > 1 && !e.get('checkBox')) {
            if (r.get('value') !== 0) {
              verf = true
            }
            return r
          }
        } else {
          return r
        }
      })
      const y = e.set('verify', verf)
      return y.set('plaSectionProduct', verif)
    })
    const count_verify = verify.filter((e) => !e.get('verify'))
    if (count_verify.size > 0) {
      dispatch(Actions.showMessage({ message: '¡Llene los campo obligatorios!',  variant: 'error' }))
    } else {
      await dispatch(Actions.setPlateLocal(dataHanled.toJS()))
      await dispatch(Actions.showMessage({ message: '¡Se agrego con al carrito de comprar!',  variant: 'success' }))
      await navigate('/app/home')
    }
  }

  const onChangeText = event => {
    const newData = dataHanled.set('text_comments', event.target.value)
    setDataHanled(newData)
  }

  return (
    <div className={classes.root}>
        <Header {...props} state={state} />
        <div style={{ marginBottom: 100, width: '100%' }}>
          {data.size !== 0 ?
            <RenderItem
              data={data}
              handlerRadioButton={handlerRadioButton}
              handlerCheckBox={handlerCheckBox}
              handlerMinMax={handlerMinMax}
            />
          : null}
          <TextField 
            id="outlined-basic" 
            label="Comentarios o instrucciones" 
            variant="outlined" 
            size='small'
            fullWidth
            onChange={onChangeText}
            value={dataHanled.get('text_comments')}
            style={{ marginTop: 20 }}
          />
        </div>
        <div className={fullScreen ? classes.containerAddSm : classes.containerAdd}>
          <div className={classes.boxAdd}>
            <div className={classes.boxAddNumber}>
              <Button 
                size="small" 
                className={classes.button} 
                onClick={hanledItem('remove')}
                disabled={dataHanled.get('cant_plate') === 1}
              >
                -
              </Button>
              <span style={{ margin: 5 }}>{dataHanled.get('cant_plate')}</span>
              <Button 
                size="small" 
                className={classes.button} 
                onClick={hanledItem('add')}
              >
                +
              </Button>
            </div>
            <Button 
              variant="contained" 
              className={classes.btnAdd} 
              size='small'
              onClick={addToCard}
            >
              Agregar $ {priceFormat((dataHanled.get('total') * dataHanled.get('cant_plate') + dataHanled.get('totalAdicional')))}
            </Button>
          </div>
        </div>
    </div>
  );
}
import axios from "axios"
import API from "../../utils/api"
import { showMessage } from './message.actions'
import { getAccessToken } from '../actions';

export const GET_PLATE_LOADING = '[PLATES_LOADING APP] PLATES LOADING';
export const GET_PLATE_ALL = "[GET_PLATE_ALL APP] GET GET_PLATE_ALL"
export const GET_PLATE_ID = "[PLATE_ID APP] GET PLATE ID"
export const GET_PLATE_CATEGORY_ID = "[PLATE_CATEGORY_ID APP] GET PLATE CATEGORY ID"
export const LOADING_PLATE = "[LOADING_PLATE APP] LOADING PLATE"

const isBrowser = typeof window !== `undefined`

export function getPlateAll(params) {

  const URL = `${API.baseUrl}${API.endpoints.plate}/all/${params}`
  const request = axios.get(URL, getAccessToken())

  return dispatch => {
    dispatch({ type: GET_PLATE_LOADING })
    request
      .then(response => {
        console.log('responseAll', response.data)
        dispatch({
          type: GET_PLATE_ALL,
          payload: response.data,
        })
      })
      .catch(error => {
        dispatch({ type: GET_PLATE_LOADING })
        // console.log("Error get", error)
        dispatch(showMessage({ message: 'Error de conexión', variant: 'warning' }));
      })
  }
}
export function getPlateId(params) {

  const URL = `${API.baseUrl}${API.endpoints.plate}/${params}`
  const request = axios.get(URL, getAccessToken())

  return dispatch =>
    request
      .then(response => {
        // console.log('response', response.data)
        dispatch({
          type: GET_PLATE_ID,
          payload: response.data,
        })
      })
      .catch(error => {
        // console.log("Error get", error)
        dispatch(showMessage({ message: 'Error de conexión', variant: 'warning' }));
      })
}
export function getPlateCateOffice(cate, office) {
  const params ={
     cate,
     office
  }
  const URL = `${API.baseUrl}${API.endpoints.plate}/cateOffice`
  const request = axios.get(URL, { ...getAccessToken(), params })

  return dispatch => {
    dispatch({ type: GET_PLATE_LOADING })

    return request
      .then(response => {
        // console.log('response', response.data)
        // dispatch({
        //   type: GET_PLATE_CATEGORY_ID,
        //   payload: response.data,
        // })
        dispatch({
          type: GET_PLATE_ALL,
          payload: response.data,
        })
      })
      .catch(error => {
        // console.log("Error get", error)
        dispatch({ type: GET_PLATE_LOADING })
        dispatch(showMessage({ message: 'Error de conexión', variant: 'warning' }));
      })
  }
}

export function setPlateLocal(data) {
  return async dispatch => {
    if (!isBrowser) return false
    dispatch({ type: LOADING_PLATE })
    const result = getPlate()
    if (result) {
      const addData = await result.concat({ ...data, UUII: S4() + S4() })
      await window.localStorage.setItem('card', JSON.stringify(addData))
      dispatch({ type: LOADING_PLATE })
    } else {
      await window.localStorage.setItem('card', JSON.stringify([{ ...data, UUII: S4() + S4() }]))
      dispatch({ type: LOADING_PLATE })
    }
  }
}

export function setPlateById(data) {
  return async dispatch => {
    if (!isBrowser) return false
    dispatch({ type: LOADING_PLATE })
    await window.localStorage.setItem('card', JSON.stringify(data))
    dispatch({ type: LOADING_PLATE })
  }
}

export function getPlateLocal(data) {
  return async dispatch => {
    if (!isBrowser) return false
    const result = getPlate()
    if (result) {
      return result
    }
    return false
  }
}

const getPlate = () => JSON.parse(window.localStorage.getItem('card'))

function S4(){
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

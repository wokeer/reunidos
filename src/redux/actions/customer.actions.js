import axios from "axios"
import API from "../../utils/api"
import { getAccessToken, showMessage, logoutUser } from '.';

export const GET_ADDRESS = "[CUSTOMER ADDRESS_GET APP] GET"
export const SAVE_ADDRESS = '[CUSTOMER ADDRESS_SAVE APP] SAVE';
export const UPDATE_ADDRESS = '[CUSTOMER ADDRESS_UPDATE APP] UPDATE';
export const UPDATE_PRINCIPAL_ADDRESS = '[CUSTOMER PRINCIPAL_ADDRESS_UPDATE APP] UPDATE';
export const DELETE_ADDRESS = 'SET CUSTOMER ADDRESS DELETE';
export const GET_LOADING = '[CUSTOMER LOADING APP] ADDRESS LOADING';

export function getAllAddress() {

  const URL = `${API.baseUrl}${API.endpoints.customers}/address`
  const request = axios.get(URL, getAccessToken())

  return dispatch =>
    request
      .then(response => {
        // console.log('response', response.data)
        dispatch({
          type: GET_ADDRESS,
          payload: response.data,
        })
        return true
      })
      .catch(error => {
        // console.log("Error get andress", error.request.status)
        if (error.request.status === 401) {
          logoutUser()
          dispatch(showMessage({ message: 'Su sesión caduco', variant: 'warning' }));
        } else {
          dispatch(showMessage({ message: 'Error de conexión', variant: 'error' }));
        }
        return false
      })
}

export function saveAddress(data) {
  const body = {
    direction: data,
  };
  const URL = `${API.baseUrl}${API.endpoints.customers}/address`
  const request = axios.post(URL, body, getAccessToken());
  return (dispatch) =>
      request.then((response) => {
          // console.log('response create departament', response)
          dispatch(showMessage({ message: 'Direccion creada con éxito!',  variant: 'success' }));

          dispatch({
              type: SAVE_ADDRESS,
              payload: null
          })
          return dispatch({ type: GET_LOADING })
      }
      ).catch(error => {
          // console.log('Error save city', error)
          dispatch(showMessage({ message: 'Error de conexión' , variant: 'error'}));
      });
}
export function editAddress(id, data) {
  const body = {
    direction: data,
  };
  const URL = `${API.baseUrl}${API.endpoints.customers}/address/${id}`
  const request = axios.put(URL, body, getAccessToken());
  return (dispatch) =>
      request.then((response) => {
          // console.log('response create departament', response)
          dispatch(showMessage({ message: 'Direccion editada con éxito!',  variant: 'success' }));

          dispatch({
              type: UPDATE_ADDRESS,
              payload: null
          })
          return dispatch({ type: GET_LOADING })
      }
      ).catch(error => {
          // console.log('Error save city', error)
          dispatch(showMessage({ message: 'Error de conexión' , variant: 'warning'}));
      });
}
export function deleteAddress(id) {
    const URL = `${API.baseUrl}${API.endpoints.customers}/address/${id}`
    const request = axios.delete(URL, getAccessToken());

    return (dispatch) =>
        request.then((response) => {
            // console.log(response.data)
            dispatch(showMessage({ message: '¡Direccion eliminado con éxito!', variant: 'success' }));
            // dispatch(getServices(10, 1, {}))
            dispatch({ type: DELETE_ADDRESS })
            dispatch({ type: GET_LOADING })
            dispatch({ type: GET_LOADING })

        }).catch(error => {
            // console.log(error,'Error delete')
            dispatch(showMessage({ message: 'Error de conexión' , variant: 'warning'}));
        });
}


export function principalAddress(id) {
  const body = {
    principal: 1
  };
  const URL = `${API.baseUrl}${API.endpoints.customers}/address/principal/${id}`
  const request = axios.put(URL, body, getAccessToken());
  return (dispatch) =>
      request.then((response) => {
          // console.log('response update departament', response)
          dispatch(showMessage({ message: '¡Direccion principal cambio!', variant: 'success' }));

          dispatch({
              type: UPDATE_PRINCIPAL_ADDRESS,
              payload: null
          })
          return dispatch({ type: GET_LOADING })
      }
      ).catch(error => {
          // console.log('Error update city', error)
          dispatch(showMessage({ message: 'Error de conexión', variant: 'warning' }));
      });
}
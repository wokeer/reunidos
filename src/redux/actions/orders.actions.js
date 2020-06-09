import axios from "axios"
import API from "../../utils/api"
import { showMessage } from './message.actions'
import { getAccessToken, setPlateById } from '../actions';

export const LOADING_ORDERS = '[LOADING_ORDERS APP] LOADING LOADING';

const isBrowser = typeof window !== `undefined`

export function createOrders(data) {
    const URL = `${API.baseUrl}${API.endpoints.orders}`
    const request = axios.post(URL, data, getAccessToken());
    return async (dispatch) => {
        dispatch({ type: LOADING_ORDERS })
        return request.then(async (response) => {
            // console.log('response', response)
            dispatch(setPlateById([]))
            dispatch({ type: LOADING_ORDERS })
            return response.data
        }).catch(error => {
            dispatch({ type: LOADING_ORDERS })
            if (error.request.status === 401) {
                console.log('Error post orders', error)
                dispatch(showMessage({ message: 'Error al crear la orden' , variant: 'error' }));
                return null
            } else {
                dispatch(showMessage({ message: 'Error de conexión', variant: 'error' }));
            }
            return false
        });
    }
}
import axios from 'axios'
import API from '../../utils/api'
import { getAccessToken, showMessage } from '../actions'

export const GET_CITY_DATA = '[USER APP] GET CITY';
export const GET_CITY_LOADING = '[USER APP] GET CITY LOADING';

export function getCities(text) {
    const URL = `${API.baseUrl}${API.endpoints.citiesAll}/${text}`
    // const URL = `${API.baseUrl}${API.endpoints.cities}`
    const request = axios.get(URL, getAccessToken());
    return async (dispatch) => {
        request.then((response) => {
            console.log('response', response.data)
            dispatch({
                type: GET_CITY_DATA,
                payload: response.data
            })
        }).catch(error => {
            console.log('Error post cities', error)
            dispatch(showMessage({ message: 'Error al traer las ciudades' , variant: 'error' }));
        });
    }
}

export function updateCustomer(data, id) {
    const URL = `${API.baseUrl}${API.endpoints.customersUpdate}/${id}`
    const request = axios.put(URL, data, getAccessToken());
    return async (dispatch) => {
        return request.then((response) => {
            console.log('response', response.data)
            const user = JSON.parse(window.localStorage.getItem('user'))
            const customer = user.customers.map((e) => ({ ...e, cli_name: response.data.cli_name }))
            const newUser = { ...user, customers: customer }
            localStorage.setItem('user', JSON.stringify(newUser))
            dispatch({
                type: 'USER APP] GET USER',
                payload: newUser,
            })
            return 'success'
        }).catch(error => {
            console.log('Error post cities', error)
            dispatch(showMessage({ message: 'Error al actualizar datos' , variant: 'error' }));
            return null
        });
    }
}
import axios from 'axios'
import API from '../../utils/api';
import { showMessage } from './message.actions';
import { navigate } from "gatsby"

export const GET_USER_DATA = '[USER APP] GET USER';
export const GET_USER_LOADING = '[USER APP] GET USER LOADING';
export const USER_LOADING_SEND_CODE = '[USER APP] USER LOADING SEND CODE';

const isBrowser = typeof window !== `undefined`

export function sendCode(body) {
  if (!isBrowser) return false
  return async (dispatch) => {
    dispatch({ type: USER_LOADING_SEND_CODE })
    const URL = `${API.baseUrl}${API.endpoints.sendCode}`
    try {
      const request = await axios.post(URL, body);
      console.log('request', request)
      if (request.status === 200) {
        dispatch({ type: USER_LOADING_SEND_CODE })
        return true
      }
    } catch (error) {
      dispatch({ type: USER_LOADING_SEND_CODE })
      if (error.request.status === 500) {
        dispatch(showMessage({ message: 'Error al enviar código' , variant: 'error' }));
      } else {
        dispatch(showMessage({ message: 'Error de conexión' , variant: 'error' }));
      }
    }
  }
}

export function auth(body) {
  if (!isBrowser) return false
  return async (dispatch) => {
    dispatch({ type: GET_USER_LOADING })
    const URL = `${API.baseUrl}${API.endpoints.auth}`
    try {
      const request = await axios.post(URL, body);
      console.log('request', request)
      if (request.status === 200) {
        dispatch({
          type: GET_USER_DATA,
          payload: request.data.auth_info.user
        })
        setSession(request.data.auth_info.access_token)
        setDataUser(request.data.auth_info.user)
        dispatch({ type: GET_USER_LOADING })
        dispatch(showMessage({ message: 'Bienvenido' , variant: 'success' }));
        return request.data.auth_info.user
      }
      return false
    } catch (error) {
      console.log('Error post user', error.request.status)
      dispatch({ type: GET_USER_LOADING })
      if (error.request.status === 401) {
          dispatch(showMessage({ message: 'Código invalido' , variant: 'error' }));
      } else {
          dispatch(showMessage({ message: 'Error de conexión' , variant: 'error' }));
      }
    }
  }
}

export const getAccessToken = () => {
    const token = window.localStorage.getItem('jwt_access_token');
    return { 
        headers: { 
            Authorization: 'Bearer ' + token,
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json;charset=UTF-8',
        } 
    }
};

export const isLoggedIn = () => {
  return (dispatch) => {
    if (!isBrowser) return false
    const user = getUser()
    const access_token = getToken()
    if (access_token) {
        dispatch({
            type: GET_USER_DATA,
            payload: user
        })
        return user
    }
    return null
  }
}

export const logout = callback => {
  if (!isBrowser) return

  console.log(`Ensuring the \`gatsbyUser\` property exists.`)
  callback()
}

const getUser = () => JSON.parse(window.localStorage.getItem('user'))
const getToken = () => window.localStorage.getItem('jwt_access_token')
const setSession = access_token => {
  if ( access_token ) {
    window.localStorage.setItem('jwt_access_token', access_token);
  } else {
    window.localStorage.removeItem('jwt_access_token');
  }
};
const setDataUser = user => window.localStorage.setItem('user', JSON.stringify(user))

export const logoutUser = () => {
  if (!isBrowser) return false
  window.localStorage.removeItem('jwt_access_token');
  window.localStorage.removeItem('user');
  window.localStorage.removeItem('card');
  navigate('/app/login')
}
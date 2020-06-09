import axios from "axios"
import API from "../../utils/api"
import { getAccessToken } from '.';

export const GET_BRANCH_OFFICE_ID = "[BRANCH_OFFICE_ID APP] GET BRANCH_OFFICE ID"
export const GET_BRANCH_OFFICE_RESTAURANT_ID = "[BRANCH_OFFICE_RESTAURANT_ID APP] GET BRANCH_OFFICE_RESTAURANT ID"

export function getBranchOfficeId(params) {

  const URL = `${API.baseUrl}${API.endpoints.res_branch_office}/${params}`
  const request = axios.get(URL, getAccessToken())

  return dispatch =>
    request
      .then(response => {
        // console.log('response Api', response.data)
        dispatch({
          type: GET_BRANCH_OFFICE_ID,
          payload: response.data,
        })
      })
      .catch(error => {
        console.log("Error get", error)
        // dispatch(showMessage({ message: 'Error de conexión', variant: 'warning' }));
      })
}
export function getAllBranchByResta(params) {

  const URL = `${API.baseUrl}${API.endpoints.res_branch_office}/all/${params}`
  const request = axios.get(URL, getAccessToken())

  return dispatch =>
    request
      .then(response => {
        // console.log('response Api', response.data)
        dispatch({
          type: GET_BRANCH_OFFICE_RESTAURANT_ID,
          payload: response.data,
        })
      })
      .catch(error => {
        console.log("Error get", error)
        // dispatch(showMessage({ message: 'Error de conexión', variant: 'warning' }));
      })
}

export function saveLocalBranch(br) {
  if (br) {
    window.localStorage.setItem('branch', JSON.stringify(br));
  }
}

export function getLocalBranch() {
  const br = getBranch()
  if(br) {
    return br
  } else {
    return false
  }
}
const getBranch = () => JSON.parse(window.localStorage.getItem('branch'))

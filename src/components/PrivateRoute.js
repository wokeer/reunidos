import React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import { useDispatch } from 'react-redux'
import { isLoggedIn } from "../redux/actions"

const PrivateRoute = ({ component: Component, location, history, ...rest }) => {
  const dispatch = useDispatch()
  if (!dispatch(isLoggedIn()) && location.pathname !== `/app/login`) {
    navigate(`/app/login`)
    return null
  }
  // localStorage.removeItem('jwt_access_token')
  // localStorage.removeItem('user')
  // localStorage.removeItem('card')
  return <Component {...rest} location={location} history={history} />
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default PrivateRoute
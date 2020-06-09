import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import Image from "../image"
import { isLoggedIn } from "../../redux/actions"
import { navigate } from "gatsby"
import { Splash } from '../../styles/components/splash'
// import { Storage } from 'aws-amplify';

export default () => {
  const dispatch = useDispatch()
  useEffect(() => {
    // Storage.put('test3333.txt', 'Hello')
    // .then (result => console.log('result aws', result)) // {key: "test.txt"}
    // .catch(err => console.log('error:', err));
    const result = dispatch(isLoggedIn())
    console.log('result', result)
    if (result) {
      if (!result.customers[0].cli_name) {
        navigate('/app/register')
      } else {
        navigate('/app/home')
      }
    } else {
      navigate('/app/login')
    }
  })
  return (
    <Splash>
      <div id='splash-reunidos'>
        <div className='logo-splash'>
          <Image name="logoDark" />
        </div>
        <div className="spinner-wrapper">
          <div className="spinner">
            <div className="inner">
              <div className="gap" />
              <div className="left">
                <div className="half-circle" />
              </div>
              <div className="right">
                <div className="half-circle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Splash>
  );
}

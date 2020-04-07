import React, {useContext, useEffect, useState} from 'react'
import {Redirect} from "react-router-dom"

import useFetch from "../../hooks/useFetch"
import {CurrentUserContext} from "../../context/curentUser/currentUserContext"
import BackendErrorMessages from "../../components/BackendErrorMessages"
import {LOGOUT, SET_AUTHORIZED} from "../../context/types"
import useLocalStorage from "../../hooks/useLocalStorage"


const Settings = () => {
  const [currentUserState, dispatch] = useContext(CurrentUserContext)
  const apiUrl = '/user'
  const [{response, error, isLoading}, doFetch] = useFetch(apiUrl)
  const [image, setImage] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [, setToken] = useLocalStorage('token')
  const [isSuccessfullLogout, setIsSuccessfullLogout] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    doFetch({
      method: 'put',
      data: {
        user: {
          ...currentUserState,
          image,
          username,
          bio,
          email,
          password
        }
      }
    })
  }

  const logout = event => {
    event.preventDefault()
    setToken('')
    dispatch({
      type: LOGOUT
    })
    setIsSuccessfullLogout(true)
  }

  useEffect(() => {
    if (!currentUserState.currentUser) {
      return
    }
    setImage(currentUserState.currentUser.image)
    setUsername(currentUserState.currentUser.username)
    setBio(currentUserState.currentUser.bio)
    setEmail(currentUserState.currentUser.email)
  }, [currentUserState.currentUser])

  useEffect(() => {
    if(!response){
      return
    }
    dispatch({
      type: SET_AUTHORIZED,
      payload: response.user
    })
  }, [response, dispatch])

  if(isSuccessfullLogout){
    return <Redirect to={'/'}/>
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your settings</h1>
            {error && (<BackendErrorMessages backendErrors={error.errors}/>)}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Url of profile pictures"
                    value={image || ''}
                    onChange={e => setImage(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows="6"
                    placeholder="Bio"
                    value={bio || ''}
                    onChange={e => setBio(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </fieldset>
                {isLoading && (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>)}
                <button
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Update info
                </button>
              </fieldset>
            </form>
            <hr/>
            <button
              className="btn btn-outline-danger"
              onClick={logout}
            >Or click here to logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
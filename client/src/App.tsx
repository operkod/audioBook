import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Home, Auth, Profile } from 'page'
import { AudioPlayer, Modal } from './components'
import { StateType } from 'redux/reducer'

import './style/App.scss'
import { getUserProfile } from 'redux/action/user'

const App = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector((state: StateType) => state.user.isAuth)
  const isAudio = useSelector((state: StateType) => state.audio.id)
  console.log("render - App")
  React.useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])
  return (
    <div className="wrapper">
      <Switch>
        <Route
          exact
          path={['/signin', '/signup']}
          render={() => (isAuth ? <Redirect to="/" /> : <Auth />)}
        />
        <Route exact path={"/profile"} component={Profile} />
        <Route path="/" component={Home} />
      </Switch>
      {!!isAudio && <AudioPlayer />}
      <Modal />
    </div>
  )
}

export default App

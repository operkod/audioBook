import { Switch, Redirect, Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import routers from 'const/routers'
import { AudioPlayer } from 'components'
import { useSelector } from 'react-redux'
import { getAudioId, getAuth } from 'redux/selectors'
import PublicRoute from './PublicRoute'
import { Signin, Signup, Profile, Home } from 'page'

const AppRouters = () => {
  const isAuth = useSelector(getAuth)
  const isAudio = useSelector(getAudioId)
  return <Router>
    <div className="wrapper">
      <Switch>
        <Route exact path={routers.getSignin()} component={Signin} />
        <Route exact path={routers.getSignin()} component={Signup} />
        <PrivateRoute exact path={routers.getProfile()} component={Profile} />
        <Route path={routers.getBase()} component={Home} />
        <Route path="*">
          <Redirect to={routers.getBase()} />
        </Route>
      </Switch>
      {!!isAudio && <AudioPlayer />}
    </div>
  </Router>
}

export default AppRouters

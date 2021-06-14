import { Switch, Redirect, Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import routers from 'const/routers'
import { AudioPlayer } from 'components'
import { useSelector } from 'react-redux'
import { getAudioId, getCommentsShow } from 'redux/selectors'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import { Signin, Signup, Profile, Home, AddBook } from 'page'
import Modal from 'components/Modal'
import Header from 'components/Header'

const AppRouters = () => {
  const isAudio = useSelector(getAudioId)
  const showModal = useSelector(getCommentsShow)
  return <Router>
    <div className="wrapper">
      <Header />
      <Switch>
        <PublicRoute exact path={routers.getSignin()} component={Signin} />
        <PublicRoute exact path={routers.getSignup()} component={Signup} />
        <PrivateRoute exact path={routers.getAddBook()} component={AddBook} />
        <PrivateRoute exact path={routers.getProfile()} component={Profile} />
        <Route path={routers.getBase()} component={Home} />
        <Route path="*">
          <Redirect to={routers.getBase()} />
        </Route>
      </Switch>
      {!!isAudio && <AudioPlayer />}
      {showModal && <Modal />}
    </div>
  </Router>
}

export default AppRouters

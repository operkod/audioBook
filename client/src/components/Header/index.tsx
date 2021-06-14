import './Header.scss'
import { Input } from 'antd'
import { Menu } from 'components'
import { Link, useHistory } from 'react-router-dom'
import { getSearchValue } from 'redux/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { Actions } from 'redux/action/books'

import logoIcon from 'assets/img/logo.svg'
import routers from 'const/routers'

const { Search } = Input

const Header = () => {
  const history = useHistory()
  const value = useSelector(getSearchValue)
  const dispatch = useDispatch()
  const handleSearch = (value: string) => {
    dispatch(Actions.requestBook({ search: value }))
    history.push(routers.getBase())
  }
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-content__logo">
            <Link to={routers.getBase()}><img src={logoIcon} alt="Books" /></Link>
          </div>
          <div className="search">
            <Search
              placeholder="Название книги или афтора"
              onSearch={handleSearch}
              defaultValue={value}
              enterButton
            />
          </div>
          <div className="nav">
            <Menu />
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header

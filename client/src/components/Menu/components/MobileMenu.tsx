
import { Menu as MenuAntd, Dropdown, Avatar, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from 'redux/action/user'

import userIcon from 'assets/img/user.svg'

import { MenuProps } from 'components/Menu'

export const MobileMenu: React.FC<MenuProps> = ({ isAuth, avatar }) => {
  const dispatch = useDispatch()
  return (
    <MenuAntd>
      { !isAuth
        ? <>
          <Dropdown overlay={
            <>
              <MenuAntd.Item>
                <Link to="/signin">
                  <Button block={true} type="primary">Войти</Button>
                </Link>
              </MenuAntd.Item>
              <MenuAntd.Item>
                <Link to="/signup">
                  <Button type="primary">Зарегестрироватся</Button>
                </Link>
              </MenuAntd.Item>
            </>
          } placement="bottomRight">
            <Avatar className="avatar" size="large" icon={<img src={avatar || userIcon} alt="UserAvatar" />} />
          </Dropdown>
        </>

        : (
          <Dropdown overlay={
            <>
              <MenuAntd>
                <MenuAntd.Item>
                  <Link className="nav-link" to='/addbook'>Добавить книгу</Link>
                </MenuAntd.Item>
                <MenuAntd.Item>
                  <Link to='profile'>Profile</Link>
                </MenuAntd.Item>
                <MenuAntd.Item onClick={() => dispatch(logOut())} danger>
                  Выйти
                </MenuAntd.Item>
              </MenuAntd>
            </>
          } placement="bottomRight">
            <Avatar className="avatar" size="large" icon={<img src={false || userIcon} alt="UserAvatar" />} />
          </Dropdown>
        )}
    </MenuAntd>
  )
}
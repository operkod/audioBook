import { Menu as MenuAntd, Dropdown, Avatar, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Actions from 'redux/action/user'
import { MenuProps } from 'components/Menu'
import routers from 'const/routers'

import userIcon from 'assets/img/user.svg'
import { useTranslation } from 'react-i18next'

export const WebMenu: React.FC<MenuProps> = ({ isAuth, avatar }) => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	return (
		<>
			{!isAuth ? (
				<>
					<Link to={routers.getSignin()}>
						<Button type='primary'>{t('auth.button.signIn')}</Button>
					</Link>
					<Link to={routers.getSignup}>
						<Button type='primary'>{t('auth.button.registration')}</Button>
					</Link>
				</>
			) : (
				<Dropdown
					overlay={
						<MenuAntd>
							<MenuAntd.Item>
								<Link className='nav-link' to={routers.getAddBook()}>
									{t('menu.addBook')}
								</Link>
							</MenuAntd.Item>
							<MenuAntd.Item>
								<Link to={routers.getProfile()}>{t('menu.profile')}</Link>
							</MenuAntd.Item>
							<MenuAntd.Item onClick={() => dispatch(Actions.logOut())} danger>
								{t('menu.logout')}
							</MenuAntd.Item>
						</MenuAntd>
					}
					placement='bottomRight'>
					<Avatar
						className='avatar'
						size='large'
						icon={<img src={avatar || userIcon} alt='UserAvatar' />}
					/>
				</Dropdown>
			)}
		</>
	)
}

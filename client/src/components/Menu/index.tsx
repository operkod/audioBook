import './Avatar.scss'
import React from 'react'
import { WebMenu } from './components/WebMenu'
import { MobileMenu } from './components/MobileMenu'
import { useSelector } from 'react-redux'
import { getAuth, getAvatar } from 'redux/selectors'

const width: number = window.innerWidth
const currentWidth: number = 850

export type MenuProps = {
	isAuth: boolean
	avatar: string
}

const Menu = () => {
	const [showMenu, setShowMenu] = React.useState<boolean>(width > currentWidth)
	const isAuth = useSelector(getAuth)
	const avatar = useSelector(getAvatar)

	const handleResize = React.useCallback(() => {
		let clientWidth = document.body.clientWidth
		if (currentWidth > clientWidth) setShowMenu(false)
		else setShowMenu(true)
	}, [])

	React.useEffect(() => {
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [handleResize])

	return (
		<>
			{showMenu ? (
				<WebMenu isAuth={isAuth} avatar={avatar} />
			) : (
				<MobileMenu isAuth={isAuth} avatar={avatar} />
			)}
		</>
	)
}

export default Menu

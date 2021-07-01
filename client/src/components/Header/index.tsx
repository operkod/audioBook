import './Header.scss'
import { Input, Switch } from 'antd'
import { Menu } from 'components'
import { Link, useHistory } from 'react-router-dom'
import { getSearchValue } from 'redux/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { Actions } from 'redux/action/books'

import logoIcon from 'assets/img/logo.svg'
import routers from 'const/routers'
import { useTranslation } from 'react-i18next'
import Language from 'components/Language'
import styled, { ThemeProps } from 'styled-components'
import { ThemeType } from 'components/Layout'

const { Search } = Input

type Props = {
	valueChecked: boolean
	onChangeTheme: (v: boolean) => void
}

const Header = ({ valueChecked, onChangeTheme }: Props) => {
	const { t } = useTranslation()
	const history = useHistory()
	const value = useSelector(getSearchValue)
	const dispatch = useDispatch()
	const handleSearch = (value: string) => {
		dispatch(Actions.searchValue(value.trim()))
		history.push(routers.getBase())
	}
	return (
		<HeaderStyle className='header'>
			<div className='container'>
				<div className='header-content'>
					<div className='header-content__logo'>
						<Link to={routers.getBase()}>
							<img src={logoIcon} alt='Books' />
						</Link>
					</div>
					<div className='search'>
						<Search
							placeholder={t('search')}
							onSearch={handleSearch}
							defaultValue={value ? value : ''}
							enterButton
						/>
					</div>
					<div className='nav'>
						<Menu />
					</div>
					<Language />
					<Switch checked={valueChecked} onChange={onChangeTheme} />
				</div>
			</div>
		</HeaderStyle>
	)
}
export default Header

const HeaderStyle = styled.header`
	transition: background-color 0.3s ease;
	background-color: ${(props: ThemeProps<ThemeType>) =>
		props.theme.backgroundColor.secondary};
	color: ${(props: ThemeProps<ThemeType>) => props.theme.color.primary};
	position: sticky;
	top: 0;
	z-index: 100;
	box-sizing: border-box;
	border-bottom: 1px solid
		${(props: ThemeProps<ThemeType>) => props.theme.backgroundColor.primary};
`

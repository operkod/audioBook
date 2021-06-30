import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAudioId, getCommentsShow } from 'redux/selectors'
import { Header, AudioPlayer, Modal } from 'components'
import styled, { ThemeProps } from 'styled-components'
import { ThemeProvider } from 'styled-components'

export type ThemeType = typeof themeWhite
const themeWhite = {
	color: {
		primary: '#000',
		secondary: 'green'
	},
	backgroundColor: {
		primary: '#fff',
		secondary: '#eef0f1'
	}
}
const themeBlack = {
	color: {
		primary: '#fff',
		secondary: 'green'
	},
	backgroundColor: {
		primary: '#353333',
		secondary: '#5e5a5a'
	}
}

const MyLayout = ({ children }: any) => {
	const [theme, setTheme] = useState(false)
	const isAudio = useSelector(getAudioId)
	const showModal = useSelector(getCommentsShow)
	const onChangeTheme = useCallback((value: any) => {
		setTheme(value)
	}, [])

	return (
		<ThemeProvider theme={theme ? themeWhite : themeBlack}>
			<Wrapper>
				<Header onChangeTheme={onChangeTheme} valueChecked={theme} />
				{children}
				{!!isAudio && <AudioPlayer />}
				{showModal && <Modal />}
			</Wrapper>
		</ThemeProvider>
	)
}

export default MyLayout

const Wrapper = styled.div`
	transition: background-color 0.3s ease;
	background-color: ${(props: ThemeProps<ThemeType>) =>
		props.theme.backgroundColor.secondary};
	color: ${(props: ThemeProps<ThemeType>) => props.theme.color.primary};
`

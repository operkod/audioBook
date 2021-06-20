import React from 'react'
import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { getLanguage } from 'helpers/token'

const Language = () => {
  const [active, setActive] = React.useState(getLanguage())
  const { i18n } = useTranslation()
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    setActive(lang)
  }
  return (
    <Container>
      <Item
        active={active === 'ru'}
        onClick={() => changeLanguage('ru')}
      >
        RU
      </Item>
      <Item
        active={active === 'en'}
        onClick={() => changeLanguage('en')}
      >
        EN
      </Item>
    </Container>
  )
}

export default Language



const Container = styled.ul`
  display: flex;
`
const Item = styled.li`
  cursor: pointer;
  margin-left: 10px;
  transition: color .2s ease;
  font-weight: 700;
  &:hover{
    color: red;
  }
  ${({ active }: { active?: boolean }) => active && css`
    cursor: default;
    color: red;
  `}
`

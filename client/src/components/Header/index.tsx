import React from 'react'
import { Input } from 'antd'
import { Menu } from 'components'
import { Link } from 'react-router-dom'

import './Header.scss'

import logoIcon from 'assets/img/logo.svg'

const { Search } = Input

type props = {
  onSearchBook: (v: string) => void
  value: string
}
const Header: React.FC<props> = ({ onSearchBook, value }) => (
  <header className="header">
    <div className="container">
      <div className="header-content">
        <div className="header-content__logo">
          <Link to='/'><img src={logoIcon} alt="Books" /></Link>
        </div>
        <div className="search">
          <Search placeholder="Название книги или афтора" onSearch={onSearchBook} defaultValue={value} enterButton />
        </div>
        <div className="nav">
          <Menu />
        </div>
      </div>
    </div>
  </header>
)
export default Header

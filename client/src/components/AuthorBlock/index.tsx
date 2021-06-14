import React from 'react'
import authorIcon from 'assets/img/author.svg'
import classNames from "classnames"

import './AuthorBlock.scss'

type props = {
  name?: string
  onClick?: () => void
  icon?: string
  className?: string
  style?: any
}


const AuthorBlock: React.FC<props> = ({ onClick, name, icon, className, style }) => (
  <div className={classNames("author", { [`${className}`]: !!className })} onClick={onClick} style={style}>
    <div className="author-img">
      <img src={icon || authorIcon} alt={name} />
    </div>
    <div className="author-name">{name}</div>
  </div>
)

export default AuthorBlock

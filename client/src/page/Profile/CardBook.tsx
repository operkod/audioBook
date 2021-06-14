import React from 'react'
import { AuthorBlock, ButtonPlay } from 'components'

type Props = {
  _id?: string
  avatar?: string
  author?: string
  name?: string
}

const CardBook: React.FC<Props> = ({ _id = "3", avatar, author, name, }) => {
  return (
    <div style={{ display: 'flex' }}>
      <img src={avatar} alt='avatar' style={{ width: '50px' }} />
      <div style={{ width: '150xp' }}>
        <h3>{name}</h3>
        <AuthorBlock name={name} />
        <ButtonPlay bookId={_id} />
      </div>
    </div>
  )
}

export default CardBook
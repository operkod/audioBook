import React from 'react'
import { AuthorBlock, ButtonPlay } from 'components'
import { BookType } from 'types'

const CardBook: React.FC<BookType> = ({ _id, imgUrl, name }) => {
  return (
    <div style={{
      display: 'flex',
      width: '33.33333%',
      alignItems: 'center',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      rowGap: '20px'
    }}>
      <div style={{ height: "90px", width: '90px', borderRadius: '50%', overflow: 'hidden' }}> <img src={imgUrl} alt='avatar' /></div>
      <div style={{ width: '150xp', marginLeft: '20px' }}>
        <h3 style={{ margin: '0 0 0 25px', fontWeight: 'bold', fontSize: '20px' }}>{name}</h3>
        <AuthorBlock name={name} />
        <ButtonPlay bookId={_id} />
      </div>
    </div>
  )
}

export default CardBook
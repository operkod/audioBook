import './Profile.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Image } from 'antd'
import { Typography } from 'antd'
import ActionsUser from 'redux/action/user'
import { getAvatar, getBooks, getUserName } from 'redux/selectors'
import CardBook from './CardBook'
import { useTranslation } from 'react-i18next'

const { Title } = Typography

const Profile = () => {
  const { t } = useTranslation()
  const books = useSelector(getBooks)
  const avatar = useSelector(getAvatar)
  const userName = useSelector(getUserName)
  const dispatch = useDispatch()

  const onChange = (e: any) => {
    dispatch(ActionsUser.updateAvatar(e.target.files[0]))
  }

  return <div className='profile'>
    <div className='container'>
      <Card >
        <div className='profile__header'>
          <div>
            <Image
              width={200}
              src={avatar}
            />
            <Title level={2}>{t('profile.avatar.change')}:</Title>
            <input className='profile__header-field' type="file" placeholder='asdsad' onChange={onChange} />
          </div>
          <Title level={1}><span style={{ fontSize: '20px' }}>{t('profile.name')}: </span>{userName}</Title>
        </div>
      </Card>
      <Card>
        <Title level={3}>{t('profile.select')}</Title>
        <div className='profile__list'>
          {books.map((book) => <CardBook key={book._id} {...book} />)}
        </div>
      </Card>
    </div>
  </div>
}

export default Profile
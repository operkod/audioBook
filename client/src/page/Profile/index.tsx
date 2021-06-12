import './Profile.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Image } from 'antd'
import { Typography } from 'antd'
import { useHistory } from "react-router-dom"
import { Actions } from 'redux/action/books'
import { Header } from 'components'
import { updateAvatar } from 'redux/action/user'
import { getAvatar, getSearchValue } from 'redux/selectors'
import { getUserName } from 'helpers/token'

const { Title } = Typography

const Profile = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const searchValue = useSelector(getSearchValue)
  const SearchBook = (value: string) => {
    dispatch(Actions.searchValue(value))
    history.push("/")
  }
  const avatar = useSelector(getAvatar)
  const userName = useSelector(getUserName)

  const onChange = (e: any) => {
    dispatch(updateAvatar(e.target.files[0]))
  }

  return <>
    <Header onSearchBook={SearchBook} value={searchValue} />
    <div className='container'>
      <Card >
        <div style={{ display: 'flex' }}>
          <div>
            <Image
              width={200}
              src={avatar}
            />
            <Title level={2} >Изменить аватар</Title>
            <input style={{ display: 'block' }} type="file" onChange={onChange} />
          </div>
          <Title level={1}><span style={{ fontSize: '20px' }}>Имя: </span>{userName}</Title>
        </div>
      </Card>
      <Card>
        <Title level={3}>Выбраные киниги:</Title>
      </Card>
    </div>
  </>
}

export default Profile
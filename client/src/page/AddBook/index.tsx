import './AddBook.scss'
import React from 'react'
import { Button } from 'antd'
import TextArea from 'components/input/TextArea'
import { AddBookType } from 'types'
import { useDispatch } from 'react-redux'
import { Actions } from 'redux/action/books'

const initValue = {
  name: '',
  author: '',
  description: '',
}

const AddBook = () => {
  const dispatch = useDispatch()
  const [formaData, setFormData] = React.useState<AddBookType>(initValue)
  const [error, setError] = React.useState<{ [key: string]: boolean }>({})

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target
    if (error[name] === true) {
      setError((prev) => ({ ...prev, [name]: false }))
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const checkFillingInput = Object.entries(formaData).reduce((acc, [key, value]) => {
      return !value ? { ...acc, [key]: true } : acc
    }, {})
    if (Object.values(checkFillingInput).length) {
      return setError({ ...checkFillingInput })
    } else {
      setError({})
    }
    dispatch(Actions.requestAddBook(formaData))
  }

  return (
    <div className="addbook">
      <div className="container">
        <div className="addbook-wrap">
          <form className="addbook__form" onSubmit={handleSubmit}>
            <TextArea
              name='name'
              value={formaData}
              onChange={handleChange}
              label='Введите название книги'
              placeholder='название книги'
              error={error}
              styleProp={{ width: '500px' }}
            />
            <TextArea
              name='author'
              value={formaData}
              onChange={handleChange}
              label='Введите  И. Ф. автора'
              placeholder='И Ф автора'
              error={error}
              styleProp={{ width: '500px' }}
            />
            <TextArea
              name='description'
              value={formaData}
              onChange={handleChange}
              label='Описяние'
              placeholder='И Ф автора'
              error={error}
              minRows={3}
              maxRows={7}
              styleProp={{ width: '500px' }}
            />
            <div className='addbook__btn'>
              <Button type='primary' htmlType='submit'>Добавить</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddBook
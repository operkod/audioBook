import './AddBook.scss'
import React from 'react'
import { Input, Button } from 'antd'


const { TextArea } = Input

const AddBook = () => {
  //TODO Созданть rvgjytn Input , и и зделать ошибки что бы нетправлялость с пустым полем 
  const [inputValue, setValue] = React.useState<{ [key: string]: string }>({})
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValue((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('submit :', inputValue)
  }

  return (
    <div className="addbook">
      <div className="container">
        <form className="addbook__form" onSubmit={handleSubmit}>
          <div className="addbook__title">Введите название книги</div>
          <TextArea
            value={inputValue['name']}
            name='name'
            onChange={handleChange}
            placeholder="название книги"
            autoSize={{ minRows: 1, maxRows: 1 }}
            style={{ width: '500px' }}
          />
          <div className="addbook__title">Введите  И. Ф. автора</div>
          <TextArea
            value={inputValue['author']}
            name='author'
            onChange={handleChange}
            placeholder="И Ф автора"
            autoSize={{ minRows: 1, maxRows: 1 }}
            style={{ width: '500px' }}
          />
          <div className="addbook__title">Описяние</div>
          <TextArea
            value={inputValue['description']}
            name='description'
            onChange={handleChange}
            placeholder="Описяние"
            autoSize={{ minRows: 3, maxRows: 7 }}
            style={{ width: '500px' }}
          />
          <div className='addbook__bnt'>
            <Button type='primary' htmlType='submit'>Добавить</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBook
import './AddBook.scss'
import React, { ChangeEvent } from 'react'
import { Input } from 'antd'

const { TextArea } = Input

const AddBook = () => {
  const [inputValue, setValue] = React.useState<{ [key: string]: string }>({})
  const onChange = (e: any) => {
    const { name, value } = e.target
    setValue({ ...inputValue, [name]: value })
  }
  return (
    <div className="addbook">
      <div className="container">
        <TextArea
          value={inputValue['name']}
          name='name'
          onChange={onChange}
          placeholder="Controlled autosize"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </div>
    </div>
  )
}

export default AddBook
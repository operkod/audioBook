import './AddBook.scss'
import React from 'react'
import { Button } from 'antd'
import TextArea from 'components/input/TextArea'
import { useDispatch } from 'react-redux'
import { Actions } from 'redux/action/books'
import { useTranslation } from 'react-i18next'

type FormDataErrorType = {
  [key: string]: { status: boolean, text: string }
}

const initFormData = { name: '', author: '', description: '' }

const AddBook = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [formaData, setFormData] = React.useState(initFormData)
  const [error, setError] = React.useState<FormDataErrorType>({
    name: { status: false, text: '' },
    author: { status: false, text: '' },
    description: { status: false, text: '' }
  })

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target
    if (error[name].status === true) {
      setError((prev) => ({ ...prev, [name]: { status: false, text: '' } }))
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [error])

  const handleBlur = React.useCallback((event: React.FocusEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setError((prev) => ({ ...prev, [name]: { status: !value, text: !value ? t('errors.required') : '' } }))
  }, [])

  const handleSubmit = React.useCallback((event: React.FormEvent) => {
    event.preventDefault()
    const checkFillingInput = Object.entries(formaData).reduce((acc, [key, value]) => {
      if (!value) {
        setError((prev) => ({ ...prev, [key]: { status: true, text: t('errors.required') } }))
        return acc = true
      }
      return acc
    }, false)
    if (checkFillingInput) {
      return
    }
    dispatch(Actions.requestAddBook(formaData))
    setButtonDisabled(true)
    setTimeout(() => {
      setButtonDisabled(false)
      setFormData(initFormData)
    }, 2000)
  }, [formaData, dispatch])

  const isButtonDisabled = React.useMemo(() => Object.values(error).some((item) => item.status === true) || buttonDisabled, [
    error,
    buttonDisabled,
  ])

  return (
    <div className="addbook">
      <div className="container">
        <div className="addbook-wrap">
          <form className="addbook__form" onSubmit={handleSubmit}>
            <TextArea
              name='name'
              value={formaData}
              onChange={handleChange}
              onBlur={handleBlur}
              label={t('book.input.name')}
              placeholder={t('book.input.name')}
              error={error}
              styleProp={{ width: '500px' }}
            />
            <TextArea
              name='author'
              value={formaData}
              onChange={handleChange}
              onBlur={handleBlur}
              label={t('book.input.author')}
              placeholder={t('book.input.author')}
              error={error}
              styleProp={{ width: '500px' }}
            />
            <TextArea
              name='description'
              value={formaData}
              onChange={handleChange}
              onBlur={handleBlur}
              label={t('book.input.description')}
              placeholder={t('book.input.description')}
              error={error}
              minRows={3}
              maxRows={7}
              styleProp={{ width: '500px' }}
            />
            <div className='addbook__btn'>
              <Button
                type='primary'
                htmlType='submit'
                disabled={isButtonDisabled}
              >{t('global.save')}</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddBook
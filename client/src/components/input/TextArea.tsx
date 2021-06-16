import './Style.scss'
import React from 'react'
import { Input } from 'antd'
import cn from 'classnames'

const { TextArea } = Input
type Props = {
  name: string
  value?: any
  error?: any
  placeholder?: string
  minRows?: number
  maxRows?: number
  label?: string
  styleProp?: any
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const InputText = (props: Props) => {
  const { name, value, placeholder, error, minRows = 1, maxRows = 1, label, styleProp, onChange } = props
  return (
    <>
      <label id={name}
        className={cn('input__label', { 'input__label-error': error[name] })}
      >
        {label}
      </label>
      <TextArea
        id={name}
        name={name}
        value={value[name]}
        onChange={onChange}
        placeholder={placeholder}
        autoSize={{ minRows, maxRows }}
        style={styleProp}
      />
    </>
  )
}

export default InputText
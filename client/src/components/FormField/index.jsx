import {Form, Input} from 'antd'
import validateField from 'utils/helpers/validateField'

const FormField = props => {
  const {name, placeholder, type, handleChange, handleBlur, touched, errors, values} = props
  return (
    <Form.Item
      validateStatus={validateField(name, touched, errors)}
      help={!touched[name] ? null : errors[name]}
      hasFeedback
    >
      <Input
        id={name}
        size="large"
        placeholder={placeholder}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        type={type}
      />
    </Form.Item>
  )
}
export default FormField

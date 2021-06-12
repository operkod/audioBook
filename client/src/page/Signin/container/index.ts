import { withFormik } from 'formik'
import LoginForm from '../component'
import validateForm from 'helpers/validate'
import { fetchUserLogin } from 'redux/action/user'
import { connect } from 'react-redux'

const LoginFormWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),
  validate: values => {
    let errors = {}
    validateForm({ isAuth: true, values, errors })
    return errors
  },
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    //@ts-ignore
    props.dispatch(fetchUserLogin(values)).catch(e => {
      setErrors({ email: e.message, password: e.message })
      setSubmitting(false)
    })
  },
  displayName: 'LoginForm'
})(LoginForm)


const LoginFormContainer = connect()(LoginFormWithFormik)
export default LoginFormContainer

import { withFormik } from 'formik'
import RegisterForm from '../component'
import validateForm from 'helpers/validate'
import { fetchUserRegister } from 'redux/action/user'
import { connect } from 'react-redux'


const RegisterWidthFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    email: '',
    fullname: '',
    password: '',
    password_2: ''
  }),
  validate: values => {
    let errors = {}
    validateForm({ isAuth: false, values, errors })
    return errors
  },
  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    console.log('props: ', props)
    //@ts-ignore
    props.dispatch(fetchUserRegister(values)).catch((e) => {
      setErrors({ email: e.message })
      setSubmitting(false)
    })

    setSubmitting(false)
  },
  displayName: 'RegisterForm'
})(RegisterForm)

const RegisterFormContainer = connect()(RegisterWidthFormik)
export default RegisterFormContainer

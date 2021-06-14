import { withFormik } from 'formik'
import RegisterForm from '../component'
import validateForm from 'helpers/validate'
import Actions from 'redux/action/user'
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
    //@ts-ignore
    props.dispatch(Actions.fetchRegistration(values))
  },
  displayName: 'RegisterForm'
})(RegisterForm)

const RegisterFormContainer: any = connect()(RegisterWidthFormik)
export default RegisterFormContainer

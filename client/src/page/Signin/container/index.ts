import { withFormik } from 'formik'
import LoginForm from '../component'
import validateForm from 'helpers/validate'
import Actions from 'redux/action/user'
import { connect } from 'react-redux'

//TODO Убрать формик

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
  handleSubmit: (values, { props }) => {
    //@ts-ignore
    props.dispatch(Actions.fetchAuthorization(values))
  },
  displayName: 'LoginForm'
})(LoginForm)


const LoginFormContainer: any = connect()(LoginFormWithFormik)
export default LoginFormContainer


import './Auth.scss'
import { Form, Button } from 'antd'
import { Link } from 'react-router-dom'
import { FormField } from 'components'
import { FormikProps } from 'formik'
import { LoginFormType } from 'types'

const LoginForm = (props: FormikProps<LoginFormType>) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting
  } = props
  return (
    <section className="auth">
      <div className="auth__content">
        <div className="auth__top">
          <h2>Войти в аккаунт</h2>
          <p>Пожалуйста, войдите в свой аккаунт</p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="login-form">
            <FormField
              name="email"
              placeholder="E-Mail"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              values={values}
            />
            <FormField
              name="password"
              type="password"
              placeholder="Пароль"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              values={values}
            />

            <Form.Item>
              {isSubmitting && !isValid && <span>Ошибка!</span>}
              <Button
                disabled={isSubmitting}
                block={true}
                htmlType='submit'
                type="primary"
                size="large"
              >
                Войти в аккаунт
              </Button>
            </Form.Item>
            <Link className="auth__register-link" to="/signup">
              Зарегистрироваться
            </Link>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginForm

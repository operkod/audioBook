import './Auth.scss'
import { Form, Button } from "antd"
import { Link } from "react-router-dom"
import { FormikProps } from "formik"
import { FormField } from "components"

type FormValues = {
  email: string
  fullname: string
  password: string
  password_2: string
}

const RegisterForm = (props: FormikProps<FormValues>) => {
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
          <h2>Регистрация</h2>
          <p>Вам нужно зарегистрироваться</p>
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
              name="fullname"
              placeholder="Ваше имя"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              values={values}
            />

            <FormField
              name="password"
              placeholder="Пароль"
              type="password"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              values={values}
            />

            <FormField
              name="password_2"
              placeholder="Повторите пароль"
              type="password"
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
                type="primary"
                htmlType="submit"
                onSubmit={handleSubmit}
                size="large"
              >
                Зарегистрироваться
            </Button>
            </Form.Item>
            <Link className="auth__register-link" to="/signin">
              Войти в аккаунт
          </Link>
          </form>
        </div>
      </div>
    </section>
  )
}

export default RegisterForm

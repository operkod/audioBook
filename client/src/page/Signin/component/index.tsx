
import './Auth.scss'
import { Form, Button } from 'antd'
import { Link } from 'react-router-dom'
import { FormField } from 'components'
import { FormikProps } from 'formik'
import { LoginFormType } from 'types'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  console.log(t('global.clarification'))
  return (
    <section className="auth">
      <div className="auth__content">
        <div className="auth__top">
          <h2>{t('auth.headerAuthentication.title')}</h2>
          <p>{t('auth.headerAuthentication.subtitle')}</p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="login-form">
            <FormField
              name="email"
              placeholder={t('auth.input.email')}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              values={values}
            />
            <FormField
              name="password"
              type="password"
              placeholder={t('auth.input.password')}
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
                {t('auth.button.signIn')}
              </Button>
            </Form.Item>
            <Link className="auth__register-link" to="/signup">
              {t('auth.button.registration')}
            </Link>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginForm

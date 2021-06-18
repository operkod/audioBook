import './Auth.scss'
import { Form, Button } from "antd"
import { Link } from "react-router-dom"
import { FormikProps } from "formik"
import { FormField } from "components"
import { RegistrationFormType } from 'types'
import { useTranslation } from 'react-i18next'

const RegisterForm = (props: FormikProps<RegistrationFormType>) => {
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
  return (
    <section className="auth">
      <div className="auth__content">
        <div className="auth__top">
          <h2>{t('auth.headerRegistration.title')}</h2>
          <p>{t('auth.headerRegistration.subtitle')}</p>
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
              name="fullname"
              placeholder={t('auth.input.fullName')}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              values={values}
            />

            <FormField
              name="password"
              placeholder={t('auth.input.password')}
              type="password"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched}
              errors={errors}
              values={values}
            />
            <FormField
              name="password_2"
              placeholder={t('auth.input.password')}
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
                {t('auth.button.registration')}
              </Button>
            </Form.Item>
            <Link className="auth__register-link" to="/signin">
              {t('auth.button.signIn')}
            </Link>
          </form>
        </div>
      </div>
    </section>
  )
}

export default RegisterForm

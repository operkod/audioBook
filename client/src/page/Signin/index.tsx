import './Auth.scss';
import React from 'react';
import { Form, Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import Input from 'components/input/FieldAuth';
import { FormDataErrorType, LoginFormType } from 'types';
import { useTranslation } from 'react-i18next';
import routers from 'const/routers';
import { emailValidator } from 'helpers/validators';
import useAuth from 'hooks/api/useAuth';
import { setToken } from 'helpers/token';

const LoginForm = () => {
  const history = useHistory();
  const { getAuth, getAuthIsFetching } = useAuth();
  const { t } = useTranslation();
  const [formaData, setFormData] = React.useState<LoginFormType>({
    email: '',
    password: '',
  });
  const [error, setError] = React.useState<FormDataErrorType>({
    email: { isValid: false, text: '' },
    password: { isValid: false, text: '' },
  });

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      if (error[name].isValid === true) {
        setError((prev) => ({ ...prev, [name]: { isValid: false, text: '' } }));
      }
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [error],
  );

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      if (name === 'email' && value) {
        const isValidEmail = !emailValidator(value);
        setError((prev) => ({
          ...prev,
          [name]: {
            isValid: isValidEmail,
            text: isValidEmail ? t('errors.emailNotValid') : '',
          },
        }));
      } else {
        setError((prev) => ({
          ...prev,
          [name]: { isValid: !value, text: !value ? t('errors.required') : '' },
        }));
      }
    },
    [t],
  );

  const isButtonDisabled = React.useMemo(
    () => Object.values(error).some((item) => item.isValid === true) || getAuthIsFetching,
    [error, getAuthIsFetching],
  );

  const handleSubmit = React.useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const checkFillingInput = Object.entries(formaData).reduce((acc, [key, value]) => {
        if (!value) {
          setError((prev) => ({
            ...prev,
            [key]: { isValid: true, text: t('errors.required') },
          }));
          return true;
        }
        return acc;
      }, false);
      if (checkFillingInput) {
        return;
      }
      getAuth({
        email: formaData.email,
        password: formaData.password,

        successCallback: ({ token }: any) => {
          setToken(token);
          history.push(routers.getBase());
        },
        errorCallback: ({ message }: any) => {
          setError((prev) => ({ ...prev, email: { isValid: true, text: message } }));
        },
      });
    },
    [t, formaData, getAuth, history],
  );

  return (
    <section className="auth">
      <div className="auth__content">
        <div className="auth__top">
          <h2>{t('auth.headerAuthentication.title')}</h2>
          <p>{t('auth.headerAuthentication.subtitle')}</p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="login-form">
            <Input
              name="email"
              type="text"
              placeholder={t('auth.input.email')}
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={error}
              values={formaData}
            />
            <Input
              name="password"
              type="password"
              placeholder={t('auth.input.password')}
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={error}
              values={formaData}
            />
            <Form.Item>
              <Button disabled={isButtonDisabled} block htmlType="submit" type="primary" size="large">
                {t('auth.button.signIn')}
              </Button>
            </Form.Item>
            <Link className="auth__register-link" to={routers.getSignup()}>
              {t('auth.button.registration')}
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;

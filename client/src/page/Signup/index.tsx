import './Auth.scss';
import React from 'react';
import { Form, Button } from 'antd';
import { Link } from 'react-router-dom';
import FormField from 'components/input/FieldAuth';
import { FormDataErrorType, RegistrationFormType } from 'types';
import { useTranslation } from 'react-i18next';
import { emailValidator } from 'helpers/validators';
import routers from 'const/routers';
import useSignUp from 'hooks/api/useSignUp';
import useUserData from 'hooks/api/useUserData';
import { setToken } from 'helpers/token';
import { useHistory } from 'react-router';

const RegisterForm = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { getSignUp, getSignUpIsFetching } = useSignUp();
  const { getUserData, getUserDataIsFetching } = useUserData();
  const [formaData, setFormData] = React.useState<RegistrationFormType>({
    email: '',
    fullname: '',
    password: '',
    password_2: '',
  });
  const [error, setError] = React.useState<FormDataErrorType>({
    email: { isValid: false, text: '' },
    fullname: { isValid: false, text: '' },
    password: { isValid: false, text: '' },
    password_2: { isValid: false, text: '' },
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
      } else if (name === 'password_2' && value) {
        const passwordEquality = formaData.password !== value;
        setError((prev) => ({
          ...prev,
          [name]: {
            isValid: passwordEquality,
            text: passwordEquality ? t('errors.passwordsEquality') : '',
          },
        }));
      } else if (name === 'password' && formaData.password_2 && value) {
        const passwordEquality = formaData.password !== formaData.password_2;
        setError((prev) => ({
          ...prev,
          password_2: {
            isValid: passwordEquality,
            text: passwordEquality ? t('errors.passwordsEquality') : '',
          },
        }));
      } else {
        setError((prev) => ({
          ...prev,
          [name]: { isValid: !value, text: !value ? t('errors.required') : '' },
        }));
      }
    },
    [t, formaData],
  );

  const isButtonDisabled = React.useMemo(
    () => Object.values(error).some((item) => item.isValid === true) || getSignUpIsFetching || getUserDataIsFetching,
    [error, getSignUpIsFetching, getUserDataIsFetching],
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
      getSignUp({
        ...formaData,
        successCallback: ({ jwtToken }: any) => {
          setToken(jwtToken);
          getUserData({
            successCallback: () => {
              history.push(routers.getBase());
            },
          });
        },
      });
    },
    [t, formaData, getSignUp, getUserData, history],
  );

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
              type="text"
              placeholder={t('auth.input.email')}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={formaData.email}
              validateStatus={error.email.isValid}
              errorText={error.email.text}
            />
            <FormField
              name="fullname"
              type="text"
              placeholder={t('auth.input.fullName')}
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={formaData.fullname}
              validateStatus={error.fullname.isValid}
              errorText={error.fullname.text}
            />

            <FormField
              name="password"
              placeholder={t('auth.input.password')}
              type="password"
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={formaData.password}
              validateStatus={error.password.isValid}
              errorText={error.password.text}
            />
            <FormField
              name="password_2"
              placeholder={t('auth.input.password')}
              type="password"
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={formaData.password_2}
              validateStatus={error.password_2.isValid}
              errorText={error.password_2.text}
            />
            <Form.Item>
              <Button
                disabled={isButtonDisabled}
                block
                type="primary"
                htmlType="submit"
                onSubmit={handleSubmit}
                size="large"
              >
                {t('auth.button.registration')}
              </Button>
            </Form.Item>
            <Link className="auth__register-link" to={routers.getSignin()}>
              {t('auth.button.signIn')}
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;

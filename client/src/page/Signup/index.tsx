import './Auth.scss'
import React from 'react'
import { Form, Button } from 'antd'
import { Link } from 'react-router-dom'
import FormField from 'components/input/FieldAuth'
import { FormDataErrorType, RegistrationFormType } from 'types'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthLoading } from 'redux/selectors'
import { emailValidator } from 'helpers/validators'
import Actions from 'redux/action/user'
import routers from 'const/routers'

const RegisterForm = () => {
	const { t } = useTranslation()

	const dispatch = useDispatch()
	const isLoading = useSelector(getAuthLoading)
	const [formaData, setFormData] = React.useState<RegistrationFormType>({
		email: '',
		fullname: '',
		password: '',
		password_2: ''
	})
	const [error, setError] = React.useState<FormDataErrorType>({
		email: { status: false, text: '' },
		fullname: { status: false, text: '' },
		password: { status: false, text: '' },
		password_2: { status: false, text: '' }
	})

	const handleChange = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = event.target
			if (error[name].status === true) {
				setError(prev => ({ ...prev, [name]: { status: false, text: '' } }))
			}
			setFormData(prev => ({ ...prev, [name]: value }))
		},
		[error]
	)

	const handleBlur = React.useCallback(
		(event: React.FocusEvent<HTMLInputElement>) => {
			const { name, value } = event.target
			if (name === 'email' && value) {
				const isValidEmail = !emailValidator(value)
				setError(prev => ({
					...prev,
					[name]: {
						status: isValidEmail,
						text: isValidEmail ? t('errors.emailNotValid') : ''
					}
				}))
			} else if (name === 'password_2' && value) {
				const passwordEquality = formaData.password !== value
				setError(prev => ({
					...prev,
					[name]: {
						status: passwordEquality,
						text: passwordEquality ? t('errors.passwordsEquality') : ''
					}
				}))
			} else if (name === 'password' && formaData.password_2 && value) {
				const passwordEquality = formaData.password !== formaData.password_2
				setError(prev => ({
					...prev,
					password_2: {
						status: passwordEquality,
						text: passwordEquality ? t('errors.passwordsEquality') : ''
					}
				}))
			} else {
				setError(prev => ({
					...prev,
					[name]: { status: !value, text: !value ? t('errors.required') : '' }
				}))
			}
		},
		[t, formaData]
	)

	const isButtonDisabled = React.useMemo(
		() => Object.values(error).some(item => item.status === true) || isLoading,
		[error, isLoading]
	)

	const handleSubmit = React.useCallback(
		(event: React.FormEvent) => {
			event.preventDefault()
			const checkFillingInput = Object.entries(formaData).reduce(
				(acc, [key, value]) => {
					if (!value) {
						setError(prev => ({
							...prev,
							[key]: { status: true, text: t('errors.required') }
						}))
						return (acc = true)
					}
					return acc
				},
				false
			)
			if (checkFillingInput) {
				return
			}
			dispatch(Actions.fetchRegistration(formaData))
		},
		[t, formaData, dispatch]
	)

	return (
		<section className='auth'>
			<div className='auth__content'>
				<div className='auth__top'>
					<h2>{t('auth.headerRegistration.title')}</h2>
					<p>{t('auth.headerRegistration.subtitle')}</p>
				</div>
				<div>
					<form onSubmit={handleSubmit} className='login-form'>
						<FormField
							name='email'
							type='text'
							placeholder={t('auth.input.email')}
							handleChange={handleChange}
							handleBlur={handleBlur}
							errors={error}
							values={formaData}
						/>
						<FormField
							name='fullname'
							type='text'
							placeholder={t('auth.input.fullName')}
							handleChange={handleChange}
							handleBlur={handleBlur}
							errors={error}
							values={formaData}
						/>

						<FormField
							name='password'
							placeholder={t('auth.input.password')}
							type='password'
							handleChange={handleChange}
							handleBlur={handleBlur}
							errors={error}
							values={formaData}
						/>
						<FormField
							name='password_2'
							placeholder={t('auth.input.password')}
							type='password'
							handleChange={handleChange}
							handleBlur={handleBlur}
							errors={error}
							values={formaData}
						/>
						<Form.Item>
							<Button
								disabled={isButtonDisabled}
								block={true}
								type='primary'
								htmlType='submit'
								onSubmit={handleSubmit}
								size='large'>
								{t('auth.button.registration')}
							</Button>
						</Form.Item>
						<Link className='auth__register-link' to={routers.getSignin()}>
							{t('auth.button.signIn')}
						</Link>
					</form>
				</div>
			</div>
		</section>
	)
}

export default RegisterForm

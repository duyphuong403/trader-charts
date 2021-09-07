import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { Form } from 'semantic-ui-react'

import PortalRoutes from '@portal/routes'
import { fbAuth } from '@services/firebase'
import { PrimaryButton } from '@ui/theme'

import { inputs } from './Fields'

type TFormData = {
  email: string
}

const ForgotPasswordForm: React.FC = () => {
  const history = useHistory()
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  })

  const generateFormFields = useCallback(() => {
    inputs(errors).map(item =>
      register(item.name, {
        required: { value: item.required, message: item.requiredMessage },
        pattern: item.pattern,
      }),
    )
  }, [inputs])

  const onSubmit = useCallback(
    async (data: TFormData) => {
      const { email } = data

      await fbAuth
        .sendPasswordResetEmail(email)
        .then(() => {
          // TODO: replace Toast for alert
          // eslint-disable-next-line no-alert
          alert(
            'An Email reset password was sent to your mail. Please check the mail and follow instructions there to reset password.',
          )

          return history.push(PortalRoutes.Login)
        })
        .catch(errors => {
          console.warn(errors)
          // TODO: replace Toast for alert
          // eslint-disable-next-line no-alert
          alert(errors.message)
        })
    },
    [fbAuth],
  )

  const handleOnChange = useCallback(async (e, { name, value }) => {
    setValue(name, value)
    await trigger(name)
  }, [])

  useEffect(() => {
    generateFormFields()
  }, [generateFormFields])

  return (
    <div>
      <h1>Forgot Password</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {inputs(errors).map(input => (
          <Form.Field key={`form-input-${input.name}`}>
            <Form.Input
              name={input.name}
              type={input.type}
              fluid
              label={input.label}
              placeholder={input.placeholder}
              id={`form-input-${input.name}`}
              onChange={handleOnChange}
              error={input.error ? { content: input.error.message } : null}
            />
          </Form.Field>
        ))}

        <Link to={PortalRoutes.Login}>Login</Link>

        <PrimaryButton type="submit" floated="right">
          Reset Password
        </PrimaryButton>
      </Form>
    </div>
  )
}

export default React.memo(ForgotPasswordForm)

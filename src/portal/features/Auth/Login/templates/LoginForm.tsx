import React, { useCallback, useEffect, useState } from 'react'

import { fbAuth } from '@services/firebase'
import { PrimaryButton } from '@ui/theme'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { Form, Message } from 'semantic-ui-react'
import { AuthErrorCodes } from '@services/firebase/errorCodes'
import PortalRoutes from '@portal/routes'

import { inputs } from './Fields'
import { LinkWrapper, LogoContainer } from '../atoms'

type TFormData = {
  email: string
  password: string
}

// eslint-disable-next-line no-unused-vars
const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  })
  const history = useHistory()
  const [error, setError] = useState('')

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
      try {
        const { email, password } = data
        const userCredential = await fbAuth.signInWithEmailAndPassword(
          email,
          password,
        )
        if (userCredential?.user?.uid && !userCredential?.user?.emailVerified) {
          return history.push(PortalRoutes.AccountVerification)
        }
      } catch ({ code, message }) {
        switch (code) {
          case AuthErrorCodes.NoUser:
            // TODO: Set error message to Toast
            setError('Incorrect account')
            break
          case AuthErrorCodes.WrongPassword:
            // TODO: Set error message to Toast
            setError('Incorrect account')
            break
          default:
            // TODO: Set error message to Toast
            break
        }
      }
      return null
    },
    [fbAuth],
  )

  const handleOnChange = useCallback(async (e, { name, value }) => {
    setError('')
    setValue(name, value)
    await trigger(name)
  }, [])

  useEffect(() => {
    generateFormFields()
  }, [generateFormFields])

  return (
    <LogoContainer>
      <h1>Log In</h1>
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
        <LinkWrapper>
          <Link to={PortalRoutes.SignUp}>Register new account</Link>
          <Link to={PortalRoutes.ForgotPassword}>Forgot password?</Link>
        </LinkWrapper>

        {/* TODO: Replace Toast for Message */}
        <Message negative hidden={!error}>
          <Message.Header>Opps</Message.Header>
          <p>{error}</p>
        </Message>

        <PrimaryButton type="submit" floated="right">
          Log In
        </PrimaryButton>
      </Form>
    </LogoContainer>
  )
}

export default React.memo(LoginForm)

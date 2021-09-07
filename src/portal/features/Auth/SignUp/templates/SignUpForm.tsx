import React, { useCallback, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Form } from 'semantic-ui-react'

import PortalRoutes from '@portal/routes'
import { fbAuth } from '@services/firebase'
import { PrimaryButton } from '@ui/theme'

import { inputs } from './Fields'

type TFormData = {
  email: string
  firstName: string
  lastName: string
  password: string
}

const SignUpForm: React.FC = () => {
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

  const generateFormFields = useCallback(() => {
    inputs(errors).map(item =>
      register(item.name, {
        required: { value: item.required, message: item.requiredMessage },
        pattern: item.pattern,
        maxLength: item.maxLength,
        validate: item.validate,
      }),
    )
  }, [inputs])

  const onSubmit = useCallback(
    async (data: TFormData) => {
      // TODO: User data will be stored to database.
      // eslint-disable-next-line no-unused-vars
      const { email, password, firstName, lastName } = data
      const newUser = await fbAuth.createUserWithEmailAndPassword(
        email,
        password,
      )

      if (!newUser) return console.warn('>> create new User failed.')

      return newUser.user
        ?.sendEmailVerification()
        .then(() => {
          history.push(PortalRoutes.AccountVerification)
        })
        .catch(error => console.warn(error))
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
      <h1>Sign Up</h1>
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
          Sign Up
        </PrimaryButton>
      </Form>
    </div>
  )
}

export default React.memo(SignUpForm)

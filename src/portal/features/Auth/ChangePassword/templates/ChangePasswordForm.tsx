import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { useForm } from 'react-hook-form'
import { Container, Form, Message } from 'semantic-ui-react'

import { fbAuth, fbAuthNamespace } from '@services/firebase'
import { selectAuthUser } from '@store/slicers/auth/selectors'
import { PrimaryButton } from '@ui/theme'
import { AuthErrorCodes } from '@services/firebase/errorCodes'
import PortalRoutes from '@portal/routes'

import { inputs } from './Fields'

type TFormData = {
  currentPassword: string
  newPassword: string
}

const ChangePasswordForm: React.FC = () => {
  const authUser = useSelector(selectAuthUser)
  const [error, setError] = useState('')
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
      }),
    )
  }, [inputs])

  const onSubmit = useCallback(
    async (data: TFormData) => {
      try {
        const currentUser = fbAuth.currentUser || null
        const { currentPassword, newPassword } = data

        if (currentPassword === newPassword) {
          return setError(
            'The new password must be different from the current password',
          )
        }
        const credential = fbAuthNamespace.EmailAuthProvider.credential(
          authUser.email,
          currentPassword,
        )

        const isAuthenticated = await currentUser
          ?.reauthenticateWithCredential(credential)
          .then(() => {
            return true
          })
          .catch(({ code, message }) => {
            console.warn(error)
            switch (code) {
              case AuthErrorCodes.WrongPassword:
                // TODO: Set error message to Toast
                setError(message)
                break
              default:
                // TODO: Set error message to Toast
                break
            }
            return false
          })

        if (isAuthenticated) {
          currentUser
            ?.updatePassword(newPassword)
            .then(() => {
              // TODO: replace Toast for alert
              // eslint-disable-next-line no-alert
              alert('Change password successful')
              history.push(PortalRoutes.Root)
            })
            .catch(errors => console.warn(errors))
        }
      } catch (error) {
        console.warn(error)
      }

      return null
    },
    [fbAuthNamespace],
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
    <Container>
      <h1>Change Password</h1>
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

        {/* TODO: Replace Toast for Message */}
        <Message negative hidden={!error}>
          <Message.Header>Opps</Message.Header>
          <p>{error}</p>
        </Message>

        <PrimaryButton type="submit" floated="right">
          Change Password
        </PrimaryButton>
      </Form>
    </Container>
  )
}

export default React.memo(ChangePasswordForm)

import { DeepMap, FieldError, FieldValues } from 'react-hook-form'
import { REGEX_EMAIL } from '@utils/validations'

export const inputs = (errors: DeepMap<FieldValues, FieldError>) => [
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    placeholder: 'yourmail@domain.com',
    required: true,
    requiredMessage: 'Please enter your Email',
    pattern: {
      value: REGEX_EMAIL,
      message: 'Email invalid',
    },
    error: errors.email,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Password',
    required: true,
    requiredMessage: 'Please enter your Password',
    error: errors.password,
  },
]

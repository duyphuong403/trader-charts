import { REGEX_EMAIL, REGEX_PASSWORD } from '@utils/validations'
import { DeepMap, FieldError, FieldValues } from 'react-hook-form'

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
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    placeholder: 'First Name',
    required: true,
    requiredMessage: 'Please enter your First Name',
    maxLength: {
      value: 100,
      message: 'First Name can not more than 100 characters.',
    },
    validate: (value: string) => {
      return value.trim() === '' ? 'First Name cannot only white space' : true
    },
    error: errors.firstName,
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Last Name',
    required: true,
    requiredMessage: 'Please enter your Last Name',
    maxLength: {
      value: 100,
      message: 'First Name can not more than 100 characters.',
    },
    validate: (value: string) => {
      return value.trim() === '' ? 'Last Name cannot only white space' : true
    },
    error: errors.lastName,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Password',
    required: true,
    requiredMessage: 'Please enter your Password',
    pattern: {
      value: REGEX_PASSWORD,
      message:
        'Password must at least 1 number, 1 upper case, 1 lowercase and at least 8 characters',
    },
    error: errors.password,
  },
]

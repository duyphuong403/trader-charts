import { DeepMap, FieldError, FieldValues } from 'react-hook-form'
import { REGEX_EMAIL } from '@utils/validations'

export const inputs = (errors: DeepMap<FieldValues, FieldError>) => [
  {
    name: 'email',
    label: 'Your Email',
    type: 'text',
    placeholder: '',
    required: true,
    requiredMessage: 'Please enter your Email',
    pattern: {
      value: REGEX_EMAIL,
      message: 'Email invalid',
    },
    error: errors.email,
  },
]

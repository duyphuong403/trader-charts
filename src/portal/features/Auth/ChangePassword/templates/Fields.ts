import { DeepMap, FieldError, FieldValues } from 'react-hook-form'
import { REGEX_PASSWORD } from '@utils/validations'

export const inputs = (errors: DeepMap<FieldValues, FieldError>) => [
  {
    name: 'currentPassword',
    label: 'Current Password',
    type: 'password',
    placeholder: '',
    required: true,
    requiredMessage: 'Please enter your current password',
    error: errors.currentPassword,
  },
  {
    name: 'newPassword',
    label: 'New Password',
    type: 'password',
    placeholder: '',
    required: true,
    requiredMessage: 'Please enter your new password',
    pattern: {
      value: REGEX_PASSWORD,
      message:
        'Password must at least 1 number, 1 upper case, 1 lowercase and at least 8 characters',
    },
    error: errors.newPassword,
  },
]

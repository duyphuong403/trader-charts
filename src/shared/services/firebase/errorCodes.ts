/* eslint-disable no-unused-vars */
export enum AuthErrorCodes {
  ExistingEmail = 'auth/email-already-in-user',
  InvalidEmail = 'auth/invalid-email',
  NoUser = 'auth/user-not-found',
  WeakPassword = 'auth/weak-password',
  WrongPassword = 'auth/wrong-password',
}

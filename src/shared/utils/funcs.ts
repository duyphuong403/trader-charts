/* eslint-disable no-unused-vars */
import { appPrefix } from '@config/const'

interface ICookie {
  name: string
  value?: string
  expires?: number
}

type TGetCookie = ({ name }: ICookie) => string | null
type TSetCookie = ({ name, value, expires }: ICookie) => void
type TDeleteCookie = ({ name }: ICookie) => void

export const getCookie: TGetCookie = ({ name }) => {
  const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`)
  return v ? v[2] : null
}

export const setCookie: TSetCookie = ({ name, value, expires = 1000 }) => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * expires)
  document.cookie = `${appPrefix}_${name}=${value};path=/;expires=${d.toUTCString()}`
}

export const deleteCookie: TDeleteCookie = ({ name }) => {
  setCookie({ name, value: '', expires: -1 })
}

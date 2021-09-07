export const isDev = (): boolean => process.env.REACT_APP_ENV === 'dev'

export const isStage = (): boolean => process.env.REACT_APP_ENV === 'stage'

export const isProd = (): boolean => process.env.REACT_APP_ENV === 'prod'

export const ZIP_REGEX = /^\d{5}$|^\d{5}-\d{4}$/

export const US_DATE_FORMAT = 'MM/DD/YY'
export const TIME_FORMAT = 'hh:mm a'
export const YEAR_FORMAT = 'YYYY/MM/DD'
export const HRS_MINS_SECS_FORMAT = 'hh:mm:ss'
export const FULL_DATE_HRS_MINS_SECS_FORMAT = 'YYYY/MM/DD kk:mm:ss'
export const ACCOUNT_VERIFICATION_INTERVAL = 3000

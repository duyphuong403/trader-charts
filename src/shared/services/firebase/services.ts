import firebase from 'firebase/app'
import config from './config'

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'

firebase.initializeApp(config)

export const db = firebase.firestore()

db.settings({
  ignoreUndefinedProperties: true,
})

export const fbDbNamespace = firebase.firestore.Firestore

export const fbAuth = firebase.auth()

export const fbAuthNamespace = firebase.auth

export const fbFunctions = firebase.functions()

export const fbStorage = firebase.storage()

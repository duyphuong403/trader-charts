import firebase from 'firebase'

import FirestoreDocument from '@entities/FirestoreDocument'
// import { db } from '@services/firebase'

// export const firestore = firebase.firestore()
// const firestore = db

export const extractDataWithDocumentId = <T extends FirestoreDocument>(
  document: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>,
): T => {
  const data = document.data()
  return {
    ...data,
    id: document.id,
  } as T
}

// Copied from firestore core
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export const generateDocumentId = (): string => {
  let autoId = ''
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 20; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return autoId
}

import SafeStorage from './SafeStorage'
import { storageTypes } from './util'

function createSafeLocalStorage(options) {
  return new SafeStorage(storageTypes.localStorage, options)
}

function createSafeSessionStorage(options) {
  return new SafeStorage(storageTypes.sessionStorage, options)
}

export { createSafeLocalStorage, createSafeSessionStorage }

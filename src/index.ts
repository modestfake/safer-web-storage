import SafeStorage, { Options } from './SafeStorage'
import { StorageType } from './util'

function createSafeLocalStorage(options?: Options) {
  return new SafeStorage('localStorage', options)
}

function createSafeSessionStorage(options?: Options) {
  return new SafeStorage('sessionStorage', options)
}

export { createSafeLocalStorage, createSafeSessionStorage }
export type { Options, StorageType }

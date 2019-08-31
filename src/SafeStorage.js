import storageMock from './storageMock'
import InMemoryStorage from './inMemoryStorage'
import { getErrorMessage, storageTypes, validateStorageType } from './util'

export default class SafeStorage {
  static isNativeStorageSupported(storageType) {
    validateStorageType(storageType)

    const TEST_VALUE = 'test_value'

    try {
      const key = 'safe-web-storage.support'

      window[storageType].setItem(key, TEST_VALUE)
      const value = window[storageType].getItem(key)
      window[storageType].removeItem(key)

      return value === TEST_VALUE
    } catch (e) {
      return false
    }
  }

  constructor(storageType, options) {
    validateStorageType(storageType)

    this._options = {
      errorMessage: getErrorMessage(storageType),
      ...options,
    }

    const isSessionStorage = storageType === storageTypes.sessionStorage

    if (!SafeStorage.isNativeStorageSupported(storageType)) {
      this._storage = isSessionStorage
        ? InMemoryStorage
        : storageMock(this._options)
      this._isInMemoryStorageUsed = isSessionStorage
      this._isNativeStorageUsed = false

      console.warn(this._options.errorMessage)

      return
    }

    this._storage = window[storageType]
    this._storageType = storageType
    this._isNativeStorageUsed = true
    this._isInMemoryStorageUsed = false
  }

  get isNativeStorageUsed() {
    return this._isNativeStorageUsed
  }

  get isInMemoryStorageUsed() {
    return Boolean(this._isInMemoryStorageUsed)
  }
}

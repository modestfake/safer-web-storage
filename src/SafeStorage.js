import storageMock from './storageMock'
import InMemoryStorage from './inMemoryStorage'
import { getErrorMessage, storageTypes } from './util'

export default class SafeStorage {
  constructor(storageType, options) {
    if (!storageType) {
      throw new Error(
        `Please provide one of storages: ${Object.values(storageTypes).join(
          ', '
        )}`
      )
    }
    if (!Object.values(storageTypes).includes(storageType)) {
      throw new Error(
        `"${storageType}" is not supported. use one of these storages: ${Object.values(
          storageTypes
        ).join(', ')}`
      )
    }

    this._options = {
      errorMessage: getErrorMessage(storageType),
      ...options,
    }

    try {
      this._storage = window[storageType]
      this._storageType = storageType
      this._isNativeStorageUsed = true
    } catch (e) {
      const isSessionStorage = storageType === storageTypes.sessionStorage

      this._isInMemoryStorageUsed = true

      this._storage = isSessionStorage
        ? InMemoryStorage
        : storageMock(this._options)
      this._isNativeStorageUsed = true

      this._handleError(e)
    }
  }

  getItem(key, cb) {
    let isItemGot = false

    try {
      isItemGot = true
      return this._storage.getItem(key)
    } catch (e) {
      this._handleError(e)
    }

    if (cb) {
      cb(isItemGot)
    }
  }

  setItem(key, value, cb) {
    let isItemSet = false

    try {
      this._storage.setItem(key, value)
      isItemSet = true
    } catch (e) {
      this._handleError(e)
    }

    if (cb) {
      cb(isItemSet)
    }
  }

  removeItem(key, cb) {
    let isItemDeleted = false

    try {
      this._storage.removeItem(key)
      isItemDeleted = true
    } catch (e) {
      this._handleError(e)
    }

    if (cb) {
      cb(isItemDeleted)
    }
  }

  clear(cb) {
    let isStorageCleared = false

    try {
      this._storage.clear()
      isStorageCleared = true
    } catch (e) {
      this._handleError(e)
    }

    if (cb) {
      cb(isStorageCleared)
    }
  }

  get length() {
    try {
      return this._storage.length
    } catch (e) {
      this._handleError(e)

      return 0
    }
  }

  get isNativeStorageUsed() {
    return this._isNativeStorageUsed
  }

  isNativeStorageSupported() {
    const TEST_VALUE = 'test_value'

    try {
      const key = 'safe-web-storage.support'

      this._storage.setItem(key, TEST_VALUE)
      const value = this._storage.getItem(key)
      this._storage.removeItem(key)

      return value === TEST_VALUE
    } catch (e) {
      return false
    }
  }

  get isInMemoryStorageUsed() {
    return Boolean(this._isInMemoryStorageUsed)
  }

  _handleError(e) {
    console.warn(this._options.errorMessage, e)
  }
}

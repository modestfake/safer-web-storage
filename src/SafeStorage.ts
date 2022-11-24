import storageMock from './storageMock'
import InMemoryStorage from './inMemoryStorage'
import { getErrorMessage, StorageType, validateStorageType } from './util'

export interface Options {
  errorMessage?: string
}

export default class SafeStorage implements Storage {
  private _storageType: StorageType
  private _isNativeStorageUsed: boolean
  private _isInMemoryStorageUsed: boolean
  private _options: {
    errorMessage: string
  }
  private _storage: Storage

  static isNativeStorageSupported(storageType: StorageType) {
    validateStorageType(storageType)

    const TEST_VALUE = 'test_value'

    try {
      const key = 'safer-web-storage.support'

      window[storageType].setItem(key, TEST_VALUE)
      const value = window[storageType].getItem(key)
      window[storageType].removeItem(key)

      return value === TEST_VALUE
    } catch (e) {
      return false
    }
  }

  constructor(storageType: StorageType, options: Options = {}) {
    validateStorageType(storageType)

    this._storageType = storageType

    this._options = {
      errorMessage: getErrorMessage(storageType),
      ...options,
    }

    const isSessionStorage = storageType === 'sessionStorage'

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
    this._isNativeStorageUsed = true
    this._isInMemoryStorageUsed = false
  }

  get isNativeStorageUsed() {
    return this._isNativeStorageUsed
  }

  get isInMemoryStorageUsed() {
    return Boolean(this._isInMemoryStorageUsed)
  }

  getItem(key: string): string | null {
    return this._storage.getItem(key)
  }

  setItem(key: string, value: string): void {
    return this._storage.setItem(key, value)
  }

  removeItem(key: string): void {
    return this._storage.removeItem(key)
  }

  key(index: number): string | null {
    return this._storage.key(index)
  }

  clear(): void {
    return this._storage.clear()
  }

  get length(): number {
    return this._storage.length
  }
}

import storageMock from './helpers/__mocks__/storage'
import SafeStorage from '../src/SafeStorage'

beforeEach(() => {
  window.localStorage = undefined
  window.sessionStorage = undefined
})

describe('SafeStorage', () => {
  test('Passed wrong storage type', () => {
    expect(() => {
      new SafeStorage()
    }).toThrow('Please provide one of storages: sessionStorage, localStorage')

    expect(() => {
      new SafeStorage('wrongStorage')
    }).toThrow(
      '"wrongStorage" is not supported. use one of these storages: sessionStorage, localStorage'
    )
  })

  test('use native localStorage', () => {
    window.localStorage = storageMock
    const safeLocalStorage = new SafeStorage('localStorage')

    expect(safeLocalStorage.isNativeStorageUsed).toBe(true)
    expect(safeLocalStorage.isNativeStorageSupported()).toBe(true)
    expect(safeLocalStorage.isInMemoryStorageUsed).toBe(false)
    expect(safeLocalStorage._options).toMatchSnapshot()
  })

  test('use native sessionStorage', () => {
    window.sessionStorage = storageMock
    const safeSessionStorage = new SafeStorage('sessionStorage')

    expect(safeSessionStorage.isNativeStorageUsed).toBe(true)
    expect(safeSessionStorage.isNativeStorageSupported()).toBe(true)
    expect(safeSessionStorage.isInMemoryStorageUsed).toBe(false)
  })

  test('pass custom error message', () => {
    const errorMessage = 'Custom error message'
    const safeLocalStorage = new SafeStorage('localStorage', { errorMessage })

    expect(safeLocalStorage._options.errorMessage).toBe(errorMessage)
  })

  // test('AccessDenied', () => {})
})

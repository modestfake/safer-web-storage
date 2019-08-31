import storageMock from './helpers/__mocks__/storage'
import SafeStorage from '../src/SafeStorage'

const previousWindow = global.window

beforeEach(() => {
  window.localStorage = undefined
  window.sessionStorage = undefined
  console.warn = jest.fn()
})

afterEach(() => {
  jest.clearAllMocks()
  jest.resetModules()
  global.window = previousWindow
  jest.restoreAllMocks()
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

  test('Use native localStorage', () => {
    window.localStorage = storageMock
    const safeLocalStorage = new SafeStorage('localStorage')

    expect(SafeStorage.isNativeStorageSupported('localStorage')).toBe(true)
    expect(safeLocalStorage.isNativeStorageUsed).toBe(true)
    expect(safeLocalStorage.isInMemoryStorageUsed).toBe(false)
    expect(safeLocalStorage._options).toMatchSnapshot()
  })

  test('Use native sessionStorage', () => {
    window.sessionStorage = storageMock
    const safeSessionStorage = new SafeStorage('sessionStorage')

    expect(SafeStorage.isNativeStorageSupported('sessionStorage')).toBe(true)
    expect(safeSessionStorage.isNativeStorageUsed).toBe(true)
    expect(safeSessionStorage.isInMemoryStorageUsed).toBe(false)
  })

  test('Pass custom error message', () => {
    const errorMessage = 'Custom error message'
    const safeLocalStorage = new SafeStorage('localStorage', { errorMessage })

    expect(safeLocalStorage._options.errorMessage).toBe(errorMessage)
  })

  test('Handle AccessDenied error', () => {
    const errorMessage =
      'Uncaught DOMException: Failed to read the "localStorage" property from "Window": Access is denied for this document.'

    delete global.window

    global.window = new Proxy(previousWindow, {
      get(obj, prop) {
        if (['localStorage', 'sessionStorage'].includes(prop)) {
          throw new Error(errorMessage)
        }

        if (prop in obj) {
          return obj[prop]
        }

        return undefined
      },
    })

    const safeSessionStorage = new SafeStorage('sessionStorage')

    expect(safeSessionStorage.isInMemoryStorageUsed).toBe(true)
    expect(safeSessionStorage.isNativeStorageUsed).toBe(false)
    expect(SafeStorage.isNativeStorageSupported('sessionStorage')).toBe(false)

    const safeLocalStorage = new SafeStorage('localStorage')

    expect(safeLocalStorage.isInMemoryStorageUsed).toBe(false)
    expect(safeLocalStorage.isNativeStorageUsed).toBe(false)
    expect(SafeStorage.isNativeStorageSupported('localStorage')).toBe(false)
  })
})

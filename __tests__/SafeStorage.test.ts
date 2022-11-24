import storageMock from '../src/storageMock'
import { createSafeLocalStorage, createSafeSessionStorage } from '../src'
import SafeStorage from '../src/SafeStorage'

// jest.mock('./helpers/storage')

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
    }).toThrow('Please provide one of storages: localStorage, sessionStorage')

    expect(() => {
      new SafeStorage('wrongStorage')
    }).toThrow(
      '"wrongStorage" is not supported. use one of these storages: localStorage, sessionStorage'
    )
  })

  test('Use native localStorage', () => {
    window.localStorage = storageMock
    const safeLocalStorage = createSafeLocalStorage()

    expect(SafeStorage.isNativeStorageSupported('localStorage')).toBe(true)
    expect(safeLocalStorage.isNativeStorageUsed).toBe(true)
    expect(safeLocalStorage.isInMemoryStorageUsed).toBe(false)
    expect(safeLocalStorage._options).toMatchSnapshot()

    safeLocalStorage.setItem('test-1', 423)
    safeLocalStorage.setItem('test-2', 481)
    expect(safeLocalStorage.getItem('test-1')).toBe('423')
    expect(safeLocalStorage.getItem('test-3')).toBe(null)
    expect(safeLocalStorage.key(0)).toBe('test-1')

    safeLocalStorage.removeItem('test-1')
    expect(safeLocalStorage.key(0)).toBe('test-2')
    expect(safeLocalStorage.length).toBe(1)

    safeLocalStorage.clear()
    expect(safeLocalStorage.length).toBe(0)
  })

  test('Use native sessionStorage', () => {
    window.sessionStorage = storageMock
    const safeSessionStorage = createSafeSessionStorage()

    expect(SafeStorage.isNativeStorageSupported('sessionStorage')).toBe(true)
    expect(safeSessionStorage.isNativeStorageUsed).toBe(true)
    expect(safeSessionStorage.isInMemoryStorageUsed).toBe(false)

    safeSessionStorage.setItem('test-1', 423)
    safeSessionStorage.setItem('test-2', 481)
    expect(safeSessionStorage.getItem('test-1')).toBe('423')
    expect(safeSessionStorage.getItem('test-3')).toBe(null)
    expect(safeSessionStorage.key(0)).toBe('test-1')

    safeSessionStorage.removeItem('test-1')
    expect(safeSessionStorage.key(0)).toBe('test-2')
    expect(safeSessionStorage.length).toBe(1)

    safeSessionStorage.clear()
    expect(safeSessionStorage.length).toBe(0)
  })

  test('Pass custom error message', () => {
    const errorMessage = 'Custom error message'
    const safeLocalStorage = createSafeLocalStorage({ errorMessage })

    expect(safeLocalStorage._options.errorMessage).toBe(errorMessage)
  })

  test('Handle AccessDenied error', () => {
    const domExceptionMessage =
      'Uncaught DOMException: Failed to read the "localStorage" property from "Window": Access is denied for this document.'

    delete global.window

    global.window = new Proxy(previousWindow, {
      get(obj, prop) {
        if (['localStorage', 'sessionStorage'].includes(prop)) {
          throw new Error(domExceptionMessage)
        }

        if (prop in obj) {
          return obj[prop]
        }

        return undefined
      },
    })

    const safeLocalStorage = createSafeLocalStorage()

    expect(safeLocalStorage.isInMemoryStorageUsed).toBe(false)
    expect(safeLocalStorage.isNativeStorageUsed).toBe(false)
    expect(SafeStorage.isNativeStorageSupported('localStorage')).toBe(false)
    expect(console.warn).toHaveBeenLastCalledWith(
      'Looks like you\'ve disabled "localStorage". Enable it to avoid this warning.'
    )

    const safeSessionStorage = createSafeSessionStorage()

    expect(safeSessionStorage.isInMemoryStorageUsed).toBe(true)
    expect(safeSessionStorage.isNativeStorageUsed).toBe(false)
    expect(SafeStorage.isNativeStorageSupported('sessionStorage')).toBe(false)
    expect(console.warn).toHaveBeenLastCalledWith(
      'Looks like you\'ve disabled "sessionStorage". Enable it to avoid this warning.'
    )

    const errorMessage = 'Custom error message'
    createSafeLocalStorage({ errorMessage })
    expect(console.warn).toHaveBeenLastCalledWith(errorMessage)
  })
})

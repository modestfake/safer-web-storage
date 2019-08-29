import inMemoryStorage from '../src/inMemoryStorage'

beforeEach(() => {
  inMemoryStorage.clear()
})

describe('inMemoryStorage', () => {
  test('initial data', () => {
    expect(inMemoryStorage._data).toEqual({})
    expect(inMemoryStorage.length).toBe(0)
  })

  test('setItem + getItem', () => {
    inMemoryStorage.setItem('key-1', 'value-1')
    inMemoryStorage.setItem('key-2', 'value-2')

    expect(inMemoryStorage.getItem('key-1')).toBe(
      inMemoryStorage._data['key-1']
    )
    expect(inMemoryStorage.getItem('key-2')).toBe(
      inMemoryStorage._data['key-2']
    )
    expect(inMemoryStorage.getItem('wrong-key')).toBeNull()
    expect(inMemoryStorage.length).toBe(2)
  })

  test('removeItem', () => {
    inMemoryStorage.setItem('key-1', 'value-1')
    inMemoryStorage.setItem('key-2', 'value-2')

    inMemoryStorage.removeItem('key-1')

    expect(inMemoryStorage.getItem('key-1')).toBeNull()
    expect(inMemoryStorage.getItem('key-2')).toBe(
      inMemoryStorage._data['key-2']
    )
    expect(inMemoryStorage.length).toBe(1)
  })

  test('clear', () => {
    inMemoryStorage.setItem('key-1', 'value-1')
    inMemoryStorage.setItem('key-2', 'value-2')

    expect(inMemoryStorage.length).toBe(2)

    inMemoryStorage.clear()

    expect(inMemoryStorage.length).toBe(0)
    expect(inMemoryStorage._data).toEqual({})
  })
})

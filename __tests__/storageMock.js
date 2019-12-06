import storageMock from '../src/storageMock'

const errorMessage = 'Test error message'

test('Storage mock', () => {
  console.warn = jest.fn()
  const storage = storageMock({ errorMessage })

  const result = storage.getItem('test')
  expect(console.warn).toHaveBeenCalledWith(errorMessage)
  expect(result).toBeNull()

  storage.setItem('test')
  expect(console.warn).toHaveBeenCalledWith(errorMessage)

  storage.removeItem('test')
  expect(console.warn).toHaveBeenCalledWith(errorMessage)

  storage.clear()
  expect(console.warn).toHaveBeenCalledWith(errorMessage)

  expect(storage.length).toBe(0)
  expect(console.warn).toHaveBeenCalledWith(errorMessage)

  console.warn.mockRestore()
})

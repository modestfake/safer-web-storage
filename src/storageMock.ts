/* eslint-disable @typescript-eslint/no-unused-vars */
import { Options } from './SafeStorage'

class MockedStorage implements Storage {
  errorMessage: string

  constructor(options: Required<Options>) {
    this.errorMessage = options.errorMessage
  }

  getItem(key: string) {
    console.warn(this.errorMessage)

    return null
  }

  setItem(key: string) {
    console.warn(this.errorMessage)

    return null
  }

  removeItem(key: string) {
    console.warn(this.errorMessage)

    return null
  }

  key() {
    console.warn(this.errorMessage)

    return null
  }

  clear() {
    console.warn(this.errorMessage)

    return null
  }

  get length() {
    console.warn(this.errorMessage)

    return 0
  }
}

export default function (options: Required<Options>) {
  return new MockedStorage(options)
}

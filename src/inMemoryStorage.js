class InMemoryStorage {
  constructor() {
    this._data = {}
    this.length = 0
  }

  getItem(key) {
    if (key in this._data) {
      return this._data[key]
    }

    return null
  }

  setItem(key, value) {
    this._data[key] = value
    this.length = Object.keys(this._data).length
  }

  removeItem(key) {
    if (key in this._data) {
      delete this._data[key]
    }

    this.length = Object.keys(this._data).length

    return null
  }

  key(index) {
    if (index === undefined) {
      throw new TypeError(
        "Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present."
      )
    }

    const key = Object.keys(this._data)[index]

    if (key !== undefined) {
      return key
    }

    return null
  }

  clear() {
    this._data = {}
    this.length = 0
  }
}

export default new InMemoryStorage()

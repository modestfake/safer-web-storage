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

  clear() {
    this._data = {}
    this.length = 0
  }
}

export default new InMemoryStorage()

export default function getStorage({ errorMessage }) {
  return {
    getItem() {
      console.warn(errorMessage)

      return null
    },
    setItem() {
      console.warn(errorMessage)
    },
    removeItem() {
      console.warn(errorMessage)
    },
    clear() {
      console.warn(errorMessage)
    },
    get length() {
      console.warn(errorMessage)

      return 0
    },
  }
}

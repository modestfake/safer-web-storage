import { createSafeLocalStorage, createSafeSessionStorage } from '../src'

const safeLocaleStorage = createSafeLocalStorage()
const safeSessionStorage = createSafeSessionStorage()

function renderStorageData(storage) {
  return `
    <section>
      <h2>${storage._storageType}</h2>
      <div>isNativeStorageUsed: <em>${storage.isNativeStorageUsed}</em></div>
      <div>isInMemoryStorageUsed: <em>${storage.isInMemoryStorageUsed}</em></div>
    </section>
  `
}

function renderApp() {
  const html =
    renderStorageData(safeLocaleStorage) + renderStorageData(safeSessionStorage)

  document.getElementById('root').innerHTML = html
}

renderApp()

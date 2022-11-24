import { createSafeLocalStorage, createSafeSessionStorage } from '../src'

const safeLocaleStorage = createSafeLocalStorage()
const safeSessionStorage = createSafeSessionStorage()

function renderStorageData(storage) {
  return `
    <section>
      <h2>${storage._storageType}</h2>
      <div>isNativeStorageUsed: <code>${storage.isNativeStorageUsed}</code></div>
      <div>isInMemoryStorageUsed: <code>${storage.isInMemoryStorageUsed}</code></div>
    </section>
    <style>
      code {
        font-size: 0.875em;
        font-family: SFMono-Medium, "SF Mono", "Segoe UI Mono", "Roboto Mono", "Ubuntu Mono", Menlo, Consolas, Courier, monospace;
        font-weight: normal;
        background-color: #F4F5F7;
        color: #FF5630;
        border-style: none;
        border-radius: 3px;
        padding: 2px 0.5ch;
        overflow: auto;
        overflow-wrap: break-word;
        white-space: pre-wrap;
      }
    </style>
  `
}

function renderApp() {
  const html =
    renderStorageData(safeLocaleStorage) + renderStorageData(safeSessionStorage)

  document.getElementById('root').innerHTML = html
}

renderApp()

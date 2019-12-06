# safer-web-storage

Browsers that support `localStorage` and `sessionStorage` will have a property on the window object named respectively. However, for various reasons, just asserting that property exists may throw exceptions. If it does exist, that is still no guarantee that localStorage is actually available, as various browsers offer settings that disable storages. So a browser may support localStorage, but not make it available to the scripts on the page. One example of that is Safari, which in Private Browsing mode gives us an empty localStorage object with a quota of zero, effectively making it unusable.

## Installation and Usage

```bash
npm install safer-web-storage
```

```javascript
import * as SafeStorage from 'safer-web-storage'

const safeLocalStorage = SafeStorage.createSafeLocalStorage()
const safeSessionStorage = SafeStorage.createSafeSessionStorage()

safeLocalStorage.getItem('apples')
safeSessionStorage.seItem('pineapples', 20)
```

If either `window.sessionStorage` or its methods are not accessible, it swaps to in-memory storage.

This wrapper supports all methods and properties of [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API):

- `getItem`
- `setItem`
- `removeItem`
- `key`
- `clear`
- `length`

## API

### createSafeLocalStorage(options) => Storage

### createSafeSessionStorage(options) => Storage

You can pass the following properties to `options`:

| Name           | Type   | Default                                                                      | Description                                                                |
| -------------- | ------ | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `errorMessage` | String | Looks like you've disabled \<StorageType\>. Enable it to avoid this warning. | Error message printed to the browser console when storage is not available |

### Storage public API

| Name                    | Type   | Details           |
| ----------------------- | ------ | ----------------- |
| `isNativeStorageUsed`   | getter | Returns `Boolean` |
| `isInMemoryStorageUsed` | getter | Returns `Boolean` |

## Development

To test the library in a browser run:

```bash
npm install
npm start
```

## Publish

```bash
npm ci
npm test
npm run build
npm version [patch|minor|major]
npm publish
```

export const storageTypes = {
  sessionStorage: 'sessionStorage',
  localStorage: 'localStorage',
}

const storagesList = Object.values(storageTypes).join(', ')

export function validateStorageType(storageType) {
  if (!storageType) {
    throw new Error(`Please provide one of storages: ${storagesList}`)
  }
  if (!Object.values(storageTypes).includes(storageType)) {
    throw new Error(
      `"${storageType}" is not supported. use one of these storages: ${storagesList}`
    )
  }
}

export function getErrorMessage(storageType) {
  return `Looks like you've disabled "${storageType}". Enable it to avoid this warning.`
}

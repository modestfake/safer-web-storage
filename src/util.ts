export type StorageType = 'localStorage' | 'sessionStorage'

const storageTypes: StorageType[] = ['localStorage', 'sessionStorage']
const storagesList = Object.values(storageTypes).join(', ')

export function validateStorageType(storageType: StorageType) {
  if (!storageType) {
    throw new Error(`Please provide one of storages: ${storagesList}`)
  }

  if (!storageTypes.includes(storageType)) {
    throw new Error(
      `"${storageType}" is not supported. use one of these storages: ${storagesList}`
    )
  }
}

export function getErrorMessage(storageType: StorageType) {
  return `Looks like you've disabled "${storageType}". Enable it to avoid this warning.`
}

export function getErrorMessage(storageType) {
  return `Looks like you've disabled "${storageType}". Enable it to avoid this warning.`
}

export const storageTypes = {
  sessionStorage: 'sessionStorage',
  localStorage: 'localStorage',
}

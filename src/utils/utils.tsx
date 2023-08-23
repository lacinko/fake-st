import { isRouteErrorResponse } from 'react-router-dom'

export function errorMessage(error: unknown): string {
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`
  } else if (error instanceof Error) {
    return error.message
  } else if (typeof error === 'string') {
    return error
  } else {
    console.error(error)
    return 'Unknown error'
  }
}

export function capitalizeFirstChar(str: string) {
  if (str.length === 0) {
    return str
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function formatNumberToCurrency(num: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(num)
}

export function flattenObject(obj: object, prefix = ''): object {
  const flattened = {} as Record<string, string | number | Date | boolean>

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === 'object' && value !== null) {
      Object.assign(flattened, flattenObject(value))
    } else {
      flattened[newKey] = value
    }
  }

  return flattened
}

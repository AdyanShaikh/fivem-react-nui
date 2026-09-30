import { useCallback } from 'react'
import { fetchNui } from './fetchNui'

export function useNuiCallback<TResponse = unknown, TPayload = unknown>(
  eventName: string,
) {
  return useCallback(
    (data?: TPayload) => fetchNui<TResponse, TPayload>(eventName, data),
    [eventName],
  )
}

import { useCallback } from 'react'
import { fetchNui, type FetchNuiOptions } from './fetchNui'
import type { NuiCallbacks, NuiCallbackName } from './contracts'

export function useNuiCallback<K extends NuiCallbackName>(
  eventName: K,
  options?: FetchNuiOptions,
) {
  return useCallback(
    (data: NuiCallbacks[K]['request'], mockResponse?: NuiCallbacks[K]['response']) =>
      fetchNui(eventName, data, mockResponse, options),
    [eventName, options],
  )
}

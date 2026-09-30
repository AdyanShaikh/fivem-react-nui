import { isEnvBrowser } from './isEnvBrowser'
import type { NuiCallbackResponse } from './types'

export async function fetchNui<TResponse = unknown, TPayload = unknown>(
  eventName: string,
  data?: TPayload,
): Promise<TResponse> {
  if (isEnvBrowser()) {
    return {
      ok: true,
      data: { event: eventName, ...((data as object) ?? {}) },
    } as TResponse
  }

  const response = await fetch(`https://${GetParentResourceName()}/${eventName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data ?? {}),
  })

  if (!response.ok) {
    throw new Error(`NUI callback failed: ${response.status}`)
  }

  return (await response.json()) as TResponse
}

export type { NuiCallbackResponse }

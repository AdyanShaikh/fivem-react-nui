import { isEnvBrowser } from './isEnvBrowser'

export type NuiCallbackResponse<T> = {
  ok: boolean
  data?: T
  error?: string
}

export async function fetchNui<TResponse = unknown, TPayload = unknown>(
  eventName: string,
  data?: TPayload,
  mockResponse?: TResponse,
): Promise<TResponse> {
  if (isEnvBrowser()) {
    if (mockResponse !== undefined) return mockResponse
    return { ok: true } as TResponse
  }

  const response = await fetch(`https://${GetParentResourceName()}/${eventName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data ?? {}),
  })
  if (!response.ok) throw new Error(`NUI callback failed: ${response.status}`)
  return (await response.json()) as TResponse
}

export function sendNuiMessage<TPayload = Record<string, unknown>>(
  action: string,
  payload?: TPayload,
): void {
  window.postMessage({ action, ...(payload as object) }, '*')
}

export const closeNui = () => fetchNui('ui:close')

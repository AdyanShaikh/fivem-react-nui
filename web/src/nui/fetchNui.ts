import { isEnvBrowser } from './isEnvBrowser'
import type { NuiCallbacks, NuiCallbackName } from './contracts'

export type NuiCallbackResponse<T> = {
  ok: boolean
  data?: T
  error?: string
}

export type FetchNuiOptions = {
  timeoutMs?: number
}

const DEFAULT_TIMEOUT_MS = 10_000

export async function fetchNui<K extends NuiCallbackName>(
  eventName: K,
  data: NuiCallbacks[K]['request'],
  mockResponse?: NuiCallbacks[K]['response'],
  options: FetchNuiOptions = {},
): Promise<NuiCallbacks[K]['response']> {
  if (isEnvBrowser()) {
    if (mockResponse !== undefined) return mockResponse
    return { ok: true } as NuiCallbacks[K]['response']
  }

  const controller = new AbortController()
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(`https://${GetParentResourceName()}/${eventName}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data ?? {}),
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`NUI callback "${String(eventName)}" failed: HTTP ${response.status}`)
    }

    return (await response.json()) as NuiCallbacks[K]['response']
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(`NUI callback "${String(eventName)}" timed out after ${timeoutMs}ms`)
    }
    throw error
  } finally {
    window.clearTimeout(timeout)
  }
}

export function sendNuiMessage<K extends keyof import('./contracts').NuiEvents>(
  action: K,
  payload: import('./contracts').NuiEvents[K],
): void {
  window.postMessage({ action, ...(payload ?? {}) }, '*')
}

export const closeNui = () => fetchNui('ui:close', undefined)

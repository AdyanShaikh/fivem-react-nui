export type { NuiCallbacks, NuiCallbackName, NuiEvents, NuiEventName } from './contracts'

export type NuiCallbackResponse<T> = {
  ok: boolean
  data?: T
  error?: string
}

export type NuiEventHandler<T = unknown> = (payload: T) => void

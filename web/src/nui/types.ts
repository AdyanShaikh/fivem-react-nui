export type NuiCallbackResponse<T> = {
  ok: boolean
  data?: T
  error?: string
}

export type NuiEventHandler<T = unknown> = (payload: T) => void

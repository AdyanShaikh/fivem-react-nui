export type NuiCallbackResponse<T> = {
  ok: boolean
  data?: T
  error?: string
}

export type NuiEventMap = Record<string, unknown>

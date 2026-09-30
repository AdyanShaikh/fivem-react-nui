/**
 * Add your resource-specific NUI contract entries here.
 *
 * Keeping callback/event shapes in one place gives every resource
 * compile-time safety without coupling this boilerplate to a framework.
 */
export interface NuiCallbacks {
  'ui:close': {
    request: undefined
    response: { ok: boolean }
  }
  'nui:ping': {
    request: { name: string; timestamp: number }
    response: { ok: boolean; message?: string; received?: unknown }
  }
}

export interface NuiEvents {
  'ui:open': { page?: string }
  'ui:close': undefined
}

export type NuiCallbackName = keyof NuiCallbacks
export type NuiEventName = keyof NuiEvents

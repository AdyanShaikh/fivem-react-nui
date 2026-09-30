import { useEffect, useRef } from 'react'
import type { NuiEventHandler } from './types'

export function useNuiEvent<TPayload = unknown>(
  eventName: string,
  handler: NuiEventHandler<TPayload>,
): void {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const data = event.data as { action?: string } & TPayload
      if (data?.action === eventName) handlerRef.current(data)
    }
    window.addEventListener('message', listener)
    return () => window.removeEventListener('message', listener)
  }, [eventName])
}

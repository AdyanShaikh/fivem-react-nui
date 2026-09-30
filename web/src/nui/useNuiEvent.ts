import { useEffect, useRef } from 'react'
import type { NuiEvents, NuiEventName } from './contracts'

export function useNuiEvent<K extends NuiEventName>(
  eventName: K,
  handler: (payload: NuiEvents[K]) => void,
): void {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const data = event.data as { action?: K } & NuiEvents[K]
      if (data?.action !== eventName) return
      handlerRef.current(data as NuiEvents[K])
    }

    window.addEventListener('message', listener)
    return () => window.removeEventListener('message', listener)
  }, [eventName])
}

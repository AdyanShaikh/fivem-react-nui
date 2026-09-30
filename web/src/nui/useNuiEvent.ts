import { useEffect } from 'react'

export function useNuiEvent<TPayload = unknown>(
  eventName: string,
  handler: (payload: TPayload) => void,
): void {
  useEffect(() => {
    const listener = (event: MessageEvent<TPayload>) => {
      const data = event.data as TPayload & { action?: string }

      if (data && typeof data === 'object' && data.action === eventName) {
        handler(data)
      }
    }

    window.addEventListener('message', listener)
    return () => window.removeEventListener('message', listener)
  }, [eventName, handler])
}

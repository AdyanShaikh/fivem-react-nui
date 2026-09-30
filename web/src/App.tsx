import { useCallback, useState } from 'react'
import { Activity, Gamepad2, Send, X } from 'lucide-react'
import { Button } from './components/ui/Button'
import { Card } from './components/ui/Card'
import { fetchNui, isEnvBrowser, useNuiEvent } from './nui'

type PingResponse = {
  ok: boolean
  message: string
  received?: unknown
}

function App() {
  const [visible, setVisible] = useState(true)
  const [status, setStatus] = useState('Ready')

  const handleClose = useCallback(() => {
    setVisible(false)
    void fetchNui('ui:close')
  }, [])

  useNuiEvent<{ action: string }>('ui:open', () => setVisible(true))
  useNuiEvent<{ action: string }>('ui:close', () => setVisible(false))

  const ping = async () => {
    setStatus('Sending...')
    try {
      const result = await fetchNui<PingResponse>('nui:ping', { timestamp: Date.now() })
      setStatus(result.message ?? 'Success')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Request failed')
    }
  }

  if (!visible) {
    return isEnvBrowser() ? (
      <button
        onClick={() => setVisible(true)}
        className="fixed bottom-5 left-5 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-zinc-300 shadow-xl"
      >
        Open NUI preview
      </button>
    ) : null
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black/35 p-6">
      <Card className="w-full max-w-xl overflow-hidden">
        <header className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
          <div>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Gamepad2 className="size-4" />
              FiveM React NUI
            </div>
            <h1 className="mt-1 text-xl font-semibold text-white">Boilerplate Preview</h1>
          </div>
          <Button variant="ghost" aria-label="Close" onClick={handleClose}>
            <X className="size-5" />
          </Button>
        </header>

        <section className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
            <div className="flex items-center gap-2 text-zinc-400">
              <Activity className="size-4" />
              <span className="text-sm">Runtime</span>
            </div>
            <p className="mt-2 font-medium text-white">{isEnvBrowser() ? 'Browser' : 'FiveM NUI'}</p>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
            <div className="flex items-center gap-2 text-zinc-400">
              <Send className="size-4" />
              <span className="text-sm">NUI callback</span>
            </div>
            <p className="mt-2 font-medium text-white">{status}</p>
          </div>
        </section>

        <footer className="flex gap-3 border-t border-zinc-800 p-6">
          <Button onClick={() => void ping()}>Test callback</Button>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </footer>
      </Card>
    </main>
  )
}

export default App

import { useCallback, useState } from 'react'
import { Activity, Gamepad2, Send, X } from 'lucide-react'
import { Badge } from './components/ui/Badge'
import { Button } from './components/ui/Button'
import { Card } from './components/ui/Card'
import { Input } from './components/ui/Input'
import { Spinner } from './components/ui/Spinner'
import { closeNui, fetchNui, isEnvBrowser, useNuiEvent } from './nui'

type PingResponse = { ok: boolean; message?: string; received?: unknown }

export default function App() {
  const [visible, setVisible] = useState(true)
  const [status, setStatus] = useState('Ready')
  const [name, setName] = useState('FiveM')

  const hide = useCallback(() => {
    setVisible(false)
    void closeNui()
  }, [])

  useNuiEvent('ui:open', () => setVisible(true))
  useNuiEvent('ui:close', () => setVisible(false))

  const ping = async () => {
    setStatus('Sending...')
    try {
      const result = await fetchNui<PingResponse>('nui:ping', { name, timestamp: Date.now() }, {
        ok: true,
        message: 'pong',
      })
      setStatus(result.message ?? 'Success')
    } catch {
      setStatus('Request failed')
    }
  }

  if (!visible) {
    return isEnvBrowser() ? (
      <button onClick={() => setVisible(true)} className="fixed bottom-5 left-5 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-zinc-300 shadow-xl">
        Open NUI preview
      </button>
    ) : null
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black/35 p-6">
      <Card className="w-full max-w-xl overflow-hidden">
        <header className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
          <div>
            <div className="flex items-center gap-2 text-sm text-zinc-400"><Gamepad2 className="size-4" />FiveM React NUI</div>
            <div className="mt-1 flex items-center gap-2"><h1 className="text-xl font-semibold text-white">Boilerplate Preview</h1><Badge variant="success">Ready</Badge></div>
          </div>
          <Button variant="ghost" aria-label="Close" onClick={hide}><X className="size-5" /></Button>
        </header>

        <section className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
            <div className="flex items-center gap-2 text-zinc-400"><Activity className="size-4" /><span className="text-sm">Runtime</span></div>
            <p className="mt-2 font-medium text-white">{isEnvBrowser() ? 'Browser' : 'FiveM NUI'}</p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
            <div className="flex items-center gap-2 text-zinc-400"><Send className="size-4" /><span className="text-sm">Callback</span></div>
            <p className="mt-2 font-medium text-white">{status === 'Sending...' ? <span className="inline-flex items-center gap-2"><Spinner />Sending...</span> : status}</p>
          </div>
        </section>

        <section className="space-y-2 px-6 pb-6">
          <label className="text-sm text-zinc-400" htmlFor="name">Payload value</label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </section>

        <footer className="flex gap-3 border-t border-zinc-800 p-6">
          <Button onClick={() => void ping()}>Test callback</Button>
          <Button variant="secondary" onClick={hide}>Close</Button>
        </footer>
      </Card>
    </main>
  )
}

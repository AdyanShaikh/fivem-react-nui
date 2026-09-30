import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import { Button } from './ui/Button'
import { Card } from './ui/Card'

type Props = { children: ReactNode }
type State = { hasError: boolean; error?: Error }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[FiveM NUI] Unhandled UI error', error, info.componentStack)
  }

  private reset = (): void => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="flex min-h-screen items-center justify-center bg-black/40 p-6">
        <Card className="w-full max-w-md p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-400" />
            <div>
              <h1 className="font-semibold text-white">Interface error</h1>
              <p className="mt-1 text-sm text-zinc-400">
                The UI hit an unexpected error. Reset it and try again.
              </p>
              {this.state.error?.message && (
                <pre className="mt-4 max-h-32 overflow-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-400">
                  {this.state.error.message}
                </pre>
              )}
            </div>
          </div>
          <Button className="mt-5" onClick={this.reset}>
            <RotateCcw className="size-4" />
            Reset UI
          </Button>
        </Card>
      </main>
    )
  }
}

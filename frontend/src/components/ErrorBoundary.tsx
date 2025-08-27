import { Component, ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(err: unknown) { console.error('ErrorBoundary caught', err) }
  render() {
    if (this.state.hasError) {
      return (
        <div className="h-dvh grid place-items-center">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold">Something went wrong</h1>
            <p className="text-gray-600 dark:text-gray-400">Please refresh the page.</p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

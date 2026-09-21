import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  fallback: ReactNode
  children: ReactNode
}

interface State {
  hasError: boolean
}

/** Isolates the WebGL canvas so a renderer failure never takes the page down. */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.warn('3D scene failed, showing fallback.', error, info)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

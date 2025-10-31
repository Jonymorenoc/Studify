import React from 'react'

type State = { hasError: boolean; error?: unknown }

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  constructor(props: React.PropsWithChildren) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, error }
  }
  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.error('Studify ErrorBoundary', error)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h1 style={{ fontWeight: 700, marginBottom: 8 }}>Se produjo un error</h1>
          <p style={{ marginBottom: 16 }}>Recarga la pagina o vuelve al inicio.</p>
          <a href="#/" style={{ color: '#7f6bff', fontWeight: 600 }}>Ir a inicio</a>
        </div>
      )
    }
    return this.props.children
  }
}


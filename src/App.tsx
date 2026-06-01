import { useState } from 'react'
import Builder from './components/Builder'
import LandingPage from './components/LandingPage'

function App() {
  const [page, setPage] = useState<'landing' | 'builder'>('landing')

  if (page === 'builder') return <Builder onGoHome={() => setPage('landing')} />

  return <LandingPage onGetStarted={() => setPage('builder')} />
}

export default App

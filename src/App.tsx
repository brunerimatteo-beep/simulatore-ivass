import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './pages/Home'
import Simulazione from './pages/Simulazione'
import EsameAttivo from './pages/EsameAttivo'
import Risultato from './pages/Risultato'
import Allenamento from './pages/Allenamento'
import Paywall from './pages/Paywall'
import Successo from './pages/Successo'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simulazione" element={<Simulazione />} />
          <Route path="/esame/:sessioneId" element={<EsameAttivo />} />
          <Route path="/risultato/:sessioneId" element={<Risultato />} />
          <Route path="/allenamento" element={<Allenamento />} />
          <Route path="/paywall" element={<Paywall />} />
          <Route path="/successo" element={<Successo />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
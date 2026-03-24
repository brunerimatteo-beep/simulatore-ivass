import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './pages/Home'
import Simulazione from './pages/Simulazione'
import EsameAttivo from './pages/EsameAttivo'
import Risultato from './pages/Risultato'
import Allenamento from './pages/Allenamento'
import Login from './pages/Login'
import Info from './pages/Info'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/successo" element={<Navigate to="/" replace />} />
          <Route path="/info" element={<Info />} />

          <Route path="/simulazione" element={<Simulazione />} />
          <Route path="/esame/:sessioneId" element={<EsameAttivo />} />
          <Route path="/risultato/:sessioneId" element={<Risultato />} />
          <Route path="/allenamento" element={<Allenamento />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
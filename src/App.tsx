import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './pages/Home'
import Simulazione from './pages/Simulazione'
import EsameAttivo from './pages/EsameAttivo'
import Risultato from './pages/Risultato'
import Allenamento from './pages/Allenamento'
import Paywall from './pages/Paywall'
import Successo from './pages/Successo'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/paywall" element={<Paywall />} />
          <Route path="/successo" element={<Successo />} />

          <Route path="/simulazione" element={
            <ProtectedRoute><Simulazione /></ProtectedRoute>
          } />
          <Route path="/esame/:sessioneId" element={
            <ProtectedRoute><EsameAttivo /></ProtectedRoute>
          } />
          <Route path="/risultato/:sessioneId" element={
            <ProtectedRoute><Risultato /></ProtectedRoute>
          } />
          <Route path="/allenamento" element={
            <ProtectedRoute><Allenamento /></ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
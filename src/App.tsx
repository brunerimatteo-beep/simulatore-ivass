import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './pages/Home'
import Simulazione from './pages/Simulazione'
import EsameAttivo from './pages/EsameAttivo'
import Risultato from './pages/Risultato'
import Allenamento from './pages/Allenamento'
import NoteLegali from './pages/NoteLegali.tsx'
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import DonationWidget from './components/DonationWidget'; // Importa il nuovo widget

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* Il widget è fuori da Routes: rimane fisso a sinistra in ogni pagina */}
        <DonationWidget /> 

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/successo" element={<Navigate to="/" replace />} />
          <Route path="/note-legali" element={<NoteLegali />} />
          <Route path="/simulazione" element={<Simulazione />} />
          <Route path="/esame/:sessioneId" element={<EsameAttivo />} />
          <Route path="/risultato/:sessioneId" element={<Risultato />} />
          <Route path="/allenamento" element={<Allenamento />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
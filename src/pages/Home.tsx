import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-base font-semibold text-gray-900">SimulatoreIVASS</span>
            <span className="ml-2 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium"></span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto px-6 w-full">

        <div className="py-14 border-b border-gray-100">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            L'esame IVASS boccia<br />chi studia senza simulare.
          </h1>
          <p className="text-lg text-gray-500 mb-8 leading-relaxed">
            Le domande reali sono 2.292. Il timer scorre. Allenarti su appunti non basta — devi allenarti sull'esame stesso.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/simulazione')}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-blue-700 transition-colors"
            >
              Inizia ora
            </button>
            <button
              onClick={() => document.getElementById('come-funziona')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-gray-500 px-6 py-3 rounded-xl font-medium text-base hover:text-gray-700 border border-gray-200 hover:border-gray-300 transition-colors"
            >
              Come funziona
            </button>
          </div>
        </div>

        <div id="come-funziona" className="py-12 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">Come funziona</h2>
          <div className="space-y-8">
            {[
              {
                n: '1',
                titolo: 'Scegli il modulo',
                testo: 'Assicurativo (50 domande · 75 min), Riassicurativo (20 domande · 30 min) o Completo (70 domande · 105 min). O allenarti liberamente su una materia specifica.',
              },
              {
                n: '2',
                titolo: 'Simula in condizioni reali',
                testo: 'Timer, domande casuali estratte dal database ufficiale IVASS, stessa struttura dell\'esame. Nessuna facilitazione — esattamente come il giorno dell\'esame.',
              },
              {
                n: '3',
                titolo: 'Scopri dove sbagliavi',
                testo: 'Analisi dettagliata per materia, percentuale di risposte corrette, revisione di ogni domanda sbagliata con la risposta corretta evidenziata.',
              },
            ].map(step => (
              <div key={step.n} className="flex gap-5">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                  {step.n}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{step.titolo}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.testo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="py-12 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Moduli disponibili</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { titolo: 'Assicurativo', dom: '50 domande', min: '75 minuti', color: 'blue' },
              { titolo: 'Riassicurativo', dom: '20 domande', min: '30 minuti', color: 'purple' },
              { titolo: 'Completo', dom: '70 domande', min: '105 minuti', color: 'green' },
            ].map(m => (
              <div key={m.titolo} className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors">
                <div className="font-semibold text-gray-900 text-sm mb-2">{m.titolo}</div>
                <div className="text-xs text-gray-400">{m.dom} · {m.min}</div>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <div className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors">
              <div className="font-semibold text-gray-900 text-sm mb-1">Allenamento libero</div>
              <div className="text-xs text-gray-400">Scegli materia, tipo e numero di domande. Nessun timer.</div>
            </div>
          </div>
        </div>

        <div className="py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Pronto a iniziare?</h2>
          <p className="text-gray-500 mb-6 text-sm">Inizia subito a simulare.</p>
          <button
            onClick={() => navigate('/simulazione')}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Inizia ora →
          </button>
        </div>

      </main>

      <Footer />

    </div>
  )
}
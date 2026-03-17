import { useNavigate, useParams, useLocation } from 'react-router-dom'
import type { Domanda } from '../types'
import { segnaTrialUsato } from '../lib/trial'

export default function Risultato() { segnaTrialUsato()
  const navigate = useNavigate()
  useParams()
  const location = useLocation()

  const {
    corrette = 0,
    errate = 0,
    omesse = 0,
    punteggio = 0,
    superata = false,
    domande = [] as Domanda[],
    risposteDate = {} as Record<number, string | null>,
    isAllenamento = false,
  } = location.state || {}



  // Breakdown per materia
  const perMateria: Record<string, { totale: number; corrette: number; materia: string }> = {}
  domande.forEach((d: Domanda) => {
    if (!perMateria[d.materia_codice]) {
      perMateria[d.materia_codice] = { totale: 0, corrette: 0, materia: d.materia }
    }
    perMateria[d.materia_codice].totale++
    if (risposteDate[d.id] === d.risposta_corretta) {
      perMateria[d.materia_codice].corrette++
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-xl font-bold text-blue-700">SimulatoreIVASS</h1>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-8 w-full">

        {/* Esito principale */}
        <div className={`rounded-2xl p-8 text-center mb-6 ${superata ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
          <div className="text-5xl mb-3">{superata ? '🎉' : '📚'}</div>
          <div className={`text-6xl font-black mb-2 ${superata ? 'text-green-600' : 'text-red-600'}`}>
            {punteggio}/100
          </div>
          <div className={`text-2xl font-bold mb-2 ${superata ? 'text-green-700' : 'text-red-700'}`}>
            {isAllenamento ? 'Allenamento completato' : superata ? 'PROMOSSO ✓' : 'NON SUPERATO ✗'}
          </div>
          {!isAllenamento && (
            <p className={`text-sm ${superata ? 'text-green-600' : 'text-red-600'}`}>
              {superata ? 'Hai superato la soglia minima di 60/100' : 'La soglia minima è 60/100 — continua ad allenarti!'}
            </p>
          )}
        </div>

        {/* Statistiche */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-3xl font-black text-green-600">{corrette}</div>
            <div className="text-xs text-gray-500 mt-1">Corrette</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-3xl font-black text-red-500">{errate}</div>
            <div className="text-xs text-gray-500 mt-1">Errate</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-3xl font-black text-gray-400">{omesse}</div>
            <div className="text-xs text-gray-500 mt-1">Omesse</div>
          </div>
        </div>

        {/* Breakdown per materia */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Risultati per materia</h3>
          <div className="space-y-3">
            {Object.entries(perMateria).map(([codice, dati]) => {
              const perc = Math.round((dati.corrette / dati.totale) * 100)
              return (
                <div key={codice}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-700 flex-1 mr-4 leading-tight">{dati.materia}</span>
                    <span className="text-sm font-bold text-gray-900 flex-shrink-0">
                      {dati.corrette}/{dati.totale} ({perc}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${perc >= 60 ? 'bg-green-500' : 'bg-red-400'}`}
                      style={{ width: `${perc}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Revisione domande sbagliate */}
        {(errate > 0 || omesse > 0) && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">🔍 Domande da ripassare</h3>
            <div className="space-y-4">
              {domande
                .filter((d: Domanda) => risposteDate[d.id] !== d.risposta_corretta)
                .map((d: Domanda) => (
                  <div key={d.id} className="border border-gray-100 rounded-lg p-4">
                    <p className="text-sm text-gray-800 font-medium mb-2">{d.domanda}</p>
                    {risposteDate[d.id] && (
                      <p className="text-xs text-red-600 mb-1">
                        ✗ Tua risposta: {risposteDate[d.id]}
                      </p>
                    )}
                    {!risposteDate[d.id] && (
                      <p className="text-xs text-gray-400 mb-1">— Domanda saltata</p>
                    )}
                    <p className="text-xs text-green-700 font-medium">
                      ✓ Risposta corretta: {d.risposta_corretta}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Bottoni */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/simulazione')}
            className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Nuova simulazione →
          </button>
        </div>

      </main>
    </div>
  )
}
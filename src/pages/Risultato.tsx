import { useNavigate, useLocation } from 'react-router-dom'
import { segnaTrialUsato } from '../lib/trial'
import Footer from '../components/Footer'
import type { Domanda } from '../types'

export default function Risultato() {
  const navigate = useNavigate()
  const location = useLocation()

  const {
    corrette = 0,
    errate = 0,
    omesse = 0,
    punteggio = 0,
    superata: _superata = false,
    domande = [] as Domanda[],
    risposteDate = {} as Record<number, string | null>,
    isAllenamento = false,
  } = location.state || {}

  segnaTrialUsato()

  const totale = domande.length
  const punteggioTotale = corrette * 1 + errate * (-0.5)
  const sogliaGrezzo = totale * 0.6
  const mancantiPunti = Math.max(0, sogliaGrezzo - punteggioTotale).toFixed(1)
  const giaPassed = punteggioTotale >= sogliaGrezzo

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
          <button
            onClick={() => navigate('/')}
            className="text-blue-700 font-bold hover:underline text-base"
          >
            SimulatoreIVASS
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full space-y-6">

        {/* Esito principale */}
        <div className={`rounded-2xl p-8 text-center ${
          isAllenamento
            ? 'bg-blue-50 border-2 border-blue-200'
            : giaPassed
            ? 'bg-green-50 border-2 border-green-200'
            : 'bg-red-50 border-2 border-red-200'
        }`}>
          <div className="text-5xl mb-3">
            {isAllenamento ? '🏋️' : giaPassed ? '🎉' : '📚'}
          </div>
          <div className={`text-6xl font-black mb-2 ${
            isAllenamento ? 'text-blue-600' : giaPassed ? 'text-green-600' : 'text-red-600'
          }`}>
            {punteggio}/100
          </div>
          <div className={`text-2xl font-bold mb-2 ${
            isAllenamento ? 'text-blue-700' : giaPassed ? 'text-green-700' : 'text-red-700'
          }`}>
            {isAllenamento
              ? 'Allenamento completato'
              : giaPassed
              ? 'PROMOSSO ✓'
              : 'NON SUPERATO ✗'}
          </div>
          {!isAllenamento && (
            <p className={`text-sm ${giaPassed ? 'text-green-600' : 'text-red-600'}`}>
              {giaPassed
                ? 'Hai superato la soglia minima di 60/100'
                : 'La soglia minima è 60/100 — continua ad allenarti!'}
            </p>
          )}
        </div>

        {/* Statistiche */}
        <div className="grid grid-cols-3 gap-3">
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

        {/* Punti mancanti */}
        <div className={`rounded-xl p-4 border ${
          giaPassed
            ? 'bg-green-50 border-green-200'
            : 'bg-orange-50 border-orange-200'
        }`}>
          {giaPassed ? (
            <p className="text-green-700 font-medium text-sm text-center">
              ✅ Soglia raggiunta — Punteggio Totale {punteggioTotale.toFixed(1)} su {sogliaGrezzo} richiesti
            </p>
          ) : (
            <p className="text-orange-700 font-medium text-sm text-center">
              📌 Ti mancano <strong>{mancantiPunti} punti</strong> per raggiungere il 60/100
              <span className="block text-xs font-normal mt-1 text-orange-600">
                Punteggio Totale: {punteggioTotale.toFixed(1)} · Soglia: {sogliaGrezzo} · Corrette: {corrette} · Errate: {errate} (−{(errate * 0.5).toFixed(1)} pt)
              </span>
            </p>
          )}
        </div>

        {/* Breakdown per materia */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-base font-bold text-gray-900 mb-4">📊 Risultati per materia</h3>
          <div className="space-y-3">
            {Object.entries(perMateria).map(([codice, dati]) => {
              const perc = Math.round((dati.corrette / dati.totale) * 100)
              return (
                <div key={codice}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600 flex-1 mr-4 leading-tight">{dati.materia}</span>
                    <span className="text-xs font-bold text-gray-900 flex-shrink-0">
                      {dati.corrette}/{dati.totale} ({perc}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${perc >= 60 ? 'bg-green-500' : 'bg-red-400'}`}
                      style={{ width: `${perc}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Riepilogo completo domande in ordine */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-base font-bold text-gray-900 mb-4">📋 Riepilogo domande in ordine</h3>
          <div className="space-y-3">
            {domande.map((d: Domanda, i: number) => {
              const risposta = risposteDate[d.id]
              const isCorretta = risposta === d.risposta_corretta
              const isSaltata = risposta === null || risposta === undefined

              return (
                <div
                  key={d.id}
                  className={`rounded-lg border p-4 ${
                    isSaltata
                      ? 'border-gray-200 bg-gray-50'
                      : isCorretta
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      isSaltata
                        ? 'bg-gray-200 text-gray-600'
                        : isCorretta
                        ? 'bg-green-200 text-green-700'
                        : 'bg-red-200 text-red-700'
                    }`}>
                      {isSaltata ? '⬜' : isCorretta ? '✅' : '❌'} #{i + 1}
                    </span>
                    <span className="text-xs text-gray-400 truncate">{d.materia}</span>
                  </div>

                  <p className="text-sm text-gray-800 font-medium mb-3 leading-relaxed">
                    {d.domanda}
                  </p>

                  {isSaltata && (
                    <div className="text-xs text-gray-400 italic mb-1">
                      Domanda saltata
                    </div>
                  )}

                  {!isSaltata && (
                    <div className={`text-xs mb-1 ${isCorretta ? 'text-green-700' : 'text-red-600'}`}>
                      {isCorretta ? '✓ ' : '✗ '}
                      <span className="font-medium">Tua risposta:</span> {risposta}
                    </div>
                  )}

                  {(!isCorretta || isSaltata) && (
                    <div className="text-xs text-green-700">
                      ✓ <span className="font-medium">Risposta corretta:</span> {d.risposta_corretta}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottoni */}
        <div className="flex gap-3 pb-8">
          <button
            onClick={() => navigate('/simulazione')}
            className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Nuova simulazione →
          </button>
        </div>

      </main>

      <footer className="border-t border-gray-200 bg-white">
        <Footer />
      </footer>
    </div>
  )
}
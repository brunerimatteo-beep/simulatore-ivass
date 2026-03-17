import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Domanda } from '../types'

const USER_ID_TEST = '00000000-0000-0000-0000-000000000001'

function mischia(arr: string[]): string[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60).toString().padStart(2, '0')
  const s = (sec % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export default function EsameAttivo() {
  const { sessioneId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const domande: Domanda[] = location.state?.domande || []
  const minuti: number = location.state?.minuti || 75
  const isAllenamento: boolean = location.state?.isAllenamento || false

  const [indice, setIndice] = useState(0)
  const [risposteDate, setRisposteDate] = useState<Record<number, string | null>>({})
  const [sceltaCorrente, setSceltaCorrente] = useState<string | null>(null)
  const [secondiRimasti, setSecondiRimasti] = useState(minuti * 60)
  const [terminato, setTerminato] = useState(false)
  const [opzioni, setOpzioni] = useState<string[]>([])

  const domandaCorrente = domande[indice]
  const totale = domande.length

  useEffect(() => {
    if (!domandaCorrente) return
    const opts = [
      domandaCorrente.risposta_corretta,
      domandaCorrente.risposta_errata_1,
      ...(domandaCorrente.risposta_errata_2 ? [domandaCorrente.risposta_errata_2] : []),
    ]
    setOpzioni(mischia(opts))
    setSceltaCorrente(risposteDate[domandaCorrente.id] ?? null)
  }, [indice, domande])

  useEffect(() => {
    if (isAllenamento || terminato) return
    if (secondiRimasti <= 0) {
      concludiEsame()
      return
    }
    const interval = setInterval(() => setSecondiRimasti(s => s - 1), 1000)
    return () => clearInterval(interval)
  }, [secondiRimasti, terminato, isAllenamento])

  const concludiEsame = useCallback(async () => {
    if (terminato) return
    setTerminato(true)

    const tutteLeRisposte = domande.map(d => ({
      sessione_id: sessioneId,
      user_id: USER_ID_TEST,
      domanda_id: d.id,
      risposta_data: risposteDate[d.id] ?? null,
      is_corretta: risposteDate[d.id] === d.risposta_corretta,
      punti: risposteDate[d.id] === d.risposta_corretta ? 1 : 0,
    }))

    await supabase.from('risposte').insert(tutteLeRisposte)

    const corrette = tutteLeRisposte.filter(r => r.is_corretta).length
    const errate = tutteLeRisposte.filter(r => r.risposta_data !== null && !r.is_corretta).length
    const omesse = tutteLeRisposte.filter(r => r.risposta_data === null).length
    const punteggio = Math.round((corrette / totale) * 100)
    const superata = punteggio >= 60
    const tempoUsato = minuti * 60 - secondiRimasti

    await supabase.from('sessioni').update({
      stato: 'completata',
      risposte_corrette: corrette,
      risposte_errate: errate,
      risposte_omesse: omesse,
      punteggio_centesimi: punteggio,
      superata,
      tempo_secondi: tempoUsato,
      completed_at: new Date().toISOString(),
    }).eq('id', sessioneId)

    navigate(`/risultato/${sessioneId}`, {
      state: { corrette, errate, omesse, punteggio, superata, domande, risposteDate, isAllenamento }
    })
  }, [terminato, domande, risposteDate, sessioneId, secondiRimasti])

  function confermaeVaiAvanti() {
    setRisposteDate(prev => ({ ...prev, [domandaCorrente.id]: sceltaCorrente }))
    if (indice + 1 < totale) {
      setIndice(i => i + 1)
    } else {
      concludiEsame()
    }
  }

  function salta() {
    setRisposteDate(prev => ({ ...prev, [domandaCorrente.id]: null }))
    if (indice + 1 < totale) {
      setIndice(i => i + 1)
    } else {
      concludiEsame()
    }
  }

  function abbandona() {
    if (confirm('Sei sicuro di voler uscire? Il progresso andrà perso e il trial non verrà consumato.')) {
      navigate('/simulazione')
    }
  }

  if (domande.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Sessione non trovata o scaduta.</p>
          <button
            onClick={() => navigate('/simulazione')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Torna alla selezione
          </button>
        </div>
      </div>
    )
  }

  const timerWarning = !isAllenamento && secondiRimasti < 300

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-2">

            {/* Bottone esci — grande e chiaro */}
            <button
              onClick={abbandona}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Esci
            </button>

            {/* Contatore domanda */}
            <span className="text-sm font-medium text-gray-500">
              <span className="text-blue-600 font-bold">{indice + 1}</span> / {totale}
            </span>

            {/* Timer o badge allenamento */}
            {!isAllenamento && (
              <span className={`text-sm font-bold px-3 py-1.5 rounded-lg ${
                timerWarning
                  ? 'bg-red-100 text-red-600 animate-pulse'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                ⏱ {formatTime(secondiRimasti)}
              </span>
            )}
            {isAllenamento && (
              <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1.5 rounded-lg font-medium">
                Allenamento
              </span>
            )}
          </div>

          {/* Barra progresso */}
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${((indice + 1) / totale) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Contenuto */}
      <main className="flex-1 max-w-3xl mx-auto px-4 py-6 w-full">

        {/* Domanda */}
        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide font-medium">
            {domandaCorrente.materia}
          </div>
          <p className="text-gray-900 text-base font-medium leading-relaxed">
            {domandaCorrente.domanda}
          </p>
        </div>

        {/* Opzioni */}
        <div className="space-y-3 mb-6">
          {opzioni.map((opzione, i) => {
            const lettera = ['A', 'B', 'C'][i]
            const selezionata = sceltaCorrente === opzione
            return (
              <button
                key={i}
                onClick={() => setSceltaCorrente(opzione)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selezionata
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 bg-white hover:border-gray-300 text-gray-800'
                }`}
              >
                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold mr-3 flex-shrink-0 ${
                  selezionata
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {lettera}
                </span>
                {opzione}
              </button>
            )
          })}
        </div>

        {/* Azioni */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={salta}
            className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors text-sm"
          >
            Salta
          </button>
          <button
            onClick={confermaeVaiAvanti}
            className="flex-[2] py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors text-sm"
          >
            {indice + 1 === totale ? 'Termina esame' : 'Conferma e continua →'}
          </button>
        </div>

        {/* Navigazione rapida */}
        <div>
          <p className="text-xs text-gray-400 mb-2 font-medium">Navigazione rapida</p>
          <div className="flex flex-wrap gap-2">
            {domande.map((d, i) => {
              const risposta = risposteDate[d.id]
              const stato = risposta === undefined
                ? 'vuota'
                : risposta === null
                ? 'saltata'
                : 'risposta'
              return (
                <button
                  key={i}
                  onClick={() => setIndice(i)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-colors ${
                    i === indice ? 'ring-2 ring-blue-500 ring-offset-1' : ''
                  } ${
                    stato === 'risposta'
                      ? 'bg-blue-500 text-white'
                      : stato === 'saltata'
                      ? 'bg-gray-300 text-gray-600'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
        </div>

      </main>
    </div>
  )
}
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useState } from 'react'
import type { TipoEsame, Domanda } from '../types'
import { useAuth } from '../hooks/useAuth'

const USER_ID_TEST = '00000000-0000-0000-0000-000000000001'

const MODALITA = [
  {
    id: 'assicurativo' as TipoEsame,
    titolo: 'Sezione Assicurativa',
    descrizione: 'Per agenti e broker. Sezioni A, B, D del RUI.',
    domande: 50,
    minuti: 75,
    color: 'blue',
    emoji: '🏛️',
    badge1: '1.758 domande',
    badge2: '7 materie',
  },
  {
    id: 'riassicurativo' as TipoEsame,
    titolo: 'Sezione Riassicurativa',
    descrizione: 'Per intermediari riassicurativi. Sezione E del RUI.',
    domande: 20,
    minuti: 30,
    color: 'purple',
    emoji: '📊',
    badge1: '534 domande',
    badge2: '2 materie',
  },
  {
    id: 'completo' as const,
    titolo: 'Modulo Completo',
    descrizione: 'Assicurativo + Riassicurativo. Esame completo RUI.',
    domande: 70,
    minuti: 105,
    color: 'green',
    emoji: '🎯',
    badge1: '2.292 domande',
    badge2: '9 materie',
  },
]

const colorMap: Record<string, string> = {
  blue: 'hover:border-blue-400 group-hover:bg-blue-200',
  purple: 'hover:border-purple-400 group-hover:bg-purple-200',
  green: 'hover:border-green-400 group-hover:bg-green-200',
}

const bgMap: Record<string, string> = {
  blue: 'bg-blue-100',
  purple: 'bg-purple-100',
  green: 'bg-green-100',
}

const btnMap: Record<string, string> = {
  blue: 'bg-blue-600 group-hover:bg-blue-700',
  purple: 'bg-purple-600 group-hover:bg-purple-700',
  green: 'bg-green-600 group-hover:bg-green-700',
}

const badgeMap: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-700',
  purple: 'bg-purple-50 text-purple-700',
  green: 'bg-green-50 text-green-700',
}

function estraiStratificate(domande: Domanda[], totale: number): Domanda[] {
  const perMateria: Record<string, Domanda[]> = {}
  domande.forEach(d => {
    if (!perMateria[d.materia_codice]) perMateria[d.materia_codice] = []
    perMateria[d.materia_codice].push(d)
  })

  // Mescola ogni pool
  Object.keys(perMateria).forEach(m => {
    perMateria[m] = [...perMateria[m]].sort(() => Math.random() - 0.5)
  })

  const materie = Object.keys(perMateria)
  const result: Domanda[] = []
  let rimanenti = totale

  // Prima passata: assegna proporzionalmente
  const assegnate: Record<string, number> = {}
  materie.forEach(m => {
    const peso = perMateria[m].length / domande.length
    assegnate[m] = Math.min(Math.round(peso * totale), perMateria[m].length)
    rimanenti -= assegnate[m]
  })

  // Seconda passata: distribuisce i rimanenti alle materie con più domande disponibili
  if (rimanenti > 0) {
    const ordinatePerDisponibilita = materie
      .filter(m => perMateria[m].length > assegnate[m])
      .sort((a, b) => perMateria[b].length - perMateria[a].length)
    
    for (const m of ordinatePerDisponibilita) {
      if (rimanenti <= 0) break
      assegnate[m]++
      rimanenti--
    }
  }

  materie.forEach(m => {
    result.push(...perMateria[m].slice(0, assegnate[m]))
  })

  return result.sort(() => Math.random() - 0.5)
}



export default function Simulazione() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<string | null>(null)
  const [errore, setErrore] = useState<string | null>(null)

  async function avviaSimulazione(tipo: string, nDomande: number) {
    setLoading(tipo)
    setErrore(null)

    try {
      let domande: Domanda[] = []

      if (tipo === 'completo') {
        const { data: ass } = await supabase
          .from('domande').select('*').eq('tipo', 'assicurativo').eq('anno', 2025)
        const { data: rias } = await supabase
          .from('domande').select('*').eq('tipo', 'riassicurativo').eq('anno', 2025)
        const estratteAss = estraiStratificate(ass || [], 50)
        const estratteRias = estraiStratificate(rias || [], 20)
        domande = [...estratteAss, ...estratteRias].sort(() => Math.random() - 0.5)
      } else {
        const { data, error } = await supabase
          .from('domande').select('*').eq('tipo', tipo).eq('anno', 2025)
        if (error) throw error
        domande = estraiStratificate(data || [], nDomande)
      }

      if (domande.length === 0) throw new Error('Nessuna domanda trovata')

      const { data: sessione, error: errSessione } = await supabase
        .from('sessioni')
        .insert({
          user_id: user?.id ?? USER_ID_TEST,
          anno: 2025,
          modulo: tipo,
          stato: 'in_corso',
          domande_ids: domande.map(d => d.id),
          risposte_corrette: 0,
          risposte_errate: 0,
          risposte_omesse: 0,
        })
        .select()
        .single()

      if (errSessione) throw errSessione

      
      navigate(`/esame/${sessione.id}`, { state: { domande, minuti: MODALITA.find(m => m.id === tipo)?.minuti || 75 } })

    } catch (e: any) {
  console.error('Errore simulazione:', e)
  setErrore(e.message || 'Errore sconosciuto')
} finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-blue-600 font-semibold hover:underline">
            ← SimulatoreIVASS
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Scegli la modalità</h2>
          <p className="text-gray-600">Seleziona il tipo di esame che vuoi simulare</p>
        </div>

        {errore && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6 text-center">
            {errore}
          </div>
        )}

        {/* Simulazioni ufficiali */}
        <h3 className="text-lg font-bold text-gray-700 mb-4">🎓 Simulazione Esame Ufficiale</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {MODALITA.map(m => (
            <button
              key={m.id}
              onClick={() => avviaSimulazione(m.id, m.domande)}
              disabled={loading !== null}
              className={`bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100 ${colorMap[m.color]} transition-all text-left group disabled:opacity-60`}
            >
              <div className={`w-12 h-12 ${bgMap[m.color]} rounded-xl flex items-center justify-center mb-3 transition-colors`}>
                <span className="text-xl">{m.emoji}</span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">{m.titolo}</h4>
              <p className="text-gray-500 text-xs mb-3">{m.descrizione}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                <span className={`${badgeMap[m.color]} text-xs px-2 py-0.5 rounded-full`}>{m.domande} domande</span>
                <span className={`${badgeMap[m.color]} text-xs px-2 py-0.5 rounded-full`}>{m.minuti} min</span>
              </div>
              <div className={`${btnMap[m.color]} text-white text-center py-2 rounded-lg text-sm font-semibold transition-colors`}>
                {loading === m.id ? 'Caricamento...' : 'Inizia →'}
              </div>
            </button>
          ))}
        </div>

        {/* Allenamento libero */}
        <h3 className="text-lg font-bold text-gray-700 mb-4">💪 Allenamento Libero</h3>
        <button
          onClick={() => navigate('/allenamento')}
          disabled={loading !== null}
          className="w-full bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100 hover:border-orange-400 hover:shadow-md transition-all text-left group disabled:opacity-60"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors flex-shrink-0">
              <span className="text-xl">🏋️</span>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 mb-1">Allenamento Personalizzato</h4>
              <p className="text-gray-500 text-sm">Scegli materia, tipo e numero di domande. Nessun timer. Ideale per studiare i punti deboli.</p>
            </div>
            <div className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold group-hover:bg-orange-600 transition-colors flex-shrink-0">
              Configura →
            </div>
          </div>
        </button>

      </main>
    </div>
  )
}
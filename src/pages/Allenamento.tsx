import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Domanda } from '../types'
import { useAuth } from '../hooks/useAuth'


const USER_ID_TEST = '00000000-0000-0000-0000-000000000001'

const MATERIE_ASSICURATIVO = [
  { codice: 'a', nome: 'Diritto delle Assicurazioni e disciplina IVASS' },
  { codice: 'b', nome: 'Previdenza complementare' },
  { codice: 'c', nome: 'Attività agenziale e di mediazione' },
  { codice: 'd', nome: 'Tecnica assicurativa (vita e danni)' },
  { codice: 'e', nome: 'Tutela del consumatore' },
  { codice: 'f', nome: 'Diritto privato (nozioni)' },
  { codice: 'g', nome: 'Diritto tributario (nozioni)' },
]

const MATERIE_RIASSICURATIVO = [
  { codice: 'h', nome: 'Contratto di riassicurazione e tipologie' },
  { codice: 'i', nome: 'Tecnica riassicurativa' },
]

type TipoAllenamento = 'assicurativo' | 'riassicurativo' | 'completo'

export default function Allenamento() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [tipo, setTipo] = useState<TipoAllenamento>('assicurativo')
  const [materiaSelezionata, setMateriaSelezionata] = useState<string>('tutte')
  const [nDomande, setNDomande] = useState(20)
  const [loading, setLoading] = useState(false)
  const [errore, setErrore] = useState<string | null>(null)
  const [maxDisponibili, setMaxDisponibili] = useState(0)

  const materie = tipo === 'riassicurativo' ? MATERIE_RIASSICURATIVO : MATERIE_ASSICURATIVO

  useEffect(() => {
    setMateriaSelezionata('tutte')
  }, [tipo])

  useEffect(() => {
    async function caricaConteggio() {
      let count = 0
      if (tipo === 'completo') {
        const { count: c } = await supabase
          .from('domande')
          .select('id', { count: 'exact', head: true })
          .eq('anno', 2025)
        count = c || 0
      } else {
        let query = supabase
          .from('domande')
          .select('id', { count: 'exact', head: true })
          .eq('tipo', tipo)
          .eq('anno', 2025)
        if (materiaSelezionata !== 'tutte') {
          query = query.eq('materia_codice', materiaSelezionata)
        }
        const { count: c } = await query
        count = c || 0
      }
      setMaxDisponibili(count)
      setNDomande(count)
    }
    caricaConteggio()
  }, [tipo, materiaSelezionata])

  async function avviaAllenamento() {
    setLoading(true)
    setErrore(null)
    try {
      let data: any[] = []
      let error: any = null

      if (tipo === 'completo') {
        const { data: d, error: e } = await supabase
          .from('domande')
          .select('*')
          .eq('anno', 2025)
        data = d || []
        error = e
      } else {
        let query = supabase
          .from('domande')
          .select('*')
          .eq('tipo', tipo)
          .eq('anno', 2025)
        if (materiaSelezionata !== 'tutte') {
          query = query.eq('materia_codice', materiaSelezionata)
        }
        const { data: d, error: e } = await query
        data = d || []
        error = e
      }

      if (error) throw error
      if (!data || data.length === 0) throw new Error('Nessuna domanda trovata')

      const estratte = [...data]
        .sort(() => Math.random() - 0.5)
        .slice(0, nDomande) as Domanda[]

      const { data: sessione, error: errSessione } = await supabase
        .from('sessioni')
        .insert({
          user_id: user?.id ?? USER_ID_TEST,
          anno: 2025,
          modulo: tipo,
          stato: 'in_corso',
          domande_ids: estratte.map(d => d.id),
          risposte_corrette: 0,
          risposte_errate: 0,
          risposte_omesse: 0,
        })
        .select()
        .single()

      if (errSessione) throw errSessione

      
      navigate(`/esame/${sessione.id}`, {
        state: { domande: estratte, minuti: 0, isAllenamento: true }
      })
    } catch (e: any) {
      console.error('Errore allenamento:', e)
      setErrore(e.message || 'Errore sconosciuto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/simulazione')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Torna alla selezione
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => navigate('/')}
              className="text-blue-700 font-bold hover:underline text-base"
            >
              SimulatoreIVASS
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🏋️ Allenamento</h2>
          <p className="text-gray-600 text-sm">Scegli materia, tipo e numero di domande. Nessun timer.</p>
        </div>

        {errore && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6 text-center text-sm">
            {errore}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-6">

          {/* Tipo */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Tipo di esame</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { id: 'assicurativo', label: '🏛️ Assicurativo', color: 'blue' },
                { id: 'riassicurativo', label: '📊 Riassicurativo', color: 'purple' },
                { id: 'completo', label: '🎯 Completo', color: 'green' },
              ] as const).map(t => (
                <button
                  key={t.id}
                  onClick={() => setTipo(t.id)}
                  className={`py-3 px-2 rounded-xl border-2 font-medium text-xs transition-all text-center ${
                    tipo === t.id
                      ? t.color === 'blue' ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : t.color === 'purple' ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Materia — nascosta per completo */}
          {tipo !== 'completo' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Materia</label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => setMateriaSelezionata('tutte')}
                  className={`py-2 px-4 rounded-lg border-2 text-sm text-left transition-all ${
                    materiaSelezionata === 'tutte'
                      ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  📚 Tutte le materie
                </button>
                {materie.map(m => (
                  <button
                    key={m.codice}
                    onClick={() => setMateriaSelezionata(m.codice)}
                    className={`py-2 px-4 rounded-lg border-2 text-sm text-left transition-all ${
                      materiaSelezionata === m.codice
                        ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    {m.nome}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Numero domande */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-4">
              Numero di domande
            </label>
            <div className="flex justify-center mb-5">
              <div className="text-center">
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min={1}
                  max={maxDisponibili || 1}
                  value={nDomande}
                  onChange={e => {
                    const val = parseInt(e.target.value)
                    if (!isNaN(val)) {
                      setNDomande(Math.min(Math.max(1, val), maxDisponibili))
                    }
                  }}
                  className="w-28 text-center text-4xl font-black text-blue-600 border-2 border-blue-200 rounded-2xl py-3 focus:outline-none focus:border-blue-500 bg-blue-50"
                />
                <div className="text-xs text-gray-400 mt-1">max {maxDisponibili}</div>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={maxDisponibili || 1}
              value={nDomande}
              onChange={e => setNDomande(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1</span>
              <span>{maxDisponibili}</span>
            </div>
          </div>

          {/* Riepilogo */}
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
            <p>
              📋 <strong>{nDomande} domande</strong> · {tipo} · {
                tipo === 'completo'
                  ? 'tutte le materie'
                  : materiaSelezionata === 'tutte'
                  ? 'tutte le materie'
                  : materie.find(m => m.codice === materiaSelezionata)?.nome
              } · Nessun timer
            </p>
          </div>

          {/* Bottone avvia */}
          <button
            onClick={avviaAllenamento}
            disabled={loading || nDomande === 0}
            className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors disabled:opacity-60"
          >
            {loading ? 'Caricamento...' : `Inizia con ${nDomande} domande →`}
          </button>
        </div>

      </main>
    </div>
  )
}
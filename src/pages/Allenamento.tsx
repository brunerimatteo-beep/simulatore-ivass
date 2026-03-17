import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Domanda } from '../types'
import { haUsatoTrial, segnaTrialUsato } from '../lib/trial'

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
    if (haUsatoTrial()) {
      navigate('/paywall')
      return
    }
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
          user_id: USER_ID_TEST,
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

      segnaTrialUsato()
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
          <button onClick={() => navigate('/simulazione')} className="text-blue-600 font-semibold hover:underline">
            ← Torna alla selezione
          </button>
          {haUsatoTrial() && (
            <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
              Trial esaurito — €9,99 per continuare
            </span>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-10 w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🏋️ Allenamento Personalizzato</h2>
          <p className="text-gray-600">Scegli materia, tipo e numero di domande. Nessun timer.</p>
        </div>

        {errore && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6 text-center">
            {errore}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">

          {/* Tipo */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Tipo di esame</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setTipo('assicurativo')}
                className={`py-3 rounded-xl border-2 font-medium text-sm transition-all ${
                  tipo === 'assicurativo'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                🏛️ Assicurativo
              </button>
              <button
                onClick={() => setTipo('riassicurativo')}
                className={`py-3 rounded-xl border-2 font-medium text-sm transition-all ${
                  tipo === 'riassicurativo'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                📊 Riassicurativo
              </button>
              <button
                onClick={() => setTipo('completo')}
                className={`py-3 rounded-xl border-2 font-medium text-sm transition-all ${
                  tipo === 'completo'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                🎯 Completo
              </button>
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
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
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
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
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
  <label className="block text-sm font-bold text-gray-700 mb-3">
    Numero di domande
  </label>
  <div className="flex items-center gap-3 mb-3">
    <input
      type="number"
      inputMode="numeric"
      pattern="[0-9]*"
      min={1}
      max={maxDisponibili || 1}
      value={nDomande}
      onChange={e => {
        const val = Math.min(Math.max(1, Number(e.target.value)), maxDisponibili)
        setNDomande(val)
      }}
      className="w-24 text-center text-2xl font-black text-blue-600 border-2 border-blue-200 rounded-xl py-2 focus:outline-none focus:border-blue-500"
    />
    <div className="flex-1">
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
            {loading ? 'Caricamento...' : `Inizia allenamento con ${nDomande} domande →`}
          </button>
        </div>

        <div className="mt-4 text-center text-xs text-gray-400">
          💡 Trial gratuito: 1 sessione gratuita. Poi €9,99 per accesso completo.
        </div>
      </main>
    </div>
  )
}
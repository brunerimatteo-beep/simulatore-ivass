import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { segnaAccessoPagato } from '../lib/trial'
import { supabase } from '../lib/supabase'

export default function Successo() {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function setup() {
      segnaAccessoPagato()

      // Se l'utente è loggato, aggiorna anche Supabase
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        await supabase
          .from('profiles')
          .update({ paid: true, paid_at: new Date().toISOString() })
          .eq('id', session.user.id)
      }

      setChecking(false)
    }
    setup()
  }, [])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Attivazione accesso in corso...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Accesso attivato!
          </h2>
          <p className="text-gray-500 mb-8">
            Il tuo accesso annuale è attivo. Puoi fare tutte le simulazioni che vuoi.
          </p>
          <button
            onClick={() => navigate('/simulazione')}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Inizia a simulare →
          </button>
        </div>
      </div>
    </div>
  )
}
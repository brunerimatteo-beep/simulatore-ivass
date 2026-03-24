import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { segnaAccessoPagato } from '../lib/trial'
import { supabase } from '../lib/supabase'

export default function Successo() {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)
  const [errore, setErrore] = useState(false)

  useEffect(() => {
    async function setup() {
      try {
        segnaAccessoPagato()

        const { data: { session } } = await supabase.auth.getSession()

        if (session?.user) {
          const { error } = await supabase
            .from('profiles')
            .update({ paid: true, paid_at: new Date().toISOString() })
            .eq('id', session.user.id)

          if (error) throw error
        }
      } catch (e) {
        console.error('Errore attivazione:', e)
        setErrore(true)
      } finally {
        setChecking(false)
      }
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

  if (errore) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
            <div className="text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Qualcosa è andato storto</h2>
            <p className="text-gray-500 mb-8">
              Il pagamento è stato ricevuto ma non siamo riusciti ad attivare l'accesso. Contattaci e risolviamo subito.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Vai al login →
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Accesso attivato!</h2>
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
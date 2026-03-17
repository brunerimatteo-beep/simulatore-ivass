import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Successo() {
  const navigate = useNavigate()

  useEffect(() => {
    // Sblocca accesso completo
    localStorage.setItem('accesso_pagato', 'true')
    localStorage.setItem('trial_usato', 'false')
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Pagamento completato!</h2>
          <p className="text-gray-600 mb-6">
            Accesso annuale attivato. Puoi fare tutte le simulazioni che vuoi.
          </p>
          <button
            onClick={() => navigate('/simulazione')}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
          >
            Inizia a simulare →
          </button>
        </div>
      </div>
    </div>
  )
}
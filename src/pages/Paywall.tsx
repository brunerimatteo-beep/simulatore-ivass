import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/test_eVq00j9bF1Ex9ud1BD1RC00'

export default function Paywall() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const deveAndareAlCheckout = queryParams.get('action') === 'checkout'

  useEffect(() => {
    const verificaEInviaAStripe = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      // Se l'utente è loggato e voleva acquistare, lo mandiamo via subito
      if (user && deveAndareAlCheckout) {
        window.location.href = STRIPE_PAYMENT_LINK
      }
    }

    // Un piccolo timeout aiuta a gestire la velocità di Supabase nei redirect
    const timer = setTimeout(() => {
      verificaEInviaAStripe()
    }, 600)

    return () => clearTimeout(timer)
  }, [deveAndareAlCheckout])

  function handleAcquisto() {
    // Portiamo l'utente al login/registrazione passando il comando checkout
    navigate('/login?redirectTo=/paywall&mode=signup&action=checkout')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          
          <div className="bg-blue-600 px-8 py-6 text-center text-white">
            <div className="text-4xl mb-2">🎓</div>
            <h2 className="text-2xl font-black mb-1">Accesso Completo</h2>
            <p className="text-blue-100 text-sm">Simulatore Esame IVASS/RUI</p>
          </div>

          <div className="text-center py-6 border-b border-gray-100">
            <div className="text-5xl font-black text-gray-900">€9<span className="text-3xl">,99</span></div>
            <div className="text-gray-500 text-sm mt-1">accesso annuale · aggiornato 2025</div>
          </div>

          <div className="px-8 py-6 space-y-3">
            <div className="text-sm text-gray-700 font-medium">Include:</div>
            {['✅ Simulazioni illimitate', '✅ 2.292 domande ufficiali', '✅ Analisi errori dettagliata'].map((f, i) => (
              <div key={i} className="text-sm text-gray-600">{f}</div>
            ))}
          </div>

          <div className="px-8 pb-8 space-y-3">
            <button onClick={handleAcquisto} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-shadow shadow-md">
              Acquista ora →
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 uppercase">oppure</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <button onClick={() => navigate('/login?redirectTo=/paywall')} className="w-full py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50">
              Accedi se hai già un account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
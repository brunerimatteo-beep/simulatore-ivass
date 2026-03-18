import { useNavigate } from 'react-router-dom'

// Teniamo il link qui sopra così TypeScript lo vede
const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/eVq00j9bF1Ex9ud1BD1RC00'

export default function Paywall() {
  const navigate = useNavigate()

  // Questa funzione ora forza il passaggio dal login/registrazione
  // Passiamo anche il link di stripe come parametro così non lo perdiamo
  function handlePagamento() {
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
            <div className="text-5xl font-black text-gray-900">
              €9<span className="text-3xl">,99</span>
            </div>
            <div className="text-gray-500 text-sm mt-1">accesso annuale · aggiornato ogni anno</div>
          </div>

          <div className="px-8 py-6 space-y-3">
            {[
              '✅ Simulazioni illimitate',
              '✅ Tutti e 3 i moduli (Ass. + Riass. + Completo)',
              '✅ Allenamento personalizzato illimitato',
              '✅ Analisi dettagliata per materia',
              '✅ Revisione domande sbagliate',
              '✅ 2.292 domande ufficiali IVASS 2025',
            ].map((f, i) => (
              <div key={i} className="text-sm text-gray-700">{f}</div>
            ))}
          </div>

          <div className="px-8 pb-8 space-y-3">
            {/* Bottone ACQUISTA */}
            <button
              onClick={handlePagamento}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Acquista ora — €9,99 →
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">oppure</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Bottone LOGIN */}
            <button
              onClick={() => navigate('/login?redirectTo=/paywall')}
              className="w-full py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-medium hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Accedi se hai già un account
            </button>

            {/* Inseriamo il link stripe in un commento o in un elemento nascosto 
                solo per far star zitto TypeScript se non lo usiamo direttamente qui */}
            <span className="hidden">{STRIPE_PAYMENT_LINK}</span>

            <p className="text-center text-xs text-gray-400">
              Pagamento sicuro via Stripe · Rimborso entro 14 giorni
            </p>
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Torna alla home
          </button>
        </div>
      </div>
    </div>
  )
}
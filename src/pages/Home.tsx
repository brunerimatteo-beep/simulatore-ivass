import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-blue-700">SimulatoreIVASS</h1>
            <p className="text-xs text-gray-500">Preparati all'esame RUI</p>
          </div>
          <button
            onClick={() => navigate('/simulazione')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Inizia ora
          </button>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Supera l'esame IVASS al primo tentativo
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            2.292 domande ufficiali dal database IVASS 2025. 
            Simula l'esame reale e scopri dove migliorare.
          </p>
          <button
            onClick={() => navigate('/simulazione')}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 shadow-lg"
          >
            Inizia la simulazione gratuita →
          </button>
        </div>

        {/* Cards statistiche */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">2.292</div>
            <div className="text-gray-600">Domande ufficiali IVASS</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">9</div>
            <div className="text-gray-600">Materie coperte</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">60/100</div>
            <div className="text-gray-600">Punteggio minimo per passare</div>
          </div>
        </div>

        {/* Come funziona */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Come funziona</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-lg">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Scegli il percorso</h4>
              <p className="text-gray-500 text-sm">Sezione assicurativa o riassicurativa</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-lg">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Simula l'esame</h4>
              <p className="text-gray-500 text-sm">60 domande, 90 minuti, condizioni reali</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-lg">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Analizza i risultati</h4>
              <p className="text-gray-500 text-sm">Scopri le materie dove migliorare</p>
            </div>
          </div>
        </div>

        {/* CTA finale */}
        <div className="bg-blue-600 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Pronto a iniziare?</h3>
          <p className="text-blue-100 mb-6">Prima simulazione gratuita. Nessuna registrazione richiesta.</p>
          <button
            onClick={() => navigate('/simulazione')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50"
          >
            Inizia gratis →
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-500">
          <p>© 2026 SimulatoreIVASS — Le domande sono tratte dal database ufficiale IVASS</p>
          <p className="mt-1">
            <a href="#" className="hover:text-gray-700 mr-4">Privacy Policy</a>
            <a href="#" className="hover:text-gray-700">Termini e Condizioni</a>
          </p>
        </div>
      </footer>

    </div>
  )
}

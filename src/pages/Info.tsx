import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

export default function Info() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 font-semibold hover:underline"
          >
            ← Indietro
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto px-6 py-10 w-full prose prose-sm max-w-none">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Note Legali, Info e Copyright
        </h1>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            1. Titolarità dei Dati e Fonte Ufficiale
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            I quesiti presenti in questo simulatore sono tratti dal Database ufficiale dell'<strong>IVASS</strong> (Istituto per la Vigilanza sulle Assicurazioni). Il sito ufficiale dell'Istituto è:{' '}
            <a href="https://www.ivass.it/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline">
              www.ivass.it
            </a>.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Come riportato nella documentazione ufficiale allegata al database dei quesiti:
          </p>
          <blockquote className="border-l-4 border-blue-200 pl-4 py-2 my-4 bg-blue-50/50 rounded-r-lg italic text-gray-700">
            <p>
              "I quesiti sono stati predisposti in collaborazione con il Dipartimento di Scienze giuridiche dell'Università di Firenze e con il Dipartimento di Scienze per l'economia e l'impresa dell'Università di Firenze. Tutti i diritti riservati. È consentita la riproduzione a fini didattici e non commerciali, a condizione che venga citata la fonte. Grafica e stampa del database originale a cura della Divisione Editoria e stampa della Banca d'Italia."
            </p>
          </blockquote>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            2. Finalità Didattica e Gratuita del Servizio
          </h2>
          <p className="text-gray-600 leading-relaxed">
            La presente piattaforma web è un progetto indipendente sviluppato e messo a disposizione degli utenti <strong>a titolo esclusivamente gratuito e per finalità didattiche, di studio ed esercitazione personale</strong>.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Ai sensi dell'Art. 70 della Legge 22 aprile 1941, n. 633, l'utilizzo di tale materiale è effettuato senza alcuno scopo di lucro, commerciale o di concorrenza economica, nel pieno rispetto dei limiti previsti per l'uso di materiale a fini di insegnamento o di studio.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            3. Esclusione di Responsabilità (Disclaimer)
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li>
              <strong className="text-gray-900">Nessuna Affiliazione Ufficiale:</strong> Questa web app NON è un'applicazione ufficiale dell'IVASS né delle Università citate. Non è sponsorizzata né affiliata all'ente.
            </li>
            <li>
              <strong className="text-gray-900">Esattezza dei Dati:</strong> Nonostante gli sforzi, non si garantisce l'assenza di refusi. L'unico testo facente fede è quello pubblicato dall'IVASS.
            </li>
            <li>
              <strong className="text-gray-900">Nessuna Garanzia di Successo:</strong> I punteggi ottenuti non garantiscono il superamento dell'esame reale.
            </li>
            <li>
              <strong className="text-gray-900">Manleva:</strong> Il creatore della piattaforma non risponde di eventuali danni derivanti dall'uso dell'app.
            </li>
          </ul>
        </section>
      </main>

      <Footer compact />
    </div>
  )
}

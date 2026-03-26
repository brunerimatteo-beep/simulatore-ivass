import React from 'react';
import { Link } from 'react-router-dom';
 
const NoteLegali: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800 leading-relaxed font-sans">
 
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-10 transition-colors"
      >
        ← Indietro
      </Link>
 
      <header className="mb-10 border-b pb-6 border-gray-200">
        <h1 className="text-3xl font-bold uppercase tracking-tight text-gray-900 mb-2">
          Note Legali, Informativa sul Servizio e Dichiarazione di Utilizzo del Materiale Protetto
        </h1>
        <p className="text-sm text-gray-500 italic">
          Ultimo aggiornamento: marzo 2025
        </p>
      </header>
 
      <section className="space-y-12">
 
        {/* Sezione 1 */}
        <article>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-l-4 border-blue-600 pl-3">
            1. Titolarità dei Dati e Fonte Ufficiale
          </h2>
          <div className="space-y-4">
            <p>
              I quesiti riprodotti nella presente piattaforma sono tratti dal <strong>Database ufficiale dell'IVASS</strong> – Istituto per la Vigilanza sulle Assicurazioni, accessibile sul sito istituzionale{' '}
              <a href="https://www.ivass.it" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.ivass.it</a>.
            </p>
            <blockquote className="bg-gray-50 p-4 border-l-2 border-gray-300 italic text-sm">
              "I quesiti sono stati predisposti in collaborazione con il Dipartimento di Scienze giuridiche dell'Università di Firenze e con il Dipartimento di Scienze per l'economia e l'impresa dell'Università di Firenze. Tutti i diritti riservati. È consentita la riproduzione a fini didattici e non commerciali, a condizione che venga citata la fonte. Grafica e stampa del database originale a cura della Divisione Editoria e stampa della Banca d'Italia."
            </blockquote>
            <p>
              Il presente progetto riproduce tale materiale nel rispetto delle condizioni di licenza sopra citate, con esplicita indicazione della fonte.
            </p>
          </div>
        </article>
 
        <hr className="border-gray-100" />
 
        {/* Sezione 2 */}
        <article>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-l-4 border-blue-600 pl-3">
            2. Natura del Servizio e Assenza di Scopo di Lucro
          </h2>
          <div className="space-y-4">
            <p>
              La presente piattaforma è un progetto indipendente, sviluppato e reso disponibile al pubblico a titolo interamente gratuito, senza corrispettivo, senza accesso condizionato e senza alcuna forma di controprestazione a carico dell'utente.
            </p>
            <p>
              Il servizio è erogato esclusivamente per finalità didattiche, di studio e di esercitazione personale, in conformità a quanto previsto dall'<strong>art. 70 della Legge 22 aprile 1941, n. 633</strong> (Legge sul Diritto d'Autore), che consente la libera utilizzazione di opere dell'ingegno per uso personale o a fini di insegnamento, senza scopo di lucro commerciale. Nessun contenuto presente sulla piattaforma è condizionato al pagamento di qualsivoglia somma di denaro.
            </p>
          </div>
        </article>
 
        <hr className="border-gray-100" />
 
        {/* Sezione 3 */}
        <article>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-l-4 border-blue-600 pl-3">
            3. Donazioni Volontarie
          </h2>
          <p className="mb-4">
            La piattaforma mette a disposizione degli utenti la facoltà di effettuare una donazione liberale e volontaria a sostegno del progetto. Si precisa espressamente che:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Le donazioni hanno natura di liberalità spontanea e non costituiscono un corrispettivo per l'accesso al servizio;</li>
            <li>L'effettuazione o il mancato effettuazione di una donazione non influisce in alcun modo sulle funzionalità o sull'accesso ai contenuti;</li>
            <li>Le donazioni hanno esclusivamente la funzione di sostenere la continuità del progetto;</li>
            <li>La donazione non attribuisce all'utente alcun diritto contrattuale né alcuna pretesa sul servizio.</li>
          </ul>
        </article>
 
        <hr className="border-gray-100" />
 
        {/* Sezione 4 */}
        <article>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-l-4 border-blue-600 pl-3">
            4. Assenza di Affiliazione Ufficiale
          </h2>
          <p>
            La presente piattaforma <strong>non è un prodotto ufficiale dell'IVASS</strong>, dell'Università degli Studi di Firenze né della Banca d'Italia. Non è in alcun modo sponsorizzata, approvata, certificata o affiliata ai suddetti enti. L'utilizzo del materiale avviene nei limiti della licenza d'uso concessa dall'ente titolare.
          </p>
        </article>
 
        <hr className="border-gray-100" />
 
        {/* Sezione 5 */}
        <article>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-l-4 border-blue-600 pl-3">
            5. Limitazione di Responsabilità
          </h2>
          <div className="space-y-4">
            <p><strong>5.1 Accuratezza dei contenuti:</strong> Nonostante la cura adottata, non si garantisce l'assenza di errori tipografici. L'unico testo facente fede è quello pubblicato ufficialmente dall'IVASS.</p>
            <p><strong>5.2 Risultati all'esame:</strong> I punteggi ottenuti nelle simulazioni non costituiscono garanzia di superamento dell'esame reale per l'iscrizione al RUI.</p>
            <p><strong>5.3 Esclusione di responsabilità:</strong> Il gestore non risponde di eventuali danni derivanti dall'utilizzo o dall'impossibilità di utilizzo del servizio.</p>
            <p><strong>5.4 Disponibilità:</strong> Il servizio è fornito "così com'è" (<em>as is</em>), senza garanzie di continuità.</p>
          </div>
        </article>
 
        <hr className="border-gray-100" />
 
        {/* Sezione 6 */}
        <article>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 border-l-4 border-blue-600 pl-3">
            6. Trattamento dei Dati Personali
          </h2>
          <p>
            La piattaforma non raccoglie, non conserva e non tratta dati personali degli utenti ai fini di profilazione. L'eventuale utilizzo di strumenti tecnici di terze parti (es. processori di pagamento) è regolato dalle rispettive informative privacy. In caso di modifiche future, la presente sezione sarà aggiornata ai sensi del <strong>GDPR (UE 2016/679)</strong>.
          </p>
        </article>
 
      </section>
 
      <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>Progetto indipendente a fini didattici.</p>
        <p>Quesiti tratti dal Database ufficiale IVASS –{' '}
          <a href="https://www.ivass.it" className="hover:text-blue-600 underline">www.ivass.it</a>
        </p>
      </footer>
 
    </div>
  );
};
 
export default NoteLegali;
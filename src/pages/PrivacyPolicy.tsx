import { useState } from "react";

const sections = [
  {
    id: "titolare",
    title: "1. Titolare del trattamento",
    content: (
      <>
        <p>
          Il Titolare del trattamento dei dati personali è una persona fisica raggiungibile
          all'indirizzo e-mail:{" "}
          <a href="mailto:palombaro.terrestre@gmail.com" className="policy-link">
            palombaro.terrestre@gmail.com
          </a>
        </p>
        <p>
          Per qualsiasi domanda relativa alla presente informativa o all'esercizio dei tuoi
          diritti, puoi contattarci al medesimo indirizzo.
        </p>
      </>
    ),
  },
  {
    id: "dati-raccolti",
    title: "2. Dati personali trattati",
    content: (
      <>
        <p>Il sito raccoglie e tratta le seguenti categorie di dati:</p>
        <div className="policy-table">
          <div className="policy-table-row header">
            <span>Categoria</span>
            <span>Dettaglio</span>
            <span>Finalità</span>
          </div>
          <div className="policy-table-row">
            <span>Dati tecnici</span>
            <span>Indirizzo IP, browser, dispositivo, pagine visitate</span>
            <span>Sicurezza e funzionamento del sito</span>
          </div>
          <div className="policy-table-row">
            <span>Cookie di sessione</span>
            <span>Token temporanei per mantenere la sessione attiva</span>
            <span>Funzionamento tecnico</span>
          </div>
          <div className="policy-table-row future-row">
            <span>Account (futuro)</span>
            <span>Indirizzo e-mail e password cifrata (Google Auth o registrazione diretta)</span>
            <span>Autenticazione e accesso personale</span>
          </div>
        </div>
        <p className="policy-note">
          * Le funzionalità di autenticazione (Google Auth, registrazione con e-mail e password)
          non sono ancora attive. Questa sezione verrà aggiornata prima della loro attivazione.
        </p>
      </>
    ),
  },
  {
    id: "base-giuridica",
    title: "3. Base giuridica del trattamento",
    content: (
      <>
        <p>Il trattamento dei dati si fonda sulle seguenti basi giuridiche (art. 6 GDPR):</p>
        <ul className="policy-list">
          <li>
            <strong>Esecuzione del contratto / erogazione del servizio</strong> — per i dati
            tecnici e di sessione necessari al funzionamento del simulatore.
          </li>
          <li>
            <strong>Consenso dell'interessato</strong> — per i cookie non strettamente tecnici,
            ove applicabile.
          </li>
          <li>
            <strong>Legittimo interesse</strong> — per il monitoraggio della sicurezza e la
            prevenzione di accessi non autorizzati.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "conservazione",
    title: "4. Periodo di conservazione",
    content: (
      <>
        <ul className="policy-list">
          <li>
            <strong>Dati di navigazione e log tecnici:</strong> massimo 12 mesi.
          </li>
          <li>
            <strong>Cookie di sessione:</strong> eliminati alla chiusura del browser.
          </li>
          <li>
            <strong>Dati di account (futuro):</strong> per tutta la durata del rapporto, più
            il tempo necessario ad adempiere obblighi di legge. L'utente potrà richiedere la
            cancellazione in qualsiasi momento.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "comunicazione",
    title: "5. Comunicazione e trasferimento dei dati",
    content: (
      <>
        <p>
          I dati non vengono ceduti né venduti a terzi. Potrebbero essere condivisi con:
        </p>
        <ul className="policy-list">
          <li>
            <strong>Vercel Inc.</strong> — provider di hosting (USA); il trasferimento è
            garantito dalle Standard Contractual Clauses approvate dalla Commissione Europea.
          </li>
          <li>
            <strong>Google LLC</strong> — esclusivamente se e quando verrà attivata
            l'autenticazione tramite Google Auth; il trasferimento è coperto dall'accordo
            EU-US Data Privacy Framework.
          </li>
        </ul>
        <p>
          Nessun trasferimento verso paesi terzi avviene al di fuori delle garanzie sopra
          indicate.
        </p>
      </>
    ),
  },
  {
    id: "diritti",
    title: "6. Diritti dell'interessato",
    content: (
      <>
        <p>
          Ai sensi degli artt. 15–22 GDPR e del D.Lgs. 196/2003 (Codice Privacy), hai il
          diritto di:
        </p>
        <div className="rights-grid">
          {[
            { icon: "👁", label: "Accesso", desc: "Sapere quali dati trattiamo" },
            { icon: "✏️", label: "Rettifica", desc: "Correggere dati inesatti" },
            { icon: "🗑", label: "Cancellazione", desc: "Ottenere la rimozione dei dati" },
            { icon: "⏸", label: "Limitazione", desc: "Limitare il trattamento" },
            { icon: "📦", label: "Portabilità", desc: "Ricevere i tuoi dati in formato leggibile" },
            { icon: "🚫", label: "Opposizione", desc: "Opporti al trattamento per legittimo interesse" },
          ].map((r) => (
            <div className="right-card" key={r.label}>
              <span className="right-icon">{r.icon}</span>
              <strong>{r.label}</strong>
              <span>{r.desc}</span>
            </div>
          ))}
        </div>
        <p>
          Per esercitare i tuoi diritti scrivi a{" "}
          <a href="mailto:palombaro.terrestre@gmail.com" className="policy-link">
            palombaro.terrestre@gmail.com
          </a>
          . Hai inoltre il diritto di proporre reclamo al Garante per la protezione dei dati
          personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noreferrer" className="policy-link">www.garanteprivacy.it</a>).
        </p>
      </>
    ),
  },
  {
    id: "minori",
    title: "7. Minori",
    content: (
      <p>
        Il servizio non è destinato a persone di età inferiore a 16 anni. Non raccogliamo
        consapevolmente dati relativi a minori. Se ritieni che un minore abbia fornito propri
        dati, contattaci immediatamente.
      </p>
    ),
  },
  {
    id: "aggiornamenti",
    title: "8. Aggiornamenti della presente informativa",
    content: (
      <p>
        La presente informativa può essere aggiornata in caso di modifiche normative o
        funzionali al servizio. La data dell'ultima modifica è indicata in calce. Ti
        invitiamo a consultarla periodicamente.
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  const [openSection, setOpenSection] = useState<string | null>("titolare");

  return (
    <>
      <style>{`
        .policy-page {
          min-height: 100vh;
          background: #f8f9fc;
          font-family: 'Georgia', 'Times New Roman', serif;
          color: #1a1a2e;
          padding: 0 0 80px;
        }
        .policy-hero {
          background: linear-gradient(135deg, #0a1628 0%, #1a3a5c 100%);
          color: white;
          padding: 60px 24px 48px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .policy-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.015) 40px,
            rgba(255,255,255,0.015) 80px
          );
        }
        .policy-hero-badge {
          display: inline-block;
          font-family: 'Courier New', monospace;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #7eb8f7;
          background: rgba(126,184,247,0.12);
          border: 1px solid rgba(126,184,247,0.3);
          padding: 6px 16px;
          border-radius: 2px;
          margin-bottom: 20px;
        }
        .policy-hero h1 {
          font-size: clamp(28px, 5vw, 44px);
          font-weight: 700;
          margin: 0 0 16px;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }
        .policy-hero p {
          color: rgba(255,255,255,0.65);
          font-size: 15px;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .policy-date {
          margin-top: 24px;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 1px;
        }
        .policy-body {
          max-width: 780px;
          margin: 48px auto 0;
          padding: 0 24px;
        }
        .policy-intro {
          background: white;
          border-left: 4px solid #1a3a5c;
          padding: 20px 24px;
          border-radius: 0 6px 6px 0;
          margin-bottom: 32px;
          font-size: 15px;
          line-height: 1.7;
          color: #2c3e50;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }
        .policy-section {
          background: white;
          border-radius: 8px;
          margin-bottom: 12px;
          box-shadow: 0 1px 6px rgba(0,0,0,0.07);
          overflow: hidden;
          transition: box-shadow 0.2s;
        }
        .policy-section:hover {
          box-shadow: 0 3px 16px rgba(0,0,0,0.11);
        }
        .policy-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 24px;
          cursor: pointer;
          user-select: none;
          gap: 12px;
        }
        .policy-section-title {
          font-size: 16px;
          font-weight: 600;
          color: #0a1628;
          font-family: 'Georgia', serif;
        }
        .policy-chevron {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #eef2f8;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.25s, background 0.2s;
          font-size: 11px;
          color: #1a3a5c;
        }
        .policy-chevron.open {
          transform: rotate(180deg);
          background: #1a3a5c;
          color: white;
        }
        .policy-section-body {
          padding: 0 24px 22px;
          font-size: 15px;
          line-height: 1.75;
          color: #374151;
          border-top: 1px solid #f0f4f9;
        }
        .policy-section-body p { margin: 12px 0 0; }
        .policy-list {
          padding-left: 20px;
          margin: 12px 0 0;
        }
        .policy-list li { margin-bottom: 8px; }
        .policy-link {
          color: #1a3a5c;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .policy-table {
          margin-top: 14px;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid #e5eaf2;
          font-size: 14px;
        }
        .policy-table-row {
          display: grid;
          grid-template-columns: 1fr 2fr 1.5fr;
          gap: 0;
        }
        .policy-table-row.header {
          background: #0a1628;
          color: white;
          font-weight: 600;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          letter-spacing: 0.5px;
        }
        .policy-table-row span {
          padding: 10px 14px;
          border-right: 1px solid #e5eaf2;
        }
        .policy-table-row.header span { border-color: rgba(255,255,255,0.15); }
        .policy-table-row:not(.header):nth-child(even) { background: #f8fafd; }
        .future-row { opacity: 0.7; font-style: italic; }
        .policy-note {
          margin-top: 12px !important;
          font-size: 13px;
          color: #6b7280;
          background: #fef9ec;
          border-left: 3px solid #f59e0b;
          padding: 8px 12px;
          border-radius: 0 4px 4px 0;
        }
        .rights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 10px;
          margin: 14px 0 16px;
        }
        .right-card {
          background: #f4f7fc;
          border-radius: 6px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 13px;
        }
        .right-icon { font-size: 18px; }
        .right-card strong { color: #0a1628; font-size: 14px; }
        .right-card span { color: #6b7280; line-height: 1.4; }
        @media (max-width: 600px) {
          .policy-table-row { grid-template-columns: 1fr 1fr; }
          .policy-table-row span:nth-child(2) { display: none; }
        }
      `}</style>

      <div className="policy-page">
        <div className="policy-hero">
          <div className="policy-hero-badge">Documento legale</div>
          <h1>Informativa sulla Privacy</h1>
          <p>
            Come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali nell'utilizzo
            del Simulatore IVASS — RUI 2025.
          </p>
          <div className="policy-date">Ultimo aggiornamento: Marzo 2025 · Versione 1.0</div>
        </div>

        <div className="policy-body">
          <div className="policy-intro">
            La presente informativa è resa ai sensi dell'art. 13 del Regolamento (UE) 2016/679
            (GDPR) e del D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018 (Codice Privacy),
            a tutti gli utenti che accedono e utilizzano il sito{" "}
            <strong>simulatore-ivass.vercel.app</strong>.
          </div>

          {sections.map((s) => (
            <div className="policy-section" key={s.id}>
              <div
                className="policy-section-header"
                onClick={() => setOpenSection(openSection === s.id ? null : s.id)}
                role="button"
                aria-expanded={openSection === s.id}
              >
                <span className="policy-section-title">{s.title}</span>
                <span className={`policy-chevron ${openSection === s.id ? "open" : ""}`}>▾</span>
              </div>
              {openSection === s.id && (
                <div className="policy-section-body">{s.content}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

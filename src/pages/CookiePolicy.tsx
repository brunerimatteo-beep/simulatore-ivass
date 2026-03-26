import { useState } from "react";

const cookieTypes = [
  {
    id: "tecnici",
    badge: "SEMPRE ATTIVI",
    badgeColor: "#166534",
    badgeBg: "#dcfce7",
    name: "Cookie tecnici e di sessione",
    canDisable: false,
    description:
      "Indispensabili per il funzionamento del sito. Consentono la navigazione e l'utilizzo delle funzionalità di base. Non raccolgono dati a fini di profilazione.",
    cookies: [
      {
        name: "session_token",
        provider: "simulatore-ivass.vercel.app",
        purpose: "Mantiene la sessione utente attiva durante la navigazione",
        duration: "Sessione (eliminato alla chiusura del browser)",
        type: "Tecnico",
      },
      {
        name: "__vercel_*",
        provider: "Vercel Inc.",
        purpose: "Routing e bilanciamento del carico del server di hosting",
        duration: "Sessione",
        type: "Tecnico",
      },
    ],
  },
  {
    id: "autenticazione",
    badge: "IN ARRIVO",
    badgeColor: "#92400e",
    badgeBg: "#fef3c7",
    name: "Cookie di autenticazione",
    canDisable: false,
    description:
      "Questi cookie verranno attivati quando sarà disponibile la funzionalità di accesso tramite Google Auth o registrazione con e-mail e password. Saranno necessari per mantenere la sessione autenticata.",
    cookies: [
      {
        name: "auth_token",
        provider: "simulatore-ivass.vercel.app",
        purpose: "Autentica l'utente dopo il login (futuro)",
        duration: "Fino al logout o 30 giorni",
        type: "Funzionale",
      },
      {
        name: "G_AUTHUSER_H",
        provider: "Google LLC",
        purpose: "Gestione autenticazione tramite Google (futuro)",
        duration: "Sessione",
        type: "Funzionale",
      },
    ],
    future: true,
  },
  {
    id: "analitici",
    badge: "NON UTILIZZATI",
    badgeColor: "#374151",
    badgeBg: "#f3f4f6",
    name: "Cookie analitici e di profilazione",
    canDisable: true,
    description:
      "Il sito attualmente NON utilizza cookie analitici (es. Google Analytics) né cookie di profilazione o marketing. Qualora venissero introdotti in futuro, verrà richiesto il tuo consenso esplicito e la presente policy verrà aggiornata.",
    cookies: [],
    empty: true,
  },
];

const faqItems = [
  {
    q: "Come posso eliminare i cookie già installati?",
    a: "Puoi eliminare i cookie dal tuo browser in qualsiasi momento. Le istruzioni variano per browser: in Chrome vai in Impostazioni → Privacy e sicurezza → Cancella dati di navigazione. In Firefox: Impostazioni → Privacy e sicurezza → Cookie e dati dei siti web.",
  },
  {
    q: "Cosa succede se disabilito i cookie?",
    a: "I cookie tecnici sono necessari per il funzionamento del sito. Disabilitarli potrebbe impedire la corretta navigazione e l'utilizzo del simulatore. I cookie non tecnici (quando presenti) possono essere disabilitati senza compromettere le funzioni principali.",
  },
  {
    q: "I miei dati vengono trasferiti fuori dall'UE?",
    a: "Vercel Inc. (hosting) ha sede negli USA. Il trasferimento è coperto da Standard Contractual Clauses approvate dalla Commissione Europea. Google LLC (auth, futuro) è coperto dall'EU-US Data Privacy Framework.",
  },
  {
    q: "Questa policy verrà aggiornata?",
    a: "Sì. Quando verranno attivate le funzionalità di autenticazione (Google Auth, registrazione), questa policy verrà aggiornata e, se necessario, verrà richiesto il tuo consenso. Ti invitiamo a visitare questa pagina periodicamente.",
  },
];

export default function CookiePolicy() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [openTable, setOpenTable] = useState<string | null>("tecnici");

  return (
    <>
      <style>{`
        .cookie-page {
          min-height: 100vh;
          background: #f8f9fc;
          font-family: 'Georgia', 'Times New Roman', serif;
          color: #1a1a2e;
          padding: 0 0 80px;
        }
        .cookie-hero {
          background: linear-gradient(135deg, #0a1628 0%, #1a3a5c 100%);
          color: white;
          padding: 60px 24px 48px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cookie-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.015) 40px,
            rgba(255,255,255,0.015) 80px
          );
        }
        .cookie-hero-badge {
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
        .cookie-hero h1 {
          font-size: clamp(28px, 5vw, 44px);
          font-weight: 700;
          margin: 0 0 16px;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }
        .cookie-hero p {
          color: rgba(255,255,255,0.65);
          font-size: 15px;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .cookie-date {
          margin-top: 24px;
          font-family: 'Courier New', monospace;
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 1px;
        }
        .cookie-body {
          max-width: 860px;
          margin: 48px auto 0;
          padding: 0 24px;
        }
        .cookie-intro {
          background: white;
          border-left: 4px solid #1a3a5c;
          padding: 20px 24px;
          border-radius: 0 6px 6px 0;
          margin-bottom: 40px;
          font-size: 15px;
          line-height: 1.7;
          color: #2c3e50;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }
        .section-label {
          font-family: 'Courier New', monospace;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #9ca3af;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e5e7eb;
        }
        .cookie-card {
          background: white;
          border-radius: 10px;
          margin-bottom: 16px;
          box-shadow: 0 1px 6px rgba(0,0,0,0.07);
          overflow: hidden;
          transition: box-shadow 0.2s;
        }
        .cookie-card:hover { box-shadow: 0 3px 16px rgba(0,0,0,0.1); }
        .cookie-card-header {
          padding: 20px 24px;
          cursor: pointer;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          user-select: none;
        }
        .cookie-card-left { flex: 1; }
        .cookie-card-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
          flex-wrap: wrap;
        }
        .cookie-type-badge {
          font-family: 'Courier New', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          padding: 3px 10px;
          border-radius: 3px;
        }
        .cookie-card-name {
          font-size: 17px;
          font-weight: 600;
          color: #0a1628;
        }
        .cookie-card-desc {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
          margin-top: 4px;
        }
        .cookie-card-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .cookie-chevron {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #eef2f8;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s, background 0.2s;
          font-size: 11px;
          color: #1a3a5c;
        }
        .cookie-chevron.open {
          transform: rotate(180deg);
          background: #1a3a5c;
          color: white;
        }
        .cookie-table-wrap {
          padding: 0 24px 24px;
          border-top: 1px solid #f0f4f9;
        }
        .cookie-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          margin-top: 16px;
        }
        .cookie-table th {
          background: #0a1628;
          color: white;
          font-family: 'Courier New', monospace;
          font-weight: 600;
          letter-spacing: 0.5px;
          padding: 10px 14px;
          text-align: left;
          font-size: 11px;
        }
        .cookie-table td {
          padding: 10px 14px;
          border-bottom: 1px solid #f0f4f9;
          vertical-align: top;
          line-height: 1.5;
          color: #374151;
        }
        .cookie-table tr:last-child td { border-bottom: none; }
        .cookie-table tr:nth-child(even) td { background: #f8fafd; }
        .cookie-name-cell {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          color: #1a3a5c;
          font-weight: 600;
          white-space: nowrap;
        }
        .empty-state {
          text-align: center;
          padding: 32px 16px;
          color: #9ca3af;
          font-size: 14px;
        }
        .empty-state-icon { font-size: 32px; margin-bottom: 8px; }
        .future-tag {
          display: inline-block;
          background: #fef3c7;
          color: #92400e;
          font-size: 11px;
          font-family: 'Courier New', monospace;
          padding: 2px 8px;
          border-radius: 3px;
          margin-left: 8px;
        }
        .faq-section { margin-top: 48px; }
        .faq-item {
          background: white;
          border-radius: 8px;
          margin-bottom: 10px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          overflow: hidden;
        }
        .faq-question {
          padding: 16px 20px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          font-size: 15px;
          font-weight: 600;
          color: #0a1628;
          user-select: none;
        }
        .faq-chevron {
          font-size: 12px;
          color: #1a3a5c;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .faq-chevron.open { transform: rotate(180deg); }
        .faq-answer {
          padding: 0 20px 18px;
          font-size: 14px;
          line-height: 1.75;
          color: #4b5563;
          border-top: 1px solid #f0f4f9;
        }
        .faq-answer p { margin-top: 12px; }
        .contact-box {
          margin-top: 48px;
          background: linear-gradient(135deg, #0a1628, #1a3a5c);
          color: white;
          border-radius: 10px;
          padding: 32px;
          text-align: center;
        }
        .contact-box h3 { font-size: 20px; margin: 0 0 10px; }
        .contact-box p { color: rgba(255,255,255,0.7); font-size: 14px; line-height: 1.6; margin: 0 0 20px; }
        .contact-btn {
          display: inline-block;
          background: white;
          color: #0a1628;
          padding: 12px 28px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          font-family: 'Courier New', monospace;
          letter-spacing: 0.5px;
          transition: opacity 0.2s;
        }
        .contact-btn:hover { opacity: 0.9; }
        @media (max-width: 600px) {
          .cookie-table th:nth-child(3),
          .cookie-table td:nth-child(3) { display: none; }
        }
      `}</style>

      <div className="cookie-page">
        <div className="cookie-hero">
          <div className="cookie-hero-badge">Documento legale</div>
          <h1>Cookie Policy</h1>
          <p>
            Informazioni sui cookie utilizzati da Simulatore IVASS, conformi al GDPR e alle
            Linee Guida del Garante Privacy italiano.
          </p>
          <div className="cookie-date">Ultimo aggiornamento: Marzo 2025 · Versione 1.0</div>
        </div>

        <div className="cookie-body">
          <div className="cookie-intro">
            Il sito <strong>simulatore-ivass.vercel.app</strong> utilizza cookie e tecnologie
            analoghe. La presente Cookie Policy descrive quali cookie vengono utilizzati, per
            quale finalità e come puoi gestirli, in conformità al Regolamento (UE) 2016/679
            (GDPR), al D.Lgs. 196/2003 e alle{" "}
            <strong>Linee Guida Cookie del Garante per la protezione dei dati personali</strong>{" "}
            (provvedimento del 10 giugno 2021).
          </div>

          <div className="section-label">Tipologie di cookie utilizzati</div>

          {cookieTypes.map((ct) => (
            <div className="cookie-card" key={ct.id}>
              <div
                className="cookie-card-header"
                onClick={() => setOpenTable(openTable === ct.id ? null : ct.id)}
                role="button"
                aria-expanded={openTable === ct.id}
              >
                <div className="cookie-card-left">
                  <div className="cookie-card-top">
                    <span
                      className="cookie-type-badge"
                      style={{ color: ct.badgeColor, background: ct.badgeBg }}
                    >
                      {ct.badge}
                    </span>
                  </div>
                  <div className="cookie-card-name">{ct.name}</div>
                  <div className="cookie-card-desc">{ct.description}</div>
                </div>
                <div className="cookie-card-right">
                  <span className={`cookie-chevron ${openTable === ct.id ? "open" : ""}`}>▾</span>
                </div>
              </div>

              {openTable === ct.id && (
                <div className="cookie-table-wrap">
                  {ct.empty ? (
                    <div className="empty-state">
                      <div className="empty-state-icon">🚫</div>
                      Nessun cookie di questa tipologia è attualmente utilizzato.
                    </div>
                  ) : (
                    <table className="cookie-table">
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>Provider</th>
                          <th>Finalità</th>
                          <th>Durata</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ct.cookies.map((c) => (
                          <tr key={c.name}>
                            <td>
                              <span className="cookie-name-cell">{c.name}</span>
                              {ct.future && <span className="future-tag">futuro</span>}
                            </td>
                            <td>{c.provider}</td>
                            <td>{c.purpose}</td>
                            <td>{c.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          ))}

          <div className="faq-section">
            <div className="section-label">Domande frequenti</div>
            {faqItems.map((f, i) => (
              <div className="faq-item" key={i}>
                <div
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  role="button"
                  aria-expanded={openFaq === i}
                >
                  {f.q}
                  <span className={`faq-chevron ${openFaq === i ? "open" : ""}`}>▾</span>
                </div>
                {openFaq === i && (
                  <div className="faq-answer">
                    <p>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="contact-box">
            <h3>Hai domande sui cookie?</h3>
            <p>
              Per qualsiasi richiesta relativa all'utilizzo dei cookie o all'esercizio dei tuoi
              diritti ai sensi del GDPR, contattaci direttamente.
            </p>
            <a href="mailto:palombaro.terrestre@gmail.com" className="contact-btn">
              palombaro.terrestre@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

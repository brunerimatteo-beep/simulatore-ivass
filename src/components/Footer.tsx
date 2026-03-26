import React, { useEffect } from 'react';

const Footer: React.FC = () => {
  useEffect(() => {
    // 1. Carichiamo lo script base (per i link embed)
    const scriptBase = document.createElement("script");
    scriptBase.src = "https://cdn.iubenda.com/iubenda.js";
    scriptBase.async = true;
    document.body.appendChild(scriptBase);

    // 2. Carichiamo il widget specifico
    const scriptWidget = document.createElement("script");
    scriptWidget.src = "https://embeds.iubenda.com/widgets/0f9c176a-6a2d-4c4a-b257-c51914b7b2fb.js";
    scriptWidget.async = true;
    document.body.appendChild(scriptWidget);

    // Pulizia alla chiusura del componente
    return () => {
      if (document.body.contains(scriptBase)) document.body.removeChild(scriptBase);
      if (document.body.contains(scriptWidget)) document.body.removeChild(scriptWidget);
    };
  }, []);

  return (
    <footer className="footer" style={{ padding: '20px', textAlign: 'center' }}>
      <div className="legal-links" style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '10px' }}>
        <a 
          href="https://www.iubenda.com/privacy-policy/27743271" 
          className="iubenda-white iubenda-noiframe iubenda-embed" 
          title="Privacy Policy"
        >
          Privacy Policy
        </a>

        <a 
          href="https://www.iubenda.com/privacy-policy/27743271/cookie-policy" 
          className="iubenda-white iubenda-noiframe iubenda-embed" 
          title="Cookie Policy"
        >
          Cookie Policy
        </a>
      </div>
      
      {/* Il widget di Iubenda apparirà automaticamente dove previsto dallo script (spesso in un angolo della pagina) */}
    </footer>
  );
};

export default Footer;
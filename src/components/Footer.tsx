import React, { useEffect } from 'react';

// Definiamo l'interfaccia per accettare la prop 'compact' che i file Login e Successo stanno cercando di passare
interface FooterProps {
  compact?: boolean;
}

const Footer: React.FC<FooterProps> = ({ compact }) => {
  useEffect(() => {
    // 1. Script base per i link Privacy/Cookie Policy (embed)
    const scriptBase = document.createElement("script");
    scriptBase.src = "https://cdn.iubenda.com/iubenda.js";
    scriptBase.async = true;
    document.body.appendChild(scriptBase);

    // 2. Script per il Widget/Cookie Solution (quello col codice 0f9c176a...)
    const scriptWidget = document.createElement("script");
    scriptWidget.src = "https://embeds.iubenda.com/widgets/0f9c176a-6a2d-4c4a-b257-c51914b7b2fb.js";
    scriptWidget.async = true;
    document.body.appendChild(scriptWidget);

    // Pulizia dei tag quando il componente viene rimosso
    return () => {
      if (document.body.contains(scriptBase)) document.body.removeChild(scriptBase);
      if (document.body.contains(scriptWidget)) document.body.removeChild(scriptWidget);
    };
  }, []);

  // Definiamo uno stile di base che reagisce alla prop 'compact'
  const footerStyle: React.CSSProperties = {
    padding: compact ? '1rem' : '2rem 1rem',
    textAlign: 'center',
    marginTop: 'auto',
    backgroundColor: '#f8f9fa', // Grigio molto chiaro, cambialo se preferisci
    borderTop: '1px solid #e9ecef',
    fontSize: compact ? '0.8rem' : '0.9rem'
  };

  return (
    <footer style={footerStyle}>
      <div className="container">
        <p style={{ marginBottom: '10px', color: '#6c757d' }}>
          © {new Date().getFullYear()} Simulatore IVASS. Tutti i diritti riservati.
        </p>
        
        <div style={{ 
          display: 'flex', 
          gap: '20px', 
          justifyContent: 'center', 
          flexWrap: 'wrap' 
        }}>
          {/* Link Privacy Policy */}
          <a 
            href="https://www.iubenda.com/privacy-policy/27743271" 
            className="iubenda-white iubenda-noiframe iubenda-embed" 
            title="Privacy Policy"
            style={{ textDecoration: 'none', color: '#007bff' }}
          >
            Privacy Policy
          </a>

          {/* Link Cookie Policy */}
          <a 
            href="https://www.iubenda.com/privacy-policy/27743271/cookie-policy" 
            className="iubenda-white iubenda-noiframe iubenda-embed" 
            title="Cookie Policy"
            style={{ textDecoration: 'none', color: '#007bff' }}
          >
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
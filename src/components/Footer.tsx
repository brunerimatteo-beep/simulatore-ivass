import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ 
      padding: '2.5rem 1rem', 
      textAlign: 'center', 
      backgroundColor: '#f9f9f9', 
      borderTop: '1px solid #eee',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* TUTELA LEGALE - Citazione obbligatoria Pagina 2 PDF */}
        <div style={{ 
          backgroundColor: '#fff', 
          border: '1px solid #ddd', 
          padding: '15px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          fontSize: '0.8rem',
          textAlign: 'left',
          color: '#444',
          lineHeight: '1.4'
        }}>
          <strong>Note sulla proprietà intellettuale:</strong><br />
          Tutti i diritti riservati. È consentita la riproduzione a fini didattici e non commerciali, 
          a condizione che venga citata la fonte 
        (Fonte: IVASS - Database Quesiti RUI).
        </div>

        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '15px' }}>
          © {new Date().getFullYear()} <strong>Simulatore IVASS</strong>
        </p>
        
        {/* LINK IUBENDA - Questi riattivano il banner e le policy */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <a 
            href="https://www.iubenda.com/privacy-policy/27743271" 
            className="iubenda-white iubenda-noiframe iubenda-embed" 
            title="Privacy Policy"
            style={{ fontSize: '0.8rem', color: '#007bff', textDecoration: 'none' }}
          >
            Privacy Policy
          </a>
          <a 
            href="https://www.iubenda.com/privacy-policy/27743271/cookie-policy" 
            className="iubenda-white iubenda-noiframe iubenda-embed" 
            title="Cookie Policy"
            style={{ fontSize: '0.8rem', color: '#007bff', textDecoration: 'none' }}
          >
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
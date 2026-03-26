import React from 'react';

const DonationWidget: React.FC = () => {
  return (
    <a
      href="https://www.buymeacoffee.com/brussbruno"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        left: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 99999,
        backgroundColor: '#FFDD00',
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 15px',
        borderRadius: '0 8px 8px 0',
        fontWeight: 'bold',
        textDecoration: 'none',
        boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        transition: 'transform 0.2s'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(-50%)')}
    >
      <img 
        src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" 
        alt="BMC" 
        style={{ width: '20px', marginRight: '8px' }} 
      />
      <span className="bmc-text">Supportami</span>
      <style>{`
        @media (max-width: 600px) {
          .bmc-text { display: none; }
          #donation-widget { padding: 10px; }
        }
      `}</style>
    </a>
  );
};

export default DonationWidget;
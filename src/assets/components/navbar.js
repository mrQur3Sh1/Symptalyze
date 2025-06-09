import React from 'react';
import { Brain } from 'lucide-react';
import useResponsive from '../utils/hooks';

const Navbar = () => {
  const isMobile = useResponsive();

  const navStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: isMobile ? '1rem' : '1rem 2rem',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backdropFilter: 'blur(12px)',
    width: '100%',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '0.75rem' : '0',
    width: '100%',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#fff',
    fontSize: isMobile ? '1.25rem' : '1.5rem',
    fontWeight: '700',
    textDecoration: 'none',
  };

  const navLinksStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: isMobile ? '1rem' : '2rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const linkStyle = {
    color: 'rgba(255, 255, 255, 0.95)',
    textDecoration: 'none',
    fontWeight: '500',
    padding: isMobile ? '0.25rem 0.75rem' : '0.5rem 1rem',
    borderRadius: '8px',
    transition: 'background 0.3s ease',
    cursor: 'pointer',
    fontSize: isMobile ? '0.9rem' : '1rem',
  };

  const buttonStyle = {
    background: 'rgba(255, 255, 255, 0.15)',
    border: 'none',
    color: '#fff',
    padding: isMobile ? '0.5rem 1.25rem' : '0.75rem 1.5rem',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    fontSize: isMobile ? '0.85rem' : '1rem',
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <a href="#" style={logoStyle}>
          <Brain size={isMobile ? 28 : 32} />
          <span>Symptalyze</span>
        </a>
        <ul style={navLinksStyle}>
          <li><a href="#" style={linkStyle}>Home</a></li>
          <li><a href="#" style={linkStyle}>Diagnose</a></li>
          <li><a href="#" style={linkStyle}>Doctors</a></li>
          <li><a href="#" style={linkStyle}>About</a></li>
          <li><button style={buttonStyle}>Sign In</button></li>
        </ul>
      </div>
    </nav>
  );
};


export default Navbar;

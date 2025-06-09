import React from 'react';
import { Stethoscope } from 'lucide-react';
import useResponsive from '../utils/hooks';

const ResultBox = ({ results }) => {
  const isMobile = useResponsive();

  const containerStyle = {
    background: '#ffffff',
    borderRadius: '16px',
    padding: isMobile ? '1.5rem' : '2rem',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    marginBottom: '2rem',
    width: '100%',
    maxWidth: '100%',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid #e2e8f0',
  };

  const titleStyle = {
    fontSize: isMobile ? '1.25rem' : '1.5rem',
    fontWeight: '700',
    color: '#1a202c',
    margin: 0,
  };

  const conditionStyle = {
    background: '#f7fafc',
    borderRadius: '12px',
    padding: isMobile ? '1rem' : '1.5rem',
    marginBottom: '1rem',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
  };

  const conditionHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '0.5rem' : '0',
    marginBottom: '1rem',
  };

  const conditionNameStyle = {
    fontSize: isMobile ? '1rem' : '1.1rem',
    fontWeight: '600',
    color: '#2d3748',
  };

  const confidenceStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: isMobile ? '0.4rem 0.8rem' : '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: isMobile ? '0.8rem' : '0.875rem',
    fontWeight: '600',
    alignSelf: isMobile ? 'flex-start' : 'auto',
  };

  const descriptionStyle = {
    color: '#4a5568',
    lineHeight: '1.6',
    fontSize: '0.95rem',
    wordBreak: 'break-word',
  };

  const disclaimerStyle = {
    background: '#fff5f5',
    borderRadius: '12px',
    padding: '1rem',
    marginTop: '1.5rem',
    color: '#742a2a',
    fontSize: '0.875rem',
    fontWeight: '500',
    border: '1px solid #feb2b2',
  };

  if (!results || results.length === 0) {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', color: '#718096', padding: '2rem' }}>
          <Stethoscope size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <p>Enter your symptoms to get AI-powered diagnosis suggestions</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <Stethoscope size={24} color="#667eea" />
        <h2 style={titleStyle}>Diagnosis Results</h2>
      </div>

      {results.map((condition, index) => (
        <div
          key={index}
          style={conditionStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05)';
          }}
        >
          <div style={conditionHeaderStyle}>
            <h3 style={conditionNameStyle}>{condition.name}</h3>
            <div style={confidenceStyle}>{condition.confidence}% Confidence</div>
          </div>
          <p style={descriptionStyle}>{condition.description}</p>
        </div>
      ))}

      <div style={disclaimerStyle}>
        <strong>⚠️ Medical Disclaimer:</strong> This AI diagnosis is for informational purposes only and should not replace professional medical advice. Always consult a qualified healthcare provider.
      </div>
    </div>
  );
};

export default ResultBox;

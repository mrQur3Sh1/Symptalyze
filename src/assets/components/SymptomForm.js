
import React, { useState } from 'react';
import { User, Stethoscope, Brain, MessageCircle, Star, MapPin, Calendar, Clock, Send, Search } from 'lucide-react';
import useResponsive from '../utils/hooks'

const SymptomForm = ({ onSubmit, loading }) => {
  const [symptoms, setSymptoms] = useState('');
  const isMobile = useResponsive();

  const containerStyle = {
    background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
    borderRadius: '16px',
    padding: isMobile ? '1.5rem' : '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    marginBottom: '2rem',
    width: '100%',
    maxWidth: '100%',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem'
  };

  const titleStyle = {
    fontSize: isMobile ? '1.25rem' : '1.5rem',
    fontWeight: '700',
    color: '#1a202c',
    margin: 0
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  };

  const textareaStyle = {
    width: '100%',
    minHeight: isMobile ? '100px' : '120px',
    padding: isMobile ? '0.75rem' : '1rem',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: isMobile ? '0.9rem' : '1rem',
    fontFamily: 'inherit',
    resize: 'vertical',
    transition: 'all 0.3s ease',
    background: '#ffffff',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    background: loading 
      ? 'linear-gradient(135deg, #a0aec0 0%, #718096 100%)'
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: isMobile ? '0.875rem 1.5rem' : '1rem 2rem',
    borderRadius: '12px',
    fontSize: isMobile ? '0.9rem' : '1rem',
    fontWeight: '600',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    alignSelf: isMobile ? 'stretch' : 'flex-start',
    width: isMobile ? '100%' : 'auto'
  };

  const examplesStyle = {
    background: 'linear-gradient(135deg, #ebf8ff 0%, #dbeafe 100%)',
    borderRadius: '12px',
    padding: '1rem',
    border: '1px solid #bfdbfe'
  };

  const handleSubmit = () => {
    if (symptoms.trim() && !loading) {
      onSubmit(symptoms.trim());
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <MessageCircle size={24} color="#667eea" />
        <h2 style={titleStyle}>Describe Your Symptoms</h2>
      </div>

      <div style={formStyle}>
        <textarea
          style={textareaStyle}
          placeholder="Please describe your symptoms in detail. For example: 'I have been experiencing headaches for 3 days, feeling dizzy, and have a slight fever...'"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          onFocus={(e) => {
            e.target.style.borderColor = '#667eea';
            e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e2e8f0';
            e.target.style.boxShadow = 'none';
          }}
        />

        <button 
          type="button" 
          style={buttonStyle}
          disabled={loading || !symptoms.trim()}
          onClick={handleSubmit}
          onMouseEnter={(e) => {
            if (!loading && symptoms.trim()) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {loading ? (
            <>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                border: '2px solid rgba(255,255,255,0.3)',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Analyzing...
            </>
          ) : (
            <>
              <Send size={16} />
              Get AI Diagnosis
            </>
          )}
        </button>

        <div style={examplesStyle}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e40af', fontSize: '0.9rem' }}>
            💡 Tips for better results:
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#1e40af', fontSize: '0.85rem' }}>
            <li>Include duration of symptoms</li>
            <li>Mention severity level (mild, moderate, severe)</li>
            <li>Note any triggers or patterns</li>
            <li>List all related symptoms</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SymptomForm;
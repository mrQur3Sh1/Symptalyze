import React, { useState, useEffect } from 'react';
import { Brain, User, Mail, Lock, Eye, EyeOff, Heart, Shield, Zap, ArrowRight } from 'lucide-react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const isMobile = screenSize.width < 768;
  const isTablet = screenSize.width >= 768 && screenSize.width < 1024;
  const isSmallMobile = screenSize.width < 480;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      alert('Account created successfully!');
    }, 2000);
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isSmallMobile ? '0.5rem' : isMobile ? '1rem' : '1.5rem',
    fontFamily: "'Inter', sans-serif",
    boxSizing: 'border-box'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: isSmallMobile ? '16px' : '24px',
    padding: isSmallMobile ? '1.5rem' : isMobile ? '2rem' : isTablet ? '2.25rem' : '2.5rem',
    width: '100%',
    maxWidth: isSmallMobile ? '340px' : isMobile ? '400px' : isTablet ? '450px' : '480px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box'
  };

  const floatingElementStyle = {
    position: 'absolute',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    animation: 'float 6s ease-in-out infinite'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: isSmallMobile ? '1.5rem' : isMobile ? '1.75rem' : '2rem'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: isSmallMobile ? '0.5rem' : '0.75rem',
    marginBottom: isSmallMobile ? '1rem' : '1.5rem'
  };

  const logoTextStyle = {
    fontSize: isSmallMobile ? '1.25rem' : isMobile ? '1.5rem' : '1.75rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const titleStyle = {
    fontSize: isSmallMobile ? '1.5rem' : isMobile ? '1.75rem' : '2rem',
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: '0.5rem',
    lineHeight: '1.2'
  };

  const subtitleStyle = {
    color: '#718096',
    fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : '1.1rem',
    lineHeight: '1.5',
    padding: isSmallMobile ? '0 0.5rem' : '0'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: isSmallMobile ? '1.25rem' : '1.5rem'
  };

  const nameRowStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: isMobile ? '1.25rem' : '1rem'
  };

  const inputGroupStyle = {
    position: 'relative'
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: isSmallMobile ? '0.875rem 0.875rem 0.875rem 2.75rem' : isMobile ? '1rem 1rem 1rem 3rem' : '1rem 1rem 1rem 3rem',
    borderRadius: isSmallMobile ? '10px' : '12px',
    border: `2px solid ${focusedField === field ? '#667eea' : '#e2e8f0'}`,
    fontSize: isSmallMobile ? '0.9rem' : '1rem',
    transition: 'all 0.3s ease',
    background: '#ffffff',
    outline: 'none',
    boxSizing: 'border-box',
    transform: focusedField === field ? 'scale(1.02)' : 'scale(1)',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(102, 126, 234, 0.1)' : 'none'
  });

  const iconStyle = (field) => ({
    position: 'absolute',
    left: isSmallMobile ? '0.75rem' : '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: focusedField === field ? '#667eea' : '#a0aec0',
    transition: 'color 0.3s ease'
  });

  const passwordToggleStyle = {
    position: 'absolute',
    right: isSmallMobile ? '0.75rem' : '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    color: '#a0aec0',
    transition: 'color 0.3s ease',
    padding: '0.25rem'
  };

  const buttonStyle = {
    background: isLoading 
      ? 'linear-gradient(135deg, #a0aec0 0%, #718096 100%)'
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: isSmallMobile ? '0.875rem 1.5rem' : isMobile ? '1rem 1.75rem' : '1rem 2rem',
    borderRadius: isSmallMobile ? '10px' : '12px',
    fontSize: isSmallMobile ? '0.95rem' : isMobile ? '1rem' : '1.1rem',
    fontWeight: '600',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: isSmallMobile ? '0.75rem' : '1rem',
    transform: 'scale(1)',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
    width: '100%'
  };

  const featuresStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: isMobile ? '1rem' : '1rem',
    marginTop: isSmallMobile ? '1.5rem' : '2rem',
    padding: isSmallMobile ? '1.25rem' : '1.5rem',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    borderRadius: isSmallMobile ? '12px' : '16px'
  };

  const featureStyle = {
    textAlign: 'center',
    color: '#4a5568',
    padding: isMobile ? '0.5rem' : '0'
  };

  const featureTextStyle = {
    fontSize: isSmallMobile ? '0.8rem' : '0.875rem',
    fontWeight: '600',
    marginTop: '0.5rem'
  };

  const signInStyle = {
    textAlign: 'center',
    marginTop: isSmallMobile ? '1.25rem' : '1.5rem',
    color: '#718096',
    fontSize: isSmallMobile ? '0.85rem' : '0.9rem'
  };

  const signInLinkStyle = {
    color: '#667eea',
    cursor: 'pointer',
    fontWeight: '600',
    textDecoration: 'none'
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .feature-icon:hover {
            animation: pulse 0.6s ease-in-out;
          }
          
          * {
            box-sizing: border-box;
          }
          
          @media (max-width: 479px) {
            .floating-element-1 { display: none !important; }
            .floating-element-2 { display: none !important; }
            .floating-element-3 { display: none !important; }
          }
          
          @media (hover: hover) {
            .hover-scale:hover {
              transform: scale(1.02) !important;
            }
          }
        `}
      </style>

      <div style={cardStyle}>
        {/* Floating background elements - hidden on very small screens */}
        {!isSmallMobile && (
          <>
            <div className="floating-element-1" style={{
              ...floatingElementStyle,
              width: isMobile ? '60px' : '100px',
              height: isMobile ? '60px' : '100px',
              top: isMobile ? '-30px' : '-50px',
              right: isMobile ? '-30px' : '-50px',
              animationDelay: '0s'
            }} />
            <div className="floating-element-2" style={{
              ...floatingElementStyle,
              width: isMobile ? '40px' : '60px',
              height: isMobile ? '40px' : '60px',
              bottom: isMobile ? '-20px' : '-30px',
              left: isMobile ? '-20px' : '-30px',
              animationDelay: '2s'
            }} />
            <div className="floating-element-3" style={{
              ...floatingElementStyle,
              width: isMobile ? '50px' : '80px',
              height: isMobile ? '50px' : '80px',
              top: '50%',
              right: isMobile ? '-25px' : '-40px',
              animationDelay: '4s'
            }} />
          </>
        )}

        <div style={headerStyle}>
          <div style={logoStyle}>
            <Brain size={isSmallMobile ? 24 : isMobile ? 28 : 32} color="#667eea" />
            <span style={logoTextStyle}>Symptalyze</span>
          </div>
          <h1 style={titleStyle}>Join Our Community</h1>
          <p style={subtitleStyle}>
            Get personalized health insights and connect with trusted medical professionals
          </p>
        </div>

        <div style={formStyle}>
          <div style={nameRowStyle}>
            <div style={inputGroupStyle}>
              <User size={isSmallMobile ? 16 : 20} style={iconStyle('firstName')} />
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                onFocus={() => setFocusedField('firstName')}
                onBlur={() => setFocusedField('')}
                style={inputStyle('firstName')}
                required
              />
            </div>
            <div style={inputGroupStyle}>
              <User size={isSmallMobile ? 16 : 20} style={iconStyle('lastName')} />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                onFocus={() => setFocusedField('lastName')}
                onBlur={() => setFocusedField('')}
                style={inputStyle('lastName')}
                required
              />
            </div>
          </div>

          <div style={inputGroupStyle}>
            <Mail size={isSmallMobile ? 16 : 20} style={iconStyle('email')} />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField('')}
              style={inputStyle('email')}
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <Lock size={isSmallMobile ? 16 : 20} style={iconStyle('password')} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField('')}
              style={inputStyle('password')}
              required
            />
            <div 
              style={passwordToggleStyle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={isSmallMobile ? 16 : 20} /> : <Eye size={isSmallMobile ? 16 : 20} />}
            </div>
          </div>

          <div style={inputGroupStyle}>
            <Lock size={isSmallMobile ? 16 : 20} style={iconStyle('confirmPassword')} />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              onFocus={() => setFocusedField('confirmPassword')}
              onBlur={() => setFocusedField('')}
              style={inputStyle('confirmPassword')}
              required
            />
            <div 
              style={passwordToggleStyle}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={isSmallMobile ? 16 : 20} /> : <Eye size={isSmallMobile ? 16 : 20} />}
            </div>
          </div>

          <button 
            type="button" 
            className="hover-scale"
            style={buttonStyle}
            disabled={isLoading}
            onClick={handleSubmit}
            onMouseEnter={(e) => {
              if (!isLoading && !isMobile) {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.3)';
              }
            }}
          >
            {isLoading ? (
              <>
                <div style={{ 
                  width: isSmallMobile ? '16px' : '20px', 
                  height: isSmallMobile ? '16px' : '20px', 
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight size={isSmallMobile ? 16 : 20} />
              </>
            )}
          </button>
        </div>

        <div style={featuresStyle}>
          <div style={featureStyle}>
            <div className="feature-icon" style={{ marginBottom: '0.5rem' }}>
              <Heart size={isSmallMobile ? 20 : 24} color="#667eea" />
            </div>
            <p style={featureTextStyle}>Personalized Care</p>
          </div>
          <div style={featureStyle}>
            <div className="feature-icon" style={{ marginBottom: '0.5rem' }}>
              <Shield size={isSmallMobile ? 20 : 24} color="#667eea" />
            </div>
            <p style={featureTextStyle}>Secure & Private</p>
          </div>
          <div style={featureStyle}>
            <div className="feature-icon" style={{ marginBottom: '0.5rem' }}>
              <Zap size={isSmallMobile ? 20 : 24} color="#667eea" />
            </div>
            <p style={featureTextStyle}>Instant Results</p>
          </div>
        </div>

        <div style={signInStyle}>
          <p>Already have an account? <span style={signInLinkStyle}>Sign In</span></p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
import React, { useState, useEffect } from 'react';
import { Brain, User, Mail, Lock, Eye, EyeOff, Heart, Shield, Zap, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const API_CONFIG = {
  LOGIN_URL: 'http://localhost:5000/api/auth/login',
  SIGNUP_URL: 'http://localhost:5000/api/auth/signup',
};

const SignupPage = () => {
  const [isLogin, setIsLogin] = useState(false);
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
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });


  // Dummy user data for testing (fallback)
  const dummyUsers = [
    { email: 'demo@example.com', password: 'Demo123!', firstName: 'Demo', lastName: 'User' },
    { email: 'test@gmail.com', password: 'Test123!', firstName: 'Test', lastName: 'User' },
    { email: 'john@example.com', password: 'John123!', firstName: 'John', lastName: 'Doe' }
  ];

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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
    };
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isLogin) {
      const passwordCheck = validatePassword(formData.password);
      if (!passwordCheck.isValid) {
        newErrors.password = 'Password must meet all requirements';
      }
    }

    // Signup-specific validations
    if (!isLogin) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // API call functions
  const loginUser = async (credentials) => {
    try {
      const response = await fetch(API_CONFIG.LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      return {
        success: true,
        user: data.user,
        token: data.token
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  };

  const signupUser = async (userData) => {
    try {
      const response = await fetch(API_CONFIG.SIGNUP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      return {
        success: true,
        user: data.user,
        message: data.message || 'Account created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      if (isLogin) {
        // Login API call
        const result = await loginUser({
          email: formData.email,
          password: formData.password
        });

        if (result.success) {
          // Store token if provided
          if (result.token) {
            // You can store token in localStorage or context
            // localStorage.setItem('authToken', result.token);
          }
          
          // Redirect to dashboard or home page
          window.location.href = '/home';
          // Or use your routing method: navigate('/home');
        } else {
          // If API fails, fallback to dummy data for testing
          const user = dummyUsers.find(u => 
            u.email === formData.email && u.password === formData.password
          );
          
          if (user) {
            window.location.href = '/home';
          } else {
            setErrors({ general: result.error || 'Invalid email or password' });
          }
        }
      } else {
        // Signup API call
        const result = await signupUser({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        });

        if (result.success) {
          alert(result.message || 'Account created successfully! You can now login with your credentials.');
          setIsLogin(true);
          setFormData(prev => ({ 
            ...prev, 
            firstName: '',
            lastName: '',
            confirmPassword: '' 
          }));
        } else {
          setErrors({ general: result.error || 'Failed to create account' });
        }
      }
    } catch (error) {
      console.error('API Error:', error);
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const fillDummyData = () => {
    const dummyUser = dummyUsers[0];
    setFormData({
      firstName: dummyUser.firstName,
      lastName: dummyUser.lastName,
      email: dummyUser.email,
      password: dummyUser.password,
      confirmPassword: dummyUser.password
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  
  
  if (isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #581c87, #1e3a8a, #312e81)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(16px)',
          borderRadius: '1.5rem',
          padding: '2rem',
          textAlign: 'center',
          maxWidth: '28rem',
          width: '100%'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              width: '5rem',
              height: '5rem',
              background: 'linear-gradient(to right, #a855f7, #3b82f6)',
              borderRadius: '50%',
              margin: '0 auto 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle style={{ width: '2.5rem', height: '2.5rem', color: 'white' }} />
            </div>
            <h1 style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '0.5rem'
            }}>Welcome!</h1>
            <p style={{ color: '#bfdbfe' }}>You are successfully logged in.</p>
          </div>
          <button
            onClick={logout}
            style={{
              width: '100%',
              background: 'linear-gradient(to right, #9333ea, #2563eb)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.75rem',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: 'scale(1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(to right, #7c3aed, #1d4ed8)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(to right, #9333ea, #2563eb)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  const passwordValidation = validatePassword(formData.password);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #581c87, #1e3a8a, #312e81)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{ position: 'absolute', inset: '0', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-10rem',
          right: '-10rem',
          width: '20rem',
          height: '20rem',
          background: 'rgba(168, 85, 247, 0.2)',
          borderRadius: '50%',
          filter: 'blur(3rem)',
          animation: 'pulse 2s infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-10rem',
          left: '-10rem',
          width: '20rem',
          height: '20rem',
          background: 'rgba(59, 130, 246, 0.2)',
          borderRadius: '50%',
          filter: 'blur(3rem)',
          animation: 'pulse 2s infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '24rem',
          height: '24rem',
          background: 'rgba(99, 102, 241, 0.1)',
          borderRadius: '50%',
          filter: 'blur(3rem)',
          animation: 'spin 20s linear infinite'
        }}></div>
      </div>

      <div style={{
        position: 'relative',
        zIndex: '10',
        width: '100%',
        maxWidth: '28rem',
        margin: isMobile ? '0 1rem' : '0'
      }}>
        {/* Dummy data helper */}
        {!isLogin && (
          <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
            <button
              onClick={fillDummyData}
              style={{
                color: '#93c5fd',
                fontSize: '0.875rem',
                textDecoration: 'underline',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#bfdbfe'}
              onMouseLeave={(e) => e.target.style.color = '#93c5fd'}
            >
              Fill with dummy data for testing
            </button>
          </div>
        )}

        {/* Login credentials helper */}
        {isLogin && (
          <div style={{
            marginBottom: '1rem',
            padding: '0.75rem',
            background: 'rgba(59, 130, 246, 0.2)',
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            <p style={{ color: '#bfdbfe', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Demo credentials:</p>
            <p style={{ color: '#dbeafe', fontSize: '0.75rem' }}>Email: demo@example.com</p>
            <p style={{ color: '#dbeafe', fontSize: '0.75rem' }}>Password: Demo123!</p>
          </div>
        )}

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(16px)',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '4rem',
              height: '4rem',
              background: 'linear-gradient(to right, #a855f7, #3b82f6)',
              borderRadius: '1rem',
              marginBottom: '1rem'
            }}>
              <Brain style={{ width: '2rem', height: '2rem', color: 'white' }} />
            </div>
            <h1 style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '0.5rem'
            }}>
              {isLogin ? 'Welcome Back' : 'Join Us'}
            </h1>
            <p style={{ color: '#bfdbfe' }}>
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </p>
          </div>

          {/* Error message */}
          {errors.general && (
            <div style={{
              marginBottom: '1rem',
              padding: '0.75rem',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '0.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', color: '#fecaca' }}>
                <AlertCircle style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                <span style={{ fontSize: '0.875rem' }}>{errors.general}</span>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Name fields for signup */}
            {!isLogin && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'relative' }}>
                    <User style={{
                      position: 'absolute',
                      left: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#93c5fd',
                      width: '1.25rem',
                      height: '1.25rem'
                    }} />
                    <input
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={() => setFocusedField('')}
                      style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${errors.firstName ? '#f87171' : 'rgba(255, 255, 255, 0.2)'}`,
                        borderRadius: '0.75rem',
                        padding: '0.75rem 1rem 0.75rem 3rem',
                        color: 'white',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        boxSizing: 'border-box'
                      }}
                      onFocusCapture={(e) => {
                        e.target.style.outline = '2px solid #a855f7';
                        e.target.style.borderColor = 'transparent';
                      }}
                      onBlurCapture={(e) => {
                        e.target.style.outline = 'none';
                        e.target.style.borderColor = errors.firstName ? '#f87171' : 'rgba(255, 255, 255, 0.2)';
                      }}
                    />
                  </div>
                  {errors.firstName && (
                    <p style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.firstName}</p>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'relative' }}>
                    <User style={{
                      position: 'absolute',
                      left: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#93c5fd',
                      width: '1.25rem',
                      height: '1.25rem'
                    }} />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      onFocus={() => setFocusedField('lastName')}
                      onBlur={() => setFocusedField('')}
                      style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${errors.lastName ? '#f87171' : 'rgba(255, 255, 255, 0.2)'}`,
                        borderRadius: '0.75rem',
                        padding: '0.75rem 1rem 0.75rem 3rem',
                        color: 'white',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        boxSizing: 'border-box'
                      }}
                      onFocusCapture={(e) => {
                        e.target.style.outline = '2px solid #a855f7';
                        e.target.style.borderColor = 'transparent';
                      }}
                      onBlurCapture={(e) => {
                        e.target.style.outline = 'none';
                        e.target.style.borderColor = errors.lastName ? '#f87171' : 'rgba(255, 255, 255, 0.2)';
                      }}
                    />
                  </div>
                  {errors.lastName && (
                    <p style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.lastName}</p>
                  )}
                </div>
              </div>
            )}

            {/* Email field */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'relative' }}>
                <Mail style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#93c5fd',
                  width: '1.25rem',
                  height: '1.25rem'
                }} />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${errors.email ? '#f87171' : 'rgba(255, 255, 255, 0.2)'}`,
                    borderRadius: '0.75rem',
                    padding: '0.75rem 1rem 0.75rem 3rem',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocusCapture={(e) => {
                    e.target.style.outline = '2px solid #a855f7';
                    e.target.style.borderColor = 'transparent';
                  }}
                  onBlurCapture={(e) => {
                    e.target.style.outline = 'none';
                    e.target.style.borderColor = errors.email ? '#f87171' : 'rgba(255, 255, 255, 0.2)';
                  }}
                />
              </div>
              {errors.email && (
                <p style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'relative' }}>
                <Lock style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#93c5fd',
                  width: '1.25rem',
                  height: '1.25rem'
                }} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${errors.password ? '#f87171' : 'rgba(255, 255, 255, 0.2)'}`,
                    borderRadius: '0.75rem',
                    padding: '0.75rem 3rem 0.75rem 3rem',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocusCapture={(e) => {
                    e.target.style.outline = '2px solid #a855f7';
                    e.target.style.borderColor = 'transparent';
                  }}
                  onBlurCapture={(e) => {
                    e.target.style.outline = 'none';
                    e.target.style.borderColor = errors.password ? '#f87171' : 'rgba(255, 255, 255, 0.2)';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#93c5fd',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'white'}
                  onMouseLeave={(e) => e.target.style.color = '#93c5fd'}
                >
                  {showPassword ? <EyeOff style={{ width: '1.25rem', height: '1.25rem' }} /> : <Eye style={{ width: '1.25rem', height: '1.25rem' }} />}
                </button>
              </div>
              {errors.password && (
                <p style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.password}</p>
              )}
            </div>

            {/* Password requirements for signup */}
            {!isLogin && formData.password && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0.5rem',
                padding: '0.75rem'
              }}>
                <p style={{ color: '#bfdbfe', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Password requirements:</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.25rem', fontSize: '0.75rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: passwordValidation.minLength ? '#4ade80' : '#f87171'
                  }}>
                    <CheckCircle style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} />
                    At least 8 characters
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: passwordValidation.hasUpperCase ? '#4ade80' : '#f87171'
                  }}>
                    <CheckCircle style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} />
                    One uppercase letter
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: passwordValidation.hasLowerCase ? '#4ade80' : '#f87171'
                  }}>
                    <CheckCircle style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} />
                    One lowercase letter
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: passwordValidation.hasNumbers ? '#4ade80' : '#f87171'
                  }}>
                    <CheckCircle style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} />
                    One number
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: passwordValidation.hasSpecialChar ? '#4ade80' : '#f87171'
                  }}>
                    <CheckCircle style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} />
                    One special character
                  </div>
                </div>
              </div>
            )}

            {/* Confirm password field for signup */}
            {!isLogin && (
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'relative' }}>
                  <Lock style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#93c5fd',
                    width: '1.25rem',
                    height: '1.25rem'
                  }} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField('')}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${errors.confirmPassword ? '#f87171' : 'rgba(255, 255, 255, 0.2)'}`,
                      borderRadius: '0.75rem',
                      padding: '0.75rem 3rem 0.75rem 3rem',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocusCapture={(e) => {
                      e.target.style.outline = '2px solid #a855f7';
                      e.target.style.borderColor = 'transparent';
                    }}
                    onBlurCapture={(e) => {
                      e.target.style.outline = 'none';
                      e.target.style.borderColor = errors.confirmPassword ? '#f87171' : 'rgba(255, 255, 255, 0.2)';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute',
                      right: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#93c5fd',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = 'white'}
                    onMouseLeave={(e) => e.target.style.color = '#93c5fd'}
                  >
                    {showConfirmPassword ? <EyeOff style={{ width: '1.25rem', height: '1.25rem' }} /> : <Eye style={{ width: '1.25rem', height: '1.25rem' }} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Submit button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              style={{
                width: '100%',
                background: 'linear-gradient(to right, #9333ea, #2563eb)',
                color: 'white',
                padding: '1rem 1.5rem',
                borderRadius: '0.75rem',
                fontWeight: '600',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                transform: 'scale(1)',
                opacity: isLoading ? '0.5' : '1'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.background = 'linear-gradient(to right, #7c3aed, #1d4ed8)';
                  e.target.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.background = 'linear-gradient(to right, #9333ea, #2563eb)';
                  e.target.style.transform = 'scale(1)';
                }
              }}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    border: '2px solid white',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginRight: '0.5rem'
                  }}></div>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight style={{ width: '1.25rem', height: '1.25rem', marginLeft: '0.5rem' }} />
                </div>
              )}
            </button>
          </div>

          {/* Toggle between login and signup */}
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ color: '#bfdbfe' }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={toggleMode}
                style={{
                  color: '#c4b5fd',
                  fontWeight: '600',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#e0e7ff'}
                onMouseLeave={(e) => e.target.style.color = '#c4b5fd'}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        {/* Features section */}
        <div style={{
          marginTop: '2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '1rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              background: 'rgba(168, 85, 247, 0.2)',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.5rem'
            }}>
              <Shield style={{ width: '1.5rem', height: '1.5rem', color: '#c4b5fd' }} />
            </div>
            <p style={{ color: '#bfdbfe', fontSize: '0.875rem' }}>Secure</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              background: 'rgba(59, 130, 246, 0.2)',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.5rem'
            }}>
              <Zap style={{ width: '1.5rem', height: '1.5rem', color: '#93c5fd' }} />
            </div>
            <p style={{ color: '#bfdbfe', fontSize: '0.875rem' }}>Fast</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              background: 'rgba(99, 102, 241, 0.2)',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.5rem'
            }}>
              <Heart style={{ width: '1.5rem', height: '1.5rem', color: '#a5b4fc' }} />
            </div>
            <p style={{ color: '#bfdbfe', fontSize: '0.875rem' }}>Loved</p>
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          input::placeholder {
            color: #93c5fd;
          }
        `}
      </style>
    </div>
  );
};

export default SignupPage;
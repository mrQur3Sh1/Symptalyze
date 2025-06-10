import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { User } from 'lucide-react';
import Navbar from './assets/components/navbar';
import SymptomForm from './assets/components/SymptomForm';
import ResultBox from './assets/components/ResultBox';
import DoctorCard from './assets/components/doctorCard';
import SignupPage from './assets/components/SignupPage';
import useResponsive from '../src/assets/utils/hooks'; 

// Home/Main component
const HomePage = () => {
  const [diagnosisResults, setDiagnosisResults] = useState([]);
  const [recommendedDoctors, setRecommendedDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const isMobile = useResponsive();

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: isMobile ? '1rem' : '2rem',
    minHeight: 'calc(100vh - 80px)',
    width: '100%',
    boxSizing: 'border-box',
  };

  const heroStyle = {
    textAlign: 'center',
    padding: isMobile ? '2rem 0' : '3rem 0',
    color: 'white',
    marginBottom: '2rem',
  };

  const heroTitleStyle = {
    fontSize: isMobile ? '2rem' : '3rem',
    fontWeight: '800',
    marginBottom: '1rem',
    background: 'linear-gradient(to right, #ffffff, #cbd5e0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: isMobile ? '1.2' : '1.1',
  };

  const heroSubtitleStyle = {
    fontSize: isMobile ? '1rem' : '1.25rem',
    opacity: 0.9,
    marginBottom: '2rem',
    maxWidth: '600px',
    margin: '0 auto 2rem',
    padding: isMobile ? '0 1rem' : '0',
  };

  const contentStyle = {
    display: 'grid',
    gap: '2rem',
    width: '100%',
  };

  const doctorsGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
    width: '100%',
  };

  const sectionTitleStyle = {
    color: 'white',
    fontSize: isMobile ? '1.25rem' : '1.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: isMobile ? '0 0.5rem' : '0',
  };

  // Mock data
  const mockDoctors = [
    {
      name: "Sarah Johnson",
      specialty: "Internal Medicine",
      location: "Downtown Medical Center",
      experience: 12,
      availability: "Today",
      rating: 4.8,
      reviews: 124,
      matchPercentage: 95
    },
    {
      name: "Michael Chen",
      specialty: "Cardiology",
      location: "Heart Care Clinic",
      experience: 15,
      availability: "Tomorrow",
      rating: 4.9,
      reviews: 89,
      matchPercentage: 87
    },
    {
      name: "Emily Rodriguez",
      specialty: "Neurology",
      location: "Brain & Spine Institute",
      experience: 10,
      availability: "This Week",
      rating: 4.7,
      reviews: 156,
      matchPercentage: 82
    }
  ];

  const handleSymptomSubmit = async (symptoms) => {
    setLoading(true);

    setTimeout(() => {
      const mockResults = [
        {
          name: "Common Cold",
          confidence: 85,
          description: "A viral infection affecting the upper respiratory tract. Symptoms typically include runny nose, cough, and mild fever."
        },
        {
          name: "Seasonal Allergies",
          confidence: 65,
          description: "Allergic reaction to environmental allergens such as pollen, dust, or pet dander causing similar respiratory symptoms."
        },
        {
          name: "Viral Sinusitis",
          confidence: 45,
          description: "Inflammation of the sinuses caused by viral infection, often following a cold or upper respiratory infection."
        }
      ];

      setDiagnosisResults(mockResults);
      setRecommendedDoctors(mockDoctors);
      setLoading(false);
    }, 2000);
  };

  return (
    <div style={containerStyle}>
      <div style={heroStyle}>
        <h1 style={heroTitleStyle}>AI-Powered Medical Diagnosis</h1>
        <p style={heroSubtitleStyle}>
          Get instant symptom analysis and connect with the right healthcare professionals.
        </p>
      </div>

      <div style={contentStyle}>
        <SymptomForm onSubmit={handleSymptomSubmit} loading={loading} />
        <ResultBox results={diagnosisResults} />

        {recommendedDoctors.length > 0 && (
          <div>
            <h2 style={sectionTitleStyle}>
              <User size={24} />
              Recommended Doctors
            </h2>
            <div style={doctorsGridStyle}>
              {recommendedDoctors.map((doctor, index) => (
                <DoctorCard key={index} doctor={doctor} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App component with Router
const App = () => {
  const appStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #667eea, #764ba2)',
    fontFamily: "'Inter', sans-serif",
    width: '100%',
    margin: 0,
    padding: 0,
  };

  return (
    <Router>
      <div style={appStyle}>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            
            body {
              margin: 0;
              padding: 0;
              width: 100%;
              overflow-x: hidden;
            }
            
            html {
              width: 100%;
              overflow-x: hidden;
            }
            
            @media (max-width: 768px) {
              body {
                font-size: 14px;
              }
            }
          `}
        </style>

        <Routes>
          {/* Signup route as the default landing page */}
          <Route path="/" element={<SignupPage />} />
          
          {/* Routes that include the navbar */}
          <Route path="/home" element={
            <>
              <Navbar />
              <HomePage />
            </>
          } />
          <Route path="/diagnose" element={
            <>
              <Navbar />
              <HomePage />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navbar />
              <div style={{ 
                maxWidth: '1200px', 
                margin: '0 auto', 
                padding: '2rem', 
                color: 'white', 
                textAlign: 'center' 
              }}>
                <h1>About Symptalyze</h1>
                <p>Coming soon...</p>
              </div>
            </>
          } />
          
          {/* Legacy signup route (redirects to home for consistency) */}
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Redirect any unknown routes to signup page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
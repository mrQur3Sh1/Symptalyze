import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import Navbar from './assets/components/navbar';
import SymptomForm from './assets/components/SymptomForm';
import ResultBox from './assets/components/ResultBox';
import DoctorCard from './assets/components/doctorCard';
import SignupPage from './assets/components/SignupPage';
import useResponsive from '../src/assets/utils/hooks';

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
    setDiagnosisResults([]);
    setRecommendedDoctors([]);

    try {
      const response = await fetch('http://localhost:5000/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: symptoms }),
      });

      const data = await response.json();

      setDiagnosisResults([
        {
          name: "AI Medical Assistant",
          confidence: 90,
          description: data.reply,
        },
      ]);

      setRecommendedDoctors(mockDoctors);
    } catch (error) {
      console.error('AI Error:', error);
      setDiagnosisResults([
        {
          name: "Error",
          confidence: 0,
          description: "Something went wrong. Please try again later.",
        }
      ]);
    } finally {
      setLoading(false);
    }
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

            body, html {
              width: 100%;
              overflow-x: hidden;
              margin: 0;
              padding: 0;
            }

            @media (max-width: 768px) {
              body {
                font-size: 14px;
              }
            }
          `}
        </style>

        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/home" element={<><Navbar /><HomePage /></>} />
          <Route path="/diagnose" element={<><Navbar /><HomePage /></>} />
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
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

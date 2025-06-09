import React from 'react';
import { MapPin, Calendar, Clock, Star } from 'lucide-react';
import useResponsive from '../utils/hooks';

const DoctorCard = ({ doctor }) => {
  const isMobile = useResponsive();

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '16px',
    padding: isMobile ? '1rem' : '1.5rem',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  };

  const avatarStyle = {
    width: isMobile ? '50px' : '60px',
    height: isMobile ? '50px' : '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: isMobile ? '1.2rem' : '1.5rem',
    fontWeight: '600',
  };

  const nameStyle = {
    fontSize: isMobile ? '1.1rem' : '1.25rem',
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: '0.25rem',
  };

  const specialtyStyle = {
    color: '#667eea',
    fontWeight: '600',
    fontSize: isMobile ? '0.8rem' : '0.9rem',
  };

  const infoRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.75rem',
    color: '#4a5568',
    fontSize: '0.875rem',
  };

  const ratingStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
  };

  const buttonStyle = {
    width: '100%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '0.9rem',
  };

  const matchBadgeStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 36px rgba(0, 0, 0, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
      }}
    >
      <div style={matchBadgeStyle}>{doctor.matchPercentage}% Match</div>

      <div style={headerStyle}>
        <div style={avatarStyle}>
          {doctor.name.split(' ').map((n) => n[0]).join('')}
        </div>
        <div>
          <div style={nameStyle}>Dr. {doctor.name}</div>
          <div style={specialtyStyle}>{doctor.specialty}</div>
        </div>
      </div>

      <div style={infoRowStyle}>
        <MapPin size={16} />
        <span>{doctor.location}</span>
      </div>

      <div style={infoRowStyle}>
        <Calendar size={16} />
        <span>{doctor.experience} years experience</span>
      </div>

      <div style={infoRowStyle}>
        <Clock size={16} />
        <span>Available {doctor.availability}</span>
      </div>

      <div style={ratingStyle}>
        <div style={{ display: 'flex', gap: '2px' }}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < Math.floor(doctor.rating) ? '#fbbf24' : 'none'}
              color={i < Math.floor(doctor.rating) ? '#fbbf24' : '#d1d5db'}
            />
          ))}
        </div>
        <span style={{ color: '#4a5568', fontSize: '0.875rem' }}>
          {doctor.rating} ({doctor.reviews} reviews)
        </span>
      </div>

      <button
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.background = 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }}
      >
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorCard;

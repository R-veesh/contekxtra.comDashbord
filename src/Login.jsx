import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#090B0E',
      fontFamily: '"IBM Plex Sans", sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        padding: '40px',
        backgroundColor: '#171C27',
        border: '1px solid #242B38',
        borderRadius: '12px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '48px', 
            height: '48px', 
            backgroundColor: '#1E1710', 
            color: '#E8A33D', 
            borderRadius: '8px',
            border: '1px solid #E8A33D',
            fontWeight: 'bold',
            fontSize: '20px',
            marginBottom: '16px'
          }}>
            CX
          </div>
          <h1 style={{ color: '#E4E7ED', fontSize: '24px', margin: '0 0 8px 0' }}>ContekXtra</h1>
          <p style={{ color: '#8C94A6', margin: 0, fontSize: '14px' }}>Enterprise Context Intelligence</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', color: '#8C94A6', fontSize: '13px', marginBottom: '8px' }}>Work Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#090B0E',
                border: '1px solid #2A5A54',
                borderRadius: '6px',
                color: '#E4E7ED',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ color: '#8C94A6', fontSize: '13px' }}>Password</label>
              <a href="#" style={{ color: '#3DBFAD', fontSize: '13px', textDecoration: 'none' }}>Forgot?</a>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#090B0E',
                border: '1px solid #242B38',
                borderRadius: '6px',
                color: '#E4E7ED',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          <button 
            type="submit" 
            style={{
              width: '100%',
              padding: '14px',
              marginTop: '8px',
              backgroundColor: '#3DBFAD',
              color: '#090B0E',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            Sign In to Command Center
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', color: '#5B6275', fontSize: '12px' }}>
          By signing in, you agree to our Enterprise Terms of Service.
        </div>
      </div>
    </div>
  );
}

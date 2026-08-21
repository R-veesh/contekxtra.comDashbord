import React, { useState } from 'react';
import { auth, googleProvider } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default function Login({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) return;

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      onLogin();
    } catch (err) {
      setError(err.message);
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

        {error && (
          <div style={{ 
            marginBottom: '20px', 
            padding: '12px', 
            backgroundColor: '#FF4D4D1A', 
            border: '1px solid #FF4D4D', 
            borderRadius: '6px', 
            color: '#FF4D4D', 
            fontSize: '13px' 
          }}>
            {error}
          </div>
        )}

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
              {!isSignUp && <a href="#" style={{ color: '#3DBFAD', fontSize: '13px', textDecoration: 'none' }}>Forgot?</a>}
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
            {isSignUp ? 'Create Account' : 'Sign In to Command Center'}
          </button>
        </form>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          margin: '24px 0',
          color: '#5B6275',
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#242B38' }}></div>
          <span style={{ padding: '0 12px' }}>Or continue with</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#242B38' }}></div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: 'transparent',
            color: '#E4E7ED',
            border: '1px solid #242B38',
            borderRadius: '6px',
            fontWeight: '500',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            transition: 'background 0.2s'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.89 16.79 15.72 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
            <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.72 17.57C14.73 18.23 13.47 18.63 12 18.63C9.15 18.63 6.74 16.71 5.88 14.13H2.21V16.98C4.01 20.55 7.69 23 12 23Z" fill="#34A853"/>
            <path d="M5.88 14.13C5.66 13.47 5.54 12.75 5.54 12C5.54 11.25 5.66 10.53 5.88 9.87V7.02H2.21C1.47 8.5 1.05 10.19 1.05 12C1.05 13.81 1.47 15.5 2.21 16.98L5.88 14.13Z" fill="#FBBC05"/>
            <path d="M12 5.38C13.62 5.38 15.06 5.94 16.2 7.02L19.36 3.86C17.45 2.08 14.97 1 12 1C7.69 1 4.01 3.45 2.21 7.02L5.88 9.87C6.74 7.29 9.15 5.38 12 5.38Z" fill="#EA4335"/>
          </svg>
          Google
        </button>

        <div style={{ textAlign: 'center', marginTop: '24px', color: '#5B6275', fontSize: '13px' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            style={{
              background: 'none',
              border: 'none',
              color: '#3DBFAD',
              cursor: 'pointer',
              fontSize: '13px',
              marginLeft: '8px',
              textDecoration: 'underline'
            }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px', color: '#5B6275', fontSize: '12px' }}>
          By signing in, you agree to our Enterprise Terms of Service.
        </div>
      </div>
    </div>
  );
}

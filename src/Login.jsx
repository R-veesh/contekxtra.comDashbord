import React, { useState } from 'react';
import { auth, googleProvider } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';

export default function Login({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'Very Weak', color: '#374151', textColor: '#6B7280' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (pass.match(/[A-Z]/)) score += 1;
    if (pass.match(/[0-9]/)) score += 1;
    if (pass.match(/[^A-Za-z0-9]/)) score += 1;

    switch (score) {
      case 0: return { score, label: 'Very Weak', color: '#374151', textColor: '#6B7280' };
      case 1: return { score, label: 'Weak', color: '#EF4444', textColor: '#EF4444' };
      case 2: return { score, label: 'So-so', color: '#F97316', textColor: '#F97316' };
      case 3: return { score, label: 'Good', color: '#84CC16', textColor: '#84CC16' };
      case 4: return { score, label: 'Strong', color: '#10B981', textColor: '#10B981' };
      default: return { score: 0, label: 'Very Weak', color: '#374151', textColor: '#6B7280' };
    }
  };

  const strength = getPasswordStrength(password);

  const validatePassword = (pass) => {
    const minLength = 8;
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    return pass.length >= minLength && hasUpper && hasLower && hasNumber && hasSpecial;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) return;

    if (isSignUp) {
      if (!name.trim()) {
        setError('Name is required');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (!validatePassword(password)) {
        setError('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.');
        return;
      }
    }

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
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
          {isSignUp && (
            <div>
              <label style={{ display: 'block', color: '#8C94A6', fontSize: '13px', marginBottom: '8px' }}>Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
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
                required={isSignUp}
              />
            </div>
          )}

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
                border: password && isSignUp 
                  ? (strength.score <= 1 ? '1px solid #EF4444' : strength.score === 2 ? '1px solid #F97316' : strength.score === 3 ? '1px solid #84CC16' : '1px solid #10B981')
                  : '1px solid #242B38',
                borderRadius: '6px',
                color: '#E4E7ED',
                fontSize: '14px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
              required
            />
            {isSignUp && password && (
              <div style={{ marginTop: '8px' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
                  {[1, 2, 3, 4].map((index) => (
                    <div 
                      key={index}
                      style={{
                        height: '4px',
                        flex: 1,
                        borderRadius: '4px',
                        backgroundColor: index <= strength.score ? strength.color : '#242B38',
                        transition: 'background-color 0.3s'
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: strength.textColor }}>
                    {strength.label}
                  </span>
                </div>
              </div>
            )}
          </div>

          {isSignUp && (
            <div>
              <label style={{ display: 'block', color: '#8C94A6', fontSize: '13px', marginBottom: '8px' }}>Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                required={isSignUp}
              />
            </div>
          )}

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
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
            }}
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

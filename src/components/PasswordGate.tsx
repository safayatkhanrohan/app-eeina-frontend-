import React, { useState, useEffect } from 'react';

// Change this password to whatever you want
const SITE_PASSWORD = 'eeina2025';
const STORAGE_KEY = 'eeina_site_access';

interface PasswordGateProps {
  children: React.ReactNode;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if already authenticated in this session
    const granted = localStorage.getItem(STORAGE_KEY);
    if (granted === 'true') {
      setIsUnlocked(true);
    }
    setIsChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === SITE_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setIsUnlocked(true);
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  // Show nothing while checking session storage
  if (isChecking) {
    return null;
  }

  // If unlocked, render the app
  if (isUnlocked) {
    return <>{children}</>;
  }

  // Password gate UI
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-900 via-slate-900 to-slate-900">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
        {/* Logo or Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Private Access</h1>
          <p className="text-slate-500 mt-2 text-sm">
            This site is currently in development.
            <br />
            Enter password to continue.
          </p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-center text-lg tracking-widest"
              autoFocus
              autoComplete="off"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 active:bg-teal-800 transition-colors shadow-lg shadow-teal-600/30"
          >
            Unlock
          </button>
        </form>

        <p className="text-center text-slate-400 text-xs mt-6">
          © {new Date().getFullYear()} Eeina. All rights reserved.
        </p>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Mail, Lock, User, ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface AuthProps {
  type: 'login' | 'signup';
  onAuthSuccess: (type: 'admin' | 'user', data?: any) => void;
  onSwitch: () => void;
  onBack: () => void;
}

const Auth: React.FC<AuthProps> = ({ type, onAuthSuccess, onSwitch, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Sanitize inputs
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPassword = password.trim();

    if (type === 'login') {
      // Admin Logic: Check for the specific admin credentials
      // Now accepts 'CreateSalon@gmail.com' OR 'salon@gmail.com'
      const adminEmails = ['createsalon@gmail.com', 'salon@gmail.com'];
      
      if (adminEmails.includes(sanitizedEmail) && sanitizedPassword === 'salon123') {
        onAuthSuccess('admin');
      } else {
        // Mock User Login logic (fallback if not admin)
        if (sanitizedEmail && sanitizedPassword) {
            onAuthSuccess('user', { email: sanitizedEmail, name: 'Returning User' });
        } else {
            setError('Invalid credentials');
        }
      }
    } else {
      // Signup Logic
      if (name && sanitizedEmail && sanitizedPassword) {
        onAuthSuccess('user', { name, email: sanitizedEmail });
      } else {
        setError('Please fill in all fields');
      }
    }
  };

  return (
    <div className="min-h-screen bg-luxury-black flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>

      <button onClick={onBack} className="absolute top-6 left-6 text-gray-400 hover:text-white flex items-center">
        <ArrowLeft size={20} className="mr-2" /> Back to Home
      </button>

      <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-white/10 relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-white mb-2">
            {type === 'login' ? 'Welcome Back' : 'Join Lumière Elite'}
          </h1>
          <p className="text-gray-400 text-sm">
            {type === 'login' 
              ? 'Enter your details to access your account' 
              : 'Create an account to unlock exclusive member benefits'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs text-gray-400 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-500" size={18} />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-gold-500 focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs text-gray-400 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-gold-500 focus:outline-none transition-colors"
                placeholder="createsalon@gmail.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-10 text-white focus:border-gold-500 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <button 
            type="submit" 
            className="w-full bg-gold-500 text-black font-bold py-3 rounded-lg hover:bg-white transition-all transform active:scale-95 mt-4"
          >
            {type === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-400">
            {type === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button onClick={onSwitch} className="text-gold-500 hover:underline font-medium">
              {type === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
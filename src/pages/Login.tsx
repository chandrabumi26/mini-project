import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Lock, User as UserIcon, Package, Loader2, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loginAsync } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showFixedModal, setShowFixedModal] = React.useState(false);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginAsync({ username, password, expiresInMins: 30 }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
      <AnimatePresence>
        {showFixedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFixedModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-card border rounded-4xl p-8 shadow-2xl text-center space-y-6 overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-32 w-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="h-20 w-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="text-primary" size={40} />
              </div>
              <h3 className="text-2xl font-black tracking-tight">Login Credentials</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">
                Login ini menggunakan dummyjson.com, jadi untuk username dan password sudah ada di dummyjson.com
              </p>
              <div className="text-left">
                <p className="text-sm font-medium">Username: emilys</p>
                <p className="text-sm font-medium">Password: emilyspass</p>
              </div>
              <button 
                onClick={() => setShowFixedModal(false)}
                className="w-full py-4 bg-primary text-primary-foreground font-black rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-card border rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package size={32} />
          </div>
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-muted-foreground mt-2">Sign in to your account to continue</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-xl flex items-center gap-3">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium ml-1">Username</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full pl-10 pr-4 py-3 bg-background border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-background border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 hover:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t text-center">
          <p onClick={() => setShowFixedModal(true)} className="text-sm text-muted-foreground">
            Don't have an account? <span className="text-primary font-medium cursor-pointer hover:underline">Contact Admin</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

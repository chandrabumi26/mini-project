import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Package, LogOut, ChevronRight, X } from 'lucide-react';
import { useAppDispatch } from '../app/hooks';
import { logout } from '../features/auth/authSlice';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    onClose();
  };

  const menuItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Product', path: '/products', icon: <Package size={20} /> },
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          exit={{ x: -280 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`fixed inset-y-0 left-0 w-72 bg-card border-r flex flex-col h-full z-50 lg:translate-x-0 transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:static lg:translate-x-0'
          }`}
        >
          <div className="p-6 flex items-center justify-between">
            <h1 className="text-2xl font-black text-primary flex items-center gap-3 tracking-tighter">
              <div className="h-10 w-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                 <Package className="text-primary" size={24} />
              </div>
              MiniProject
            </h1>
            <button 
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-secondary rounded-xl text-muted-foreground"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            <p className="px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 mb-4 ml-1">Main Menu</p>
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose()}
                className={({ isActive }) =>
                  `flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-bold text-sm tracking-tight">{item.name}</span>
                </div>
                <ChevronRight size={16} className="opacity-50" />
              </NavLink>
            ))}
          </nav>

          <div className="p-6 border-t border-border/50">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-4 rounded-2xl text-destructive font-bold text-sm hover:bg-destructive/10 transition-all border border-transparent hover:border-destructive/20"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
            <p className="mt-6 text-[10px] text-center text-muted-foreground/40 font-medium">Mini Project v1.0.0</p>
          </div>
        </motion.aside>
      </AnimatePresence>
    </>
  );
};

export default Sidebar;

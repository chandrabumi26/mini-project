import React from 'react';
import { useAppSelector } from '../app/hooks';
import { User as UserIcon, Menu } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className="h-16 border-b bg-card px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-secondary rounded-xl lg:hidden text-muted-foreground transition-all"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-8 w-px bg-border mx-1 md:mx-2" />
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-none">
              {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
            </p>
            <p className="text-[10px] text-muted-foreground font-medium">{user?.email || 'guest@example.com'}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground overflow-hidden shadow-lg shadow-primary/20">
            {user?.image ? (
              <img src={user.image} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              <UserIcon size={24} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

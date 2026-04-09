import React from 'react';
import { useAppSelector } from '../app/hooks';
import { User as UserIcon } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className="h-16 border-b bg-card px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
      </div>

      <div className="flex items-center gap-4">
        <div className="h-8 w-px bg-border mx-2" />
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium leading-none">
              {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
            </p>
            <p className="text-xs text-muted-foreground">{user?.email || 'guest@example.com'}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground overflow-hidden">
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

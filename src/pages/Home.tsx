import React from 'react';
import { useAppSelector } from '../app/hooks';

const Home: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {user ? `${user.firstName} ${user.lastName}` : 'User'}!
        </h1>
        <p className="text-muted-foreground mt-1">Here is what's happening today.</p>
      </div>
    </div>
  );
};

export default Home;

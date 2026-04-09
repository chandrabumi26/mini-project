import React from 'react';
import { useAppSelector } from '../app/hooks';
import { motion } from 'framer-motion';
import { Package, TrendingUp, Users, DollarSign } from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  const stats = [
    { label: 'Total Products', value: '124', icon: <Package />, color: 'bg-blue-500' },
    { label: 'Active Users', value: '1.2k', icon: <Users />, color: 'bg-indigo-500' },
    { label: 'Total Revenue', value: '$45.2k', icon: <DollarSign />, color: 'bg-emerald-500' },
    { label: 'Growth', value: '+12%', icon: <TrendingUp />, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {user ? `${user.firstName} ${user.lastName}` : 'User'}!
        </h1>
        <p className="text-muted-foreground mt-1">Here is what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-card border rounded-2xl flex items-center shadow-sm"
          >
            <div className={`h-12 w-12 ${stat.color} text-white rounded-xl flex items-center justify-center mr-4`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border rounded-2xl h-96 flex items-center justify-center text-muted-foreground p-6">
          Chart Placeholder
        </div>
        <div className="bg-card border rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center" />
                <div>
                  <p className="text-sm font-medium">New product added: iPhone 15</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

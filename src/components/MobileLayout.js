import React from 'react';
import MobileNavigation from './MobileNavigation';

const MobileLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      {/* Main Content */}
      <main className="pb-20 lg:pb-0">
        {children}
      </main>
      
      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
};

export default MobileLayout;
import React from 'react';
import Navigation from '@/components/Navigation';
import EcoHero from '@/components/EcoHero';
import EcoDashboard from '@/components/EcoDashboard';
import EcoFeatures from '@/components/EcoFeatures';
import EcoCommunity from '@/components/EcoCommunity';
import EcoFooter from '@/components/EcoFooter';
import ProtectedRoute from '@/components/ProtectedRoute';

const Index = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />
        <EcoHero />
        <EcoDashboard />
        <EcoFeatures />
        <EcoCommunity />
        <EcoFooter />
      </div>
    </ProtectedRoute>
  );
};

export default Index;

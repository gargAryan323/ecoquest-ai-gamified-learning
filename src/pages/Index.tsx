import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import EcoHero from '@/components/EcoHero';
import EcoDashboard from '@/components/EcoDashboard';
import EcoFeatures from '@/components/EcoFeatures';
import EcoQuizzes from '@/components/EcoQuizzes';
import EcoCommunity from '@/components/EcoCommunity';
import EcoFooter from '@/components/EcoFooter';
import UserProfile from '@/components/UserProfile';
import ProtectedRoute from '@/components/ProtectedRoute';

const Index = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'profile':
        return <UserProfile />;
      case 'quizzes':
        return <EcoQuizzes />;
      default:
        return (
          <>
            <EcoHero />
            <EcoDashboard />
            <EcoQuizzes />
            <EcoFeatures />
            <EcoCommunity />
            <EcoFooter />
          </>
        );
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation currentView={currentView} setCurrentView={setCurrentView} />
        {renderCurrentView()}
      </div>
    </ProtectedRoute>
  );
};

export default Index;

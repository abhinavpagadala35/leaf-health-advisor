import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { CropDetection } from './CropDetection';
import { CommonDiseases } from './CommonDiseases';
import { History } from './History';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <CropDetection />;
      case 'diseases':
        return <CommonDiseases />;
      case 'history':
        return <History />;
      default:
        return <CropDetection />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="py-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;

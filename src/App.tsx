import { useState } from 'react';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { TimeConverter } from './components/TimeConverter';
import { UnitConverter } from './components/UnitConverter';
import { JSONTools } from './components/JSONTools';
import { XMLTools } from './components/XMLTools';
import { PasswordGenerator } from './components/PasswordGenerator';
import { ImageTools } from './components/ImageTools';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentTool, setCurrentTool] = useState('home');

  const renderTool = () => {
    switch (currentTool) {
      case 'home':
        return <HomePage onNavigate={setCurrentTool} />;
      case 'time':
        return <TimeConverter />;
      case 'units':
        return <UnitConverter />;
      case 'json':
        return <JSONTools />;
      case 'xml':
        return <XMLTools />;
      case 'password':
        return <PasswordGenerator />;
      case 'image':
        return <ImageTools />;
      default:
        return <HomePage onNavigate={setCurrentTool} />;
    }
  };

  return (
    <>
      <Layout currentTool={currentTool} onNavigate={setCurrentTool}>
        {renderTool()}
      </Layout>
      <Toaster />
    </>
  );
}

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import ThemeSlider from './components/ThemeSlider';
import { LanguageProvider } from './utils/LanguageContext';

// Page components
import HomePage from './pages/HomePage';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ThemeSlider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            
            {/* Main Content routing */}
            <main style={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            
            <Footer />
            <FloatingActions />
          </div>
        </ThemeSlider>
      </Router>
    </LanguageProvider>
  );
}

export default App;

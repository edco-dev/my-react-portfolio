import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';

const App: React.FC = () => {
  // Initialize dark mode state and check localStorage for preference
  const storedTheme = localStorage.getItem('theme');
  const [isDarkMode, setIsDarkMode] = useState(storedTheme === 'dark' ? true : false);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light'); // Save preference in localStorage
      return newMode;
    });
  };

  // Apply dark mode class to body on theme change
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      {/* Pass props to Header */}
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main style={{ padding: '20px' }}>
        <Routes>
          {/* Render Home inside Routes with the isDarkMode prop */}
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;

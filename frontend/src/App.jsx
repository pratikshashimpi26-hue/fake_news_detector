import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import History from './pages/History';
import About from './pages/About';

function App() {
  const [lang, setLang] = useState('en');

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#0d0a1a' }}>
        <Navbar lang={lang} setLang={setLang} />
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/history" element={<History lang={lang} />} />
          <Route path="/about" element={<About lang={lang} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
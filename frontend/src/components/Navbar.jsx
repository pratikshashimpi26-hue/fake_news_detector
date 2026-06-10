import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{ background: '#0d1426', borderBottom: '1px solid #1e2d4a' }}
      className="px-4 py-4 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2">
          <div style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm">
            🧠
          </div>
          <span className="text-white font-bold text-lg">
            Fake<span style={{ color: '#3b82f6' }}>News</span>Detector
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {[
            { path: '/', label: '🏠 Home' },
            { path: '/history', label: '📋 History' },
            { path: '/about', label: 'ℹ️ About' },
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              style={isActive(path)
                ? { background: '#1e3a5f', color: '#60a5fa', border: '1px solid #2563eb' }
                : { color: '#94a3b8', border: '1px solid transparent' }}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:text-white"
            >
              {label}
            </Link>
          ))}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
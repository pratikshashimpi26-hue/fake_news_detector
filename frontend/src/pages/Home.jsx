import { useState } from 'react';
import ResultCard from '../components/ResultCard';
import { predictArticle } from '../services/api';

function Home() {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (text.length < 50) {
      setError('Please enter at least 50 characters of article text.');
      return;
    }
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const data = await predictArticle(text, title);
      setResult(data);
    } catch (err) {
      setError('Cannot connect to backend. Make sure FastAPI is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setTitle('');
    setResult(null);
    setError('');
  };

  return (
    <div style={{ background: '#0a0f1e', minHeight: '100vh' }}>
      <div className="max-w-3xl mx-auto px-4 py-12">

        <div className="text-center mb-10">
          <div
           
          >
            <span className="text-4xl"></span>
          </div>
          <h1 className="text-4xl font-black text-white mb-3 md:text-5xl">
            Fake News Detector
          </h1>
          <p style={{ color: '#60a5fa' }} className="text-lg mb-5">
            AI-powered news verification using Machine Learning
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['98.82% Accuracy', '44,898 Articles Trained', 'NLP Powered'].map((tag) => (
              <span
                key={tag}
                style={{ background: '#111827', border: '1px solid #1e2d4a', color: '#94a3b8' }}
                className="text-xs px-3 py-1 rounded-full"
              >
                ✦ {tag}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{ background: '#111827', border: '1px solid #1e2d4a' }}
          className="rounded-2xl p-6 md:p-8 shadow-2xl"
        >
          <div className="mb-5">
            <label style={{ color: '#94a3b8' }} className="block text-xs uppercase tracking-wider mb-2 font-medium">
              Article Headline (optional)
            </label>
            <input
              type="text"
              placeholder="Enter the news headline..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ background: '#0a0f1e', border: '1px solid #1e2d4a', color: '#fff' }}
              className="w-full rounded-xl px-4 py-3 text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-3">
            <label style={{ color: '#94a3b8' }} className="block text-xs uppercase tracking-wider mb-2 font-medium">
              Article Content *
            </label>
            <textarea
              placeholder="Paste the full news article here (minimum 50 characters)..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              style={{ background: '#0a0f1e', border: '1px solid #1e2d4a', color: '#fff' }}
              className="w-full rounded-xl px-4 py-3 text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <p className="text-xs" style={{ color: '#64748b' }}>
              {text.length} characters
              {text.length > 0 && text.length < 50 && (
                <span style={{ color: '#f59e0b' }} className="ml-1">
                  — need {50 - text.length} more
                </span>
              )}
              {text.length >= 50 && (
                <span style={{ color: '#22c55e' }} className="ml-1">✓ Ready to analyze</span>
              )}
            </p>
            <p className="text-xs" style={{ color: '#475569' }}>Min. 50 characters</p>
          </div>

          {error && (
            <div
              style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)' }}
              className="mb-5 rounded-xl px-4 py-3"
            >
              <p style={{ color: '#f87171' }} className="text-sm">⚠️ {error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                background: loading ? '#1e3a5f' : 'linear-gradient(135deg, #2563eb, #7c3aed)',
                opacity: loading ? 0.7 : 1,
              }}
              className="flex-1 text-white py-4 rounded-xl font-semibold text-sm transition-all"
            >
              {loading ? '⏳ Analyzing your article...' : '🔍 Analyze Article'}
            </button>
            <button
              onClick={handleClear}
              style={{ border: '1px solid #1e2d4a', color: '#94a3b8' }}
              className="px-6 py-4 rounded-xl text-sm hover:text-white transition-all"
            >
              Clear
            </button>
          </div>
        </div>

        {result && <ResultCard result={result} />}

        <div className="grid grid-cols-3 gap-4 mt-10">
          {[
            { icon: '⚡', title: 'Instant Results', desc: 'Get predictions in milliseconds' },
            { icon: '🎯', title: '98.82% Accurate', desc: 'Trained on 44,898 articles' },
            { icon: '🔒', title: 'All Saved', desc: 'Every check stored securely' },
          ].map((item) => (
            <div
              key={item.title}
              style={{ background: '#111827', border: '1px solid #1e2d4a' }}
              className="rounded-xl p-4 text-center"
            >
              <p className="text-2xl mb-2">{item.icon}</p>
              <p className="text-white text-xs font-semibold mb-1">{item.title}</p>
              <p style={{ color: '#64748b' }} className="text-xs">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Home;
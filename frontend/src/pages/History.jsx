import { useState, useEffect } from 'react';
import { getHistory, deleteArticle } from '../services/api';

function History() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      setArticles(data);
    } catch (err) {
      setError('Could not load history. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id);
      setArticles(articles.filter((a) => a.id !== id));
    } catch (err) {
      setError('Could not delete article.');
    }
  };

  const fakeCount = articles.filter((a) => a.prediction === 'FAKE').length;
  const realCount = articles.filter((a) => a.prediction === 'REAL').length;

  if (loading) {
    return (
      <div style={{ background: '#0a0f1e', minHeight: '100vh' }}
        className="flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">⏳</p>
          <p style={{ color: '#94a3b8' }}>Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#0a0f1e', minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto px-4 py-12">

        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">
             Prediction History
          </h1>
          <p style={{ color: '#64748b' }}>All previously analyzed articles</p>
        </div>

        {articles.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total Checked', value: articles.length, color: '#60a5fa' },
              { label: 'Fake Detected', value: fakeCount, color: '#f87171' },
              { label: 'Real Verified', value: realCount, color: '#4ade80' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{ background: '#111827', border: '1px solid #1e2d4a' }}
                className="rounded-xl p-4 text-center"
              >
                <p style={{ color: stat.color }} className="text-3xl font-black">
                  {stat.value}
                </p>
                <p style={{ color: '#64748b' }} className="text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div
            style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)' }}
            className="mb-6 rounded-xl px-4 py-3"
          >
            <p style={{ color: '#f87171' }} className="text-sm">⚠️ {error}</p>
          </div>
        )}

        {articles.length === 0 ? (
          <div
            style={{ background: '#111827', border: '1px solid #1e2d4a' }}
            className="rounded-2xl p-16 text-center"
          >
            <p className="text-5xl mb-4">📭</p>
            <p className="text-white font-semibold text-lg mb-2">No articles yet</p>
            <p style={{ color: '#64748b' }} className="text-sm">
              Go to the Home page and analyze your first article!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {articles.map((article) => (
              <div
                key={article.id}
                style={{ background: '#111827', border: '1px solid #1e2d4a' }}
                className="rounded-xl p-5 flex items-start justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      style={{
                        background: article.prediction === 'FAKE'
                          ? 'rgba(220,38,38,0.15)'
                          : 'rgba(22,163,74,0.15)',
                        color: article.prediction === 'FAKE' ? '#f87171' : '#4ade80',
                        border: article.prediction === 'FAKE'
                          ? '1px solid rgba(220,38,38,0.3)'
                          : '1px solid rgba(22,163,74,0.3)',
                      }}
                      className="text-xs font-bold px-3 py-1 rounded-full"
                    >
                      {article.prediction}
                    </span>
                    <span style={{ color: '#64748b' }} className="text-xs">
                      {article.confidence}% confidence
                    </span>
                    <span style={{ color: '#334155' }} className="text-xs">
                      #{article.id}
                    </span>
                  </div>

                  <p className="text-white text-sm font-medium mb-1 truncate">
                    {article.title || 'Untitled Article'}
                  </p>

                  <p style={{ color: '#475569' }} className="text-xs">
                    🕒 {new Date(article.analyzed_at).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(article.id)}
                  style={{ color: '#334155' }}
                  className="text-xl hover:text-red-500 transition-colors flex-shrink-0 mt-1"
                  title="Delete this record"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default History;
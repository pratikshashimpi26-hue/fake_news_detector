import { useState, useEffect } from 'react';
import { getHistory, deleteArticle } from '../services/api';

const TRANSLATIONS = {
  en: { title: 'Analysis History', sub: 'All previously analyzed articles', total: 'Total Checked', fake: 'Fake Detected', real: 'Real Verified', empty: 'No articles yet', emptyDesc: 'Go to Home and analyze your first article!', deleteErr: 'Could not delete article.', loadErr: 'Could not load history.', confidence: 'confidence', loading: 'Loading history...' },
  hi: { title: 'विश्लेषण इतिहास', sub: 'सभी पहले विश्लेषण किए गए लेख', total: 'कुल जांचे', fake: 'फेक मिले', real: 'असली सत्यापित', empty: 'कोई लेख नहीं', emptyDesc: 'होम पर जाएं और पहला लेख जांचें!', deleteErr: 'लेख हटाया नहीं जा सका।', loadErr: 'इतिहास लोड नहीं हो सका।', confidence: 'विश्वास', loading: 'लोड हो रहा है...' },
  mr: { title: 'विश्लेषण इतिहास', sub: 'सर्व पूर्वी विश्लेषण केलेले लेख', total: 'एकूण तपासले', fake: 'फेक आढळले', real: 'खरे सत्यापित', empty: 'कोणतेही लेख नाहीत', emptyDesc: 'होमवर जा आणि पहिला लेख तपासा!', deleteErr: 'लेख हटवता आला नाही।', loadErr: 'इतिहास लोड होऊ शकला नाही।', confidence: 'विश्वास', loading: 'लोड होत आहे...' },
  fr: { title: 'Historique', sub: 'Tous les articles analysés', total: 'Total Vérifié', fake: 'Faux Détecté', real: 'Vrai Vérifié', empty: 'Aucun article', emptyDesc: 'Allez à l\'accueil et analysez votre premier article!', deleteErr: 'Impossible de supprimer.', loadErr: 'Impossible de charger.', confidence: 'confiance', loading: 'Chargement...' },
  es: { title: 'Historial', sub: 'Todos los artículos analizados', total: 'Total Revisado', fake: 'Falso Detectado', real: 'Real Verificado', empty: 'Sin artículos', emptyDesc: '¡Ve a Inicio y analiza tu primer artículo!', deleteErr: 'No se pudo eliminar.', loadErr: 'No se pudo cargar.', confidence: 'confianza', loading: 'Cargando...' },
  ar: { title: 'سجل التحليل', sub: 'جميع المقالات المحللة سابقاً', total: 'إجمالي الفحص', fake: 'مزيف مكتشف', real: 'حقيقي موثق', empty: 'لا توجد مقالات', emptyDesc: 'اذهب إلى الصفحة الرئيسية وحلل أول مقال!', deleteErr: 'تعذر الحذف.', loadErr: 'تعذر التحميل.', confidence: 'ثقة', loading: 'جاري التحميل...' },
};

function History({ lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    try {
      const data = await getHistory();
      setArticles(data);
    } catch (err) {
      setError(t.loadErr);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id);
      setArticles(articles.filter((a) => a.id !== id));
      setError('');
    } catch (err) {
      setError(t.deleteErr);
    }
  };

  const fakeCount = articles.filter((a) => a.prediction === 'FAKE').length;
  const realCount = articles.filter((a) => a.prediction === 'REAL').length;

  if (loading) return (
    <div style={{ background: '#0d0a1a', minHeight: '100vh' }} className="flex items-center justify-center">
      <p style={{ color: '#94a3b8' }}>{t.loading}</p>
    </div>
  );

  return (
    <div style={{ background: '#0d0a1a', minHeight: '100vh' }} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">{t.title}</h1>
          <p style={{ color: '#64748b' }}>{t.sub}</p>
        </div>

        {articles.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: t.total, value: articles.length, color: '#c9a84c' },
              { label: t.fake, value: fakeCount, color: '#f87171' },
              { label: t.real, value: realCount, color: '#4ade80' },
            ].map((stat) => (
              <div key={stat.label} style={{ background: '#111827', border: '1px solid #1e2d4a' }} className="rounded-xl p-4 text-center">
                <p style={{ color: stat.color }} className="text-3xl font-black">{stat.value}</p>
                <p style={{ color: '#64748b' }} className="text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)' }} className="mb-6 rounded-xl px-4 py-3">
            <p style={{ color: '#f87171' }} className="text-sm">⚠ {error}</p>
          </div>
        )}

        {articles.length === 0 ? (
          <div style={{ background: '#111827', border: '1px solid #1e2d4a' }} className="rounded-2xl p-16 text-center">
            <p className="text-white font-semibold text-lg mb-2">{t.empty}</p>
            <p style={{ color: '#64748b' }} className="text-sm">{t.emptyDesc}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {articles.map((article) => (
              <div key={article.id} style={{ background: '#111827', border: '1px solid #1e2d4a' }}
                className="rounded-xl p-5 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span style={{
                      background: article.prediction === 'FAKE' ? 'rgba(220,38,38,0.15)' : 'rgba(22,163,74,0.15)',
                      color: article.prediction === 'FAKE' ? '#f87171' : '#4ade80',
                      border: article.prediction === 'FAKE' ? '1px solid rgba(220,38,38,0.3)' : '1px solid rgba(22,163,74,0.3)',
                    }} className="text-xs font-bold px-3 py-1 rounded-full">{article.prediction}</span>
                    <span style={{ color: '#64748b' }} className="text-xs">{article.confidence}% {t.confidence}</span>
                    <span style={{ color: '#334155' }} className="text-xs">#{article.id}</span>
                    {article.original_language && article.original_language !== 'en' && (
                      <span style={{ background: 'rgba(201,168,76,0.1)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.2)' }}
                        className="text-xs px-2 py-0.5 rounded-full">🌐 {article.original_language.toUpperCase()}</span>
                    )}
                  </div>
                  <p className="text-white text-sm font-medium mb-1 truncate">{article.title || 'Untitled Article'}</p>
                  <p style={{ color: '#475569' }} className="text-xs">{new Date(article.analyzed_at).toLocaleString()}</p>
                </div>
                <button onClick={() => handleDelete(article.id)}
                  style={{ color: '#334155' }} className="text-xl hover:text-red-500 transition-colors flex-shrink-0 mt-1">🗑️</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
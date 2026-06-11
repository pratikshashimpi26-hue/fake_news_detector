import { useState } from 'react';
import ResultCard from '../components/ResultCard';
import { predictArticle } from '../services/api';

const TRANSLATIONS = {
  en: {
    title: 'Fake News Detector',
    subtitle: 'AI-powered news verification using Machine Learning',
    headline: 'Article Headline (optional)',
    headlinePlaceholder: 'Enter the news headline...',
    content: 'Article Content *',
    contentPlaceholder: 'Paste the full news article here (minimum 50 characters)...',
    analyze: 'Analyze Article',
    analyzing: 'Analyzing your article...',
    clear: 'Clear',
    minChars: 'Min. 50 characters',
    need: 'need',
    more: 'more',
    ready: 'Ready to analyze',
    errorMin: 'Please enter at least 50 characters of article text.',
    errorBackend: 'Cannot connect to backend. Make sure FastAPI is running on port 8000.',
    tags: ['98.82% Accuracy', '44,898 Articles Trained', 'NLP Powered'],
    features: [
      { title: 'Instant Results', desc: 'Get predictions in milliseconds' },
      { title: '98.82% Accurate', desc: 'Trained on 44,898 articles' },
      { title: 'All Saved', desc: 'Every check stored securely' },
    ],
  },
  hi: {
    title: 'फेक न्यूज़ डिटेक्टर',
    subtitle: 'मशीन लर्निंग द्वारा AI समाचार सत्यापन',
    headline: 'लेख शीर्षक (वैकल्पिक)',
    headlinePlaceholder: 'समाचार शीर्षक दर्ज करें...',
    content: 'लेख सामग्री *',
    contentPlaceholder: 'पूरा समाचार यहाँ पेस्ट करें (न्यूनतम 50 अक्षर)...',
    analyze: 'विश्लेषण करें',
    analyzing: 'विश्लेषण हो रहा है...',
    clear: 'साफ करें',
    minChars: 'न्यूनतम 50 अक्षर',
    need: 'चाहिए',
    more: 'और',
    ready: 'विश्लेषण के लिए तैयार',
    errorMin: 'कृपया कम से कम 50 अक्षर दर्ज करें।',
    errorBackend: 'बैकएंड से कनेक्ट नहीं हो सका।',
    tags: ['98.82% सटीकता', '44,898 लेख प्रशिक्षित', 'NLP संचालित'],
    features: [
      { title: 'तुरंत परिणाम', desc: 'मिलीसेकंड में परिणाम' },
      { title: '98.82% सटीक', desc: '44,898 लेखों पर प्रशिक्षित' },
      { title: 'सुरक्षित', desc: 'हर जांच सुरक्षित रूप से संग्रहीत' },
    ],
  },
  mr: {
    title: 'फेक न्यूज डिटेक्टर',
    subtitle: 'मशीन लर्निंगद्वारे AI बातम्या सत्यापन',
    headline: 'लेखाचे शीर्षक (पर्यायी)',
    headlinePlaceholder: 'बातमीचे शीर्षक टाका...',
    content: 'लेखाचा मजकूर *',
    contentPlaceholder: 'संपूर्ण बातमी येथे पेस्ट करा (किमान 50 अक्षरे)...',
    analyze: 'विश्लेषण करा',
    analyzing: 'विश्लेषण होत आहे...',
    clear: 'साफ करा',
    minChars: 'किमान 50 अक्षरे',
    need: 'हवे',
    more: 'अजून',
    ready: 'विश्लेषणासाठी तयार',
    errorMin: 'कृपया किमान 50 अक्षरे टाका।',
    errorBackend: 'बॅकएंडशी कनेक्ट होता आले नाही।',
    tags: ['98.82% अचूकता', '44,898 लेख प्रशिक्षित', 'NLP चालित'],
    features: [
      { title: 'त्वरित निकाल', desc: 'मिलिसेकंदात निकाल' },
      { title: '98.82% अचूक', desc: '44,898 लेखांवर प्रशिक्षित' },
      { title: 'सुरक्षित', desc: 'प्रत्येक तपासणी सुरक्षित' },
    ],
  },
  fr: {
    title: 'Détecteur de Fausses Nouvelles',
    subtitle: 'Vérification des nouvelles par Intelligence Artificielle',
    headline: 'Titre de l\'article (optionnel)',
    headlinePlaceholder: 'Entrez le titre...',
    content: 'Contenu de l\'article *',
    contentPlaceholder: 'Collez l\'article complet ici (minimum 50 caractères)...',
    analyze: 'Analyser l\'article',
    analyzing: 'Analyse en cours...',
    clear: 'Effacer',
    minChars: 'Min. 50 caractères',
    need: 'besoin de',
    more: 'de plus',
    ready: 'Prêt à analyser',
    errorMin: 'Veuillez entrer au moins 50 caractères.',
    errorBackend: 'Impossible de se connecter au backend.',
    tags: ['98.82% Précision', '44 898 Articles', 'NLP'],
    features: [
      { title: 'Résultats Instantanés', desc: 'Prédictions en millisecondes' },
      { title: '98.82% Précis', desc: 'Entraîné sur 44 898 articles' },
      { title: 'Tout Sauvegardé', desc: 'Chaque vérification stockée' },
    ],
  },
  es: {
    title: 'Detector de Noticias Falsas',
    subtitle: 'Verificación de noticias con Inteligencia Artificial',
    headline: 'Titular del artículo (opcional)',
    headlinePlaceholder: 'Ingrese el titular...',
    content: 'Contenido del artículo *',
    contentPlaceholder: 'Pegue el artículo completo aquí (mínimo 50 caracteres)...',
    analyze: 'Analizar Artículo',
    analyzing: 'Analizando...',
    clear: 'Limpiar',
    minChars: 'Mín. 50 caracteres',
    need: 'necesita',
    more: 'más',
    ready: 'Listo para analizar',
    errorMin: 'Por favor ingrese al menos 50 caracteres.',
    errorBackend: 'No se puede conectar al backend.',
    tags: ['98.82% Precisión', '44.898 Artículos', 'NLP'],
    features: [
      { title: 'Resultados Instantáneos', desc: 'Predicciones en milisegundos' },
      { title: '98.82% Preciso', desc: 'Entrenado en 44.898 artículos' },
      { title: 'Todo Guardado', desc: 'Cada verificación almacenada' },
    ],
  },
  ar: {
    title: 'كاشف الأخبار الكاذبة',
    subtitle: 'التحقق من الأخبار بالذكاء الاصطناعي',
    headline: 'عنوان المقال (اختياري)',
    headlinePlaceholder: 'أدخل عنوان الخبر...',
    content: 'محتوى المقال *',
    contentPlaceholder: 'الصق المقال الكامل هنا (50 حرفاً على الأقل)...',
    analyze: 'تحليل المقال',
    analyzing: 'جاري التحليل...',
    clear: 'مسح',
    minChars: 'الحد الأدنى 50 حرفاً',
    need: 'تحتاج',
    more: 'أكثر',
    ready: 'جاهز للتحليل',
    errorMin: 'يرجى إدخال 50 حرفاً على الأقل.',
    errorBackend: 'لا يمكن الاتصال بالخادم.',
    tags: ['دقة 98.82%', '44,898 مقال', 'معالجة اللغة'],
    features: [
      { title: 'نتائج فورية', desc: 'تنبؤات في ميلي ثانية' },
      { title: 'دقة 98.82%', desc: 'مدرب على 44,898 مقال' },
      { title: 'كل شيء محفوظ', desc: 'كل فحص مخزن بأمان' },
    ],
  },
};

function Home({ lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (text.length < 50) { setError(t.errorMin); return; }
    setError(''); setResult(null); setLoading(true);
    try {
      const data = await predictArticle(text, title);
      setResult(data);
    } catch (err) {
      setError(t.errorBackend);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => { setText(''); setTitle(''); setResult(null); setError(''); };

  return (
    <div style={{ background: '#0d0a1a', minHeight: '100vh' }} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-3 md:text-5xl">{t.title}</h1>
          <p style={{ color: '#c9a84c' }} className="text-lg mb-5">{t.subtitle}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {t.tags.map((tag) => (
              <span key={tag} style={{ background: '#111827', border: '1px solid #1e2d4a', color: '#94a3b8' }}
                className="text-xs px-3 py-1 rounded-full">✦ {tag}</span>
            ))}
          </div>
        </div>

        <div style={{ background: '#111827', border: '1px solid #1e2d4a' }} className="rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="mb-5">
            <label style={{ color: '#94a3b8' }} className="block text-xs uppercase tracking-wider mb-2 font-medium">{t.headline}</label>
            <input type="text" placeholder={t.headlinePlaceholder} value={title} onChange={(e) => setTitle(e.target.value)}
              style={{ background: '#0d0a1a', border: '1px solid #1e2d4a', color: '#fff' }}
              className="w-full rounded-xl px-4 py-3 text-sm placeholder-slate-600 focus:outline-none focus:border-yellow-500" />
          </div>
          <div className="mb-3">
            <label style={{ color: '#94a3b8' }} className="block text-xs uppercase tracking-wider mb-2 font-medium">{t.content}</label>
            <textarea placeholder={t.contentPlaceholder} value={text} onChange={(e) => setText(e.target.value)} rows={8}
              style={{ background: '#0d0a1a', border: '1px solid #1e2d4a', color: '#fff' }}
              className="w-full rounded-xl px-4 py-3 text-sm placeholder-slate-600 focus:outline-none focus:border-yellow-500 resize-none" />
          </div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs" style={{ color: '#64748b' }}>
              {text.length} characters
              {text.length > 0 && text.length < 50 && (
                <span style={{ color: '#f59e0b' }} className="ml-1">— {t.need} {50 - text.length} {t.more}</span>
              )}
              {text.length >= 50 && (
                <span style={{ color: '#22c55e' }} className="ml-1">✓ {t.ready}</span>
              )}
            </p>
            <p className="text-xs" style={{ color: '#475569' }}>{t.minChars}</p>
          </div>
          {error && (
            <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)' }} className="mb-5 rounded-xl px-4 py-3">
              <p style={{ color: '#f87171' }} className="text-sm">⚠ {error}</p>
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={handleSubmit} disabled={loading}
              style={{ background: loading ? '#1e3a5f' : 'linear-gradient(135deg,#c9a84c,#e8c76a)', opacity: loading ? 0.7 : 1, color: loading ? '#fff' : '#0d0a1a' }}
              className="flex-1 py-4 rounded-xl font-semibold text-sm transition-all">
              {loading ? t.analyzing : t.analyze}
            </button>
            <button onClick={handleClear} style={{ border: '1px solid #1e2d4a', color: '#94a3b8' }}
              className="px-6 py-4 rounded-xl text-sm hover:text-white transition-all">{t.clear}</button>
          </div>
        </div>

        {result && <ResultCard result={result} lang={lang} />}

        <div className="grid grid-cols-3 gap-4 mt-10">
          {t.features.map((item) => (
            <div key={item.title} style={{ background: '#111827', border: '1px solid #1e2d4a' }} className="rounded-xl p-4 text-center">
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
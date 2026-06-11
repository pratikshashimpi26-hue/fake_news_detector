function About() {
  const stack = [
    { layer: 'ML Layer', color: '#7c3aed', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', items: ['Python 3.10', 'Scikit-learn', 'NLTK', 'TF-IDF', 'Pandas'] },
    { layer: 'Backend', color: '#2563eb', bg: 'rgba(37,99,235,0.1)', border: 'rgba(37,99,235,0.3)', items: ['FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Pydantic', 'Uvicorn'] },
    { layer: 'Frontend', color: '#0891b2', bg: 'rgba(8,145,178,0.1)', border: 'rgba(8,145,178,0.3)', items: ['React.js', 'Tailwind CSS', 'Axios', 'React Router', 'Vite'] },
  ];
  const stats = [
    { label: 'Accuracy', value: '98.82%' },
    { label: 'F1 Score', value: '0.99' },
    { label: 'Articles Trained', value: '44,898' },
    { label: 'Algorithm', value: 'Logistic Regression' },
  ];
  const steps = [
    'User pastes a news article into the input form',
    'React sends the text to FastAPI backend via Axios',
    'Pydantic validates the incoming request data',
    'Predictor service loads model.pkl and vectorizer.pkl',
    'TF-IDF converts text to numbers, model predicts',
    'Result saved to PostgreSQL via SQLAlchemy',
    'FAKE or REAL verdict returned with confidence score',
  ];
  return (
    <div style={{ background: '#0a0f1e', minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="text-6xl"></span>
          <h1 className="text-4xl font-black text-white mt-4 mb-3">About This Project</h1>
          <p style={{ color: '#64748b' }} className="text-lg max-w-xl mx-auto">
            An AI-powered full-stack web application that detects fake news using Machine Learning and NLP
          </p>
        </div>
        <div style={{ background: '#111827', border: '1px solid #1e2d4a' }} className="rounded-2xl p-6 mb-6">
          <h2 className="text-white font-bold text-lg mb-4">📊 Model Performance</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} style={{ background: '#0a0f1e', border: '1px solid #1e2d4a' }} className="rounded-xl p-4 text-center">
                <p style={{ color: '#60a5fa' }} className="text-xl font-black mb-1">{s.value}</p>
                <p style={{ color: '#64748b' }} className="text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#111827', border: '1px solid #1e2d4a' }} className="rounded-2xl p-6 mb-6">
          <h2 className="text-white font-bold text-lg mb-4">⚙️ How It Works</h2>
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', flexShrink: 0 }} className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                <p style={{ color: '#94a3b8' }} className="text-sm">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#111827', border: '1px solid #1e2d4a' }} className="rounded-2xl p-6 mb-6">
          <h2 className="text-white font-bold text-lg mb-4">🛠️ Tech Stack</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {stack.map((s) => (
              <div key={s.layer} style={{ background: s.bg, border: `1px solid ${s.border}` }} className="rounded-xl p-4">
                <p style={{ color: s.color }} className="font-bold text-sm mb-3">{s.layer}</p>
                <div className="space-y-1">
                  {s.items.map((item) => (
                    <p key={item} style={{ color: '#94a3b8' }} className="text-xs">• {item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#111827', border: '1px solid #1e2d4a' }} className="rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-4">👩‍💻 Developer</h2>
          <div className="flex items-center gap-4">
            <div style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }} className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
              👩‍💻
            </div>
            <div>
              <p className="text-white font-bold text-lg">Pratiksha Shimpi</p>
              <p style={{ color: '#64748b' }} className="text-sm">AIML Engineering Student</p>
              <a href="https://github.com/pratikshashimpi26-hue/fake_news_detector" target="_blank" rel="noreferrer" style={{ color: '#60a5fa' }} className="text-sm hover:underline mt-1 inline-block">
                github.com/pratikshashimpi26-hue/fake_news_detector →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
function ResultCard({ result }) {
  const isFake = result.prediction === 'FAKE';

  return (
    <div
      style={{
        background: isFake
          ? 'linear-gradient(135deg, #2d0a0a, #1a0505)'
          : 'linear-gradient(135deg, #0a2d0a, #051a05)',
        border: isFake ? '1px solid #dc2626' : '1px solid #16a34a',
      }}
      className="mt-6 rounded-2xl p-8 shadow-2xl"
    >
      <div className="flex flex-col items-center text-center mb-6">
        <span className="text-6xl mb-4">{isFake ? '🚨' : '✅'}</span>
        <p className="text-slate-400 text-xs uppercase tracking-widest mb-2">
          AI Verdict
        </p>
        <h2
          style={{ color: isFake ? '#f87171' : '#4ade80' }}
          className="text-6xl font-black tracking-tight"
        >
          {result.prediction}
        </h2>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-400 text-sm">Confidence</span>
          <span
            style={{ color: isFake ? '#f87171' : '#4ade80' }}
            className="font-bold text-xl"
          >
            {result.confidence}%
          </span>
        </div>
        <div className="w-full rounded-full h-3" style={{ background: '#1e293b' }}>
          <div
            style={{
              width: `${result.confidence}%`,
              background: isFake
                ? 'linear-gradient(90deg, #dc2626, #f87171)'
                : 'linear-gradient(90deg, #16a34a, #4ade80)',
              transition: 'width 1s ease-in-out',
            }}
            className="h-3 rounded-full"
          />
        </div>
      </div>

      <div
        style={{
          background: isFake ? 'rgba(220,38,38,0.1)' : 'rgba(22,163,74,0.1)',
          border: isFake ? '1px solid rgba(220,38,38,0.3)' : '1px solid rgba(22,163,74,0.3)',
        }}
        className="rounded-xl px-4 py-3 text-center text-sm mb-4"
      >
        <p style={{ color: isFake ? '#fca5a5' : '#86efac' }}>
          {isFake
            ? '⚠️ This article shows signs of misinformation. Please verify with trusted sources before sharing.'
            : '✔️ This article appears to be legitimate news. Always verify important information independently.'}
        </p>
      </div>

      <p className="text-center text-slate-600 text-xs">
        Analysis ID #{result.id} · Saved to database ·{' '}
        {new Date(result.analyzed_at).toLocaleString()}
      </p>
    </div>
  );
}

export default ResultCard;
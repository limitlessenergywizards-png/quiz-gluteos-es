export default function ProgressBar({ currentQuestion, totalQuestions }) {
  // Use Math.max/min to keep it within 0-100 safely
  const percentage = Math.min(100, Math.max(0, (currentQuestion / totalQuestions) * 100)) || 0;
  
  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-center space-x-2 text-2xl mb-4">
        <span role="img" aria-label="peach">🍑</span>
        <span role="img" aria-label="measuring tape">📏</span>
      </div>
      
      <div className="w-full bg-[#E5E7EB] rounded-full h-3 overflow-hidden shadow-inner relative">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6B21A8]"
          style={{ width: `${percentage}%`, transition: 'width 400ms ease-out' }}
        ></div>
        
        {/* Glow effect on the tip of the progress bar */}
        <div 
          className="absolute top-0 bottom-0 w-2 bg-white/40 blur-[2px]"
          style={{ left: `calc(${percentage}% - 4px)`, transition: 'left 400ms ease-out' }}
        ></div>
      </div>
      
      <div className="text-center mt-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
        Progreso: {Math.round(percentage)}%
      </div>
    </div>
  );
}

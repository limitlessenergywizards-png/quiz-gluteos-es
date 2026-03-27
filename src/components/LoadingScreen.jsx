import { useEffect, useState } from 'react';

export default function LoadingScreen({ data, onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTime = Date.now();
    const duration = 4000;
    const targetPercent = data?.percent || 100;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * targetPercent, targetPercent);
      setProgress(newProgress);
    }, 50);

    const timeout = setTimeout(() => {
      if (onComplete) onComplete();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [data, onComplete]);

  return (
    <div className="flex flex-col items-center min-h-[100dvh] bg-gradient-to-b from-[#1E1B2E] to-[#3B0764] text-white px-5 py-4 w-full absolute inset-0 z-50 overflow-y-auto" style={{ animation: 'fadeIn 0.3s ease' }}>

      <div className="text-[2rem] animate-bounce flex-shrink-0">🍑</div>

      {/* Image or placeholder — flexible height */}
      {data?.image ? (
        <div className={`${data?.imageSmall ? 'w-3/5 max-w-[220px]' : 'w-[90%] max-w-[360px]'} mx-auto my-3 rounded-xl overflow-hidden shadow-2xl border border-white/10 flex-shrink-0`}>
          <img src={data.image} alt="" className="w-full h-auto rounded-xl" />
        </div>
      ) : (
        <div className="flex-1 min-h-0 w-full max-w-[260px] mx-auto my-3 rounded-xl overflow-hidden shadow-2xl relative border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/50 to-[#EA580C]/40 flex">
            <div className="w-1/2 h-full border-r-[2px] border-white/30 flex items-end p-2 px-3 pb-3">
               <span className="bg-black/60 backdrop-blur-md text-[10px] font-black tracking-widest px-2 py-1 rounded border border-white/20">ANTES</span>
            </div>
            <div className="w-1/2 h-full flex items-end justify-end p-2 px-3 pb-3">
               <span className="bg-black/60 backdrop-blur-md text-[10px] font-black tracking-widest px-2 py-1 rounded border border-white/20">DESPUÉS</span>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-[18px] font-extrabold text-center leading-snug drop-shadow-md flex-shrink-0">
        {data?.title || "Analizando..."}
      </h2>

      {/* Progress bar */}
      <div className="w-full max-w-sm bg-white/10 rounded-full h-2.5 mt-3 mb-1 overflow-hidden shadow-inner border border-white/5 flex-shrink-0">
        <div
          className="bg-brand-lavender h-full rounded-full shadow-[0_0_10px_rgba(167,139,250,0.8)]"
          style={{ '--target-width': `${data?.percent || 100}%`, animation: 'progressFill 4s ease-out forwards' }}
        ></div>
      </div>
      <div className="text-right w-full max-w-sm text-xs font-black text-brand-lavender mb-3 tracking-widest flex-shrink-0">
        {Math.round(progress)}%
      </div>

      {/* Check items */}
      <div className="w-full max-w-sm flex flex-col space-y-2 flex-shrink-0 pb-2">
        {data?.items?.map((item, index) => (
          <div
             key={index}
             className="flex items-center space-x-3 bg-white/5 p-2.5 rounded-lg border border-white/10 shadow-lg backdrop-blur-sm"
             style={{ animation: `checkAppear 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards ${index * 0.9}s`, opacity: 0 }}
          >
            <div className="bg-[#15803D] text-white rounded-full p-0.5 flex-shrink-0 shadow-sm border border-green-400/50">
               <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <span className="text-[13px] font-semibold text-white/90 leading-tight">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

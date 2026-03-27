import { useState, useEffect } from 'react';
import { trackEvent } from '../lib/tracking';

export default function DiagnosticScreen({ onContinue }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0=loading, 1=text+items, 2=headline+video+cta
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    // Facebook Pixel: AddToCart ao chegar no diagnóstico
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'AddToCart');
    }

    const startTime = Date.now();
    const duration = 2500;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      if (p >= 100) clearInterval(interval);
    }, 40);

    const t1 = setTimeout(() => setPhase(1), 2600);
    const t2 = setTimeout(() => setPhase(2), 3400);
    // Botão aparece 1min54s após o vídeo ficar visível
    const tCta = setTimeout(() => setShowCta(true), 3400 + 114000);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(tCta);
    };
  }, []);

  return (
    <div className="w-full bg-white pb-10" style={{ animation: 'fadeIn 0.5s ease forwards' }}>
      <div className="max-w-md mx-auto px-5 pt-6 text-center">

        {/* Badge */}
        <div className="inline-block bg-purple-100 border border-purple-200 text-brand-purple font-extrabold px-5 py-2 rounded-full text-sm mb-3 shadow-sm tracking-wide">
          ✨ Diagnóstico completo ✨
        </div>

        {/* Progress bar animada */}
        <div className="text-right text-xs font-bold text-gray-500 mb-1">{Math.round(progress)}%</div>
        <div className="w-full bg-gray-100 rounded-full h-3 mb-1 overflow-hidden shadow-inner">
          <div
            className="bg-brand-violet h-3 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Separador */}
        <hr className="border-gray-200 my-4" />

        {/* Texto + itens */}
        <div className={`transition-all duration-500 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-gray-900 font-bold text-[15px] mb-4 leading-snug px-1">
            Analizamos tus respuestas e identificamos <strong className="text-[#9333EA]">EXACTAMENTE</strong> lo que te impide tener piernas torneadas y glúteos levantados.
          </p>

          {/* 3 items centralizados */}
          <div className="mb-4 space-y-1">
            <p className="text-gray-800 text-[14px] font-bold">🔍 3 patrones detectados</p>
            <p className="text-gray-800 text-[14px] font-bold">👎 1 mentira revelada</p>
            <p className="text-[#15803D] text-[14px] font-bold">✅ 1 solución personalizada</p>
          </div>
        </div>

        {/* Headline + Video + CTA */}
        <div className={`transition-all duration-500 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-[22px] font-black text-[#9333EA] mb-5 leading-tight px-1">
            🎥 ¡Mira el video abajo para desbloquear el Truco del Glúteo ahora!
          </h2>

          {/* Vturb VSL */}
          <div className="w-full rounded-2xl shadow-xl overflow-hidden mb-5" ref={el => {
            if (el && !el.querySelector('vturb-smartplayer')) {
              el.innerHTML = '<vturb-smartplayer id="vid-69c1c83e137969468e7fd27e" style="display:block;margin:0 auto;width:100%;"></vturb-smartplayer>';
              const s = document.createElement('script');
              s.src = 'https://scripts.converteai.net/32cab6bb-dc59-4d18-808f-70f5e4db8cac/players/69c1c83e137969468e7fd27e/v4/player.js';
              s.async = true;
              document.head.appendChild(s);
            }
          }}></div>

          {/* Texto + CTA — aparecem após 40s de vídeo */}
          <div className={`transition-all duration-700 ${showCta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <p className="text-[14px] text-gray-700 font-extrabold mb-6 leading-snug px-2">
              ⏳ Estás a 30 segundos de conquistar piernas y glúteos lindos <span className="text-red-500 border-b-2 border-red-200">SIN SENTADILLAS</span>
            </p>

            <button
              onClick={onContinue}
              className="w-full bg-[#15803D] hover:bg-green-800 text-white font-black text-[20px] py-5 min-h-[48px] rounded-2xl shadow-[0_12px_24px_rgba(21,128,61,0.3)] transition-transform transform hover:-translate-y-1 active:scale-[0.98] tracking-wide animate-cta-pulse"
            >
              Quiero mi Guía Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

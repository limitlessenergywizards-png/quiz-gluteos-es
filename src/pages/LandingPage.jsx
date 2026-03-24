import Timer from '../components/Timer';

export default function LandingPage({ onStartQuiz }) {
  return (
    <div className="flex flex-col items-center bg-white text-center fade-in w-full overflow-x-hidden h-[100dvh] overflow-y-hidden">

      {/* 1. Imagem antes/depois */}
      <div className="w-full select-none pt-3 px-3 flex-shrink min-h-0 flex-1">
        <img
          src="/images/antes-despues.png"
          alt="Antes y Después - Truco del Glúteo"
          className="w-full h-full object-contain rounded-[14px]"
        />
      </div>

      {/* 2. Bloco de urgência */}
      <div className="w-full px-4 mt-1 flex-shrink-0">
        <p className="text-gray-800 text-[12px] font-medium leading-snug mb-0.5">
          ⚠️ Atención, debido al alto volumen de accesos, esta <strong className="text-[#EA580C]">oportunidad se ofrece gratuitamente solo 1 vez por persona</strong>.
        </p>
        <p className="text-red-600 text-[12px] font-black leading-snug">
          Si sales, perderás tu turno.
        </p>
      </div>

      {/* 3. Botão CTA com animação pulse */}
      <div className="w-full px-4 mt-2 flex-shrink-0">
        <button
          onClick={onStartQuiz}
          className="w-full bg-[#15803D] text-white font-black text-[15px] py-3 min-h-[48px] rounded-full shadow-[0_8px_20px_rgba(21,128,61,0.4)] flex justify-center items-center border border-green-600 animate-cta-pulse"
        >
          <span>Obtener Truco del Glúteo Ahora</span>
          <svg className="w-5 h-5 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
      </div>

      {/* 4. Timer regressivo */}
      <div className="w-full px-4 mt-2 mb-2 flex-shrink-0">
        <div className="bg-[#FEE2E2] border border-[#FECACA] rounded-lg py-2 px-3 shadow-sm flex items-center justify-center gap-2">
          <p className="text-red-700 font-bold text-[11px] uppercase tracking-wide">
            Acceso liberado por los próximos:
          </p>
          <span className="text-[1.1rem] font-black text-red-600 leading-none">
            <Timer initialSeconds={10 * 60} />
          </span>
        </div>
      </div>
    </div>
  );
}

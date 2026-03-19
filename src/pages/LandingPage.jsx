import Timer from '../components/Timer';

export default function LandingPage({ onStartQuiz }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-start bg-white text-center fade-in w-full pb-10 overflow-x-hidden min-h-screen">
      
      {/* 1. Badge de urgência no topo */}
      <div className="w-full bg-[#EA580C] text-white text-xs font-bold py-2.5 px-4 text-center leading-snug shadow-sm">
        ⚠️ Debido al alto volumen de accesos, esta oportunidad se ofrece GRATIS solo 1 vez por persona. Si sales, perderás tu turno.
      </div>

      <div className="w-full max-w-sm mx-auto px-5 mt-8">
        {/* 2. Imagem antes/depois */}
        <div className="relative w-full aspect-square max-h-[320px] rounded-2xl overflow-hidden shadow-2xl select-none mb-4 mx-auto">
          {/* Gradient placeholder */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple to-pink-400 flex">
            <div className="w-1/2 h-full border-r-[3px] border-white/80"></div>
            <div className="w-1/2 h-full"></div>
          </div>
          
          {/* Top Badge */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-black whitespace-nowrap shadow-lg border border-white/10">
            SIN | CON <span className="text-[#A78BFA]">Truco del Glúteo</span>
          </div>

          {/* Left Label */}
          <div className="absolute bottom-5 left-5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow border border-white/20 tracking-wider">
            ANTES
          </div>

          {/* Right Label */}
          <div className="absolute bottom-5 right-5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow border border-white/20 tracking-wider">
            DESPUÉS
          </div>
        </div>

        {/* Caption */}
        <p className="text-[13px] text-gray-600 italic font-medium mb-10 px-2 leading-relaxed">
          "Valentina conquistó el cuerpo de sus sueños en solo 4 semanas. <strong className="text-gray-900 border-b border-gray-900">SIN SENTADILLAS</strong>."
        </p>

        {/* 3. Bloco de urgência */}
        <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-2xl p-5 mb-8 shadow-sm">
          <p className="text-[#EA580C] text-[13px] font-bold mb-3 leading-snug">
            ⚠️ Atención, debido al alto volumen de accesos, esta oportunidad se ofrece gratuitamente solo 1 vez por persona.
          </p>
          <div className="bg-red-600 text-white text-sm font-black py-3 px-4 rounded-xl animate-pulse shadow-md tracking-wide">
            Si sales, perderás tu turno.
          </div>
        </div>

        {/* 4. Timer regressivo */}
        <div className="bg-[#DCFCE7] border border-[#86EFAC] rounded-2xl p-5 mb-8 shadow-sm">
          <p className="text-green-800 font-bold text-sm uppercase tracking-wide mb-1">
            Acceso liberado por los próximos:
          </p>
          <div className="text-[2.5rem] font-black text-[#15803D] leading-none py-2 drop-shadow-sm">
            <Timer initialSeconds={10 * 60} />
          </div>
        </div>

        {/* 5. Botão CTA */}
        <button 
          onClick={onStartQuiz}
          className="w-full bg-[#15803D] hover:bg-green-800 text-white font-black text-xl py-5 min-h-[48px] rounded-[1.25rem] shadow-[0_12px_24px_rgba(21,128,61,0.35)] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(21,128,61,0.45)] active:scale-[0.98] flex justify-center items-center border border-green-600"
        >
          <span>Obtener Truco del Glúteo Ahora</span>
          <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
      </div>
    </div>
  );
}

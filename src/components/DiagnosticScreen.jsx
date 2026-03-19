export default function DiagnosticScreen({ onContinue }) {
  return (
    <div className="w-full bg-white pb-10" style={{ animation: 'fadeIn 0.5s ease forwards' }}>
      <div className="max-w-md mx-auto px-5 pt-8 text-center">
        
        {/* Badge */}
        <div className="inline-block bg-purple-100 border border-purple-200 text-brand-purple font-extrabold px-5 py-2 rounded-full text-sm mb-6 shadow-sm tracking-wide">
          ✨ Diagnóstico completo ✨
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-100 rounded-full h-2.5 mb-8 overflow-hidden shadow-inner">
          <div className="bg-brand-violet h-2.5 rounded-full w-full"></div>
        </div>
        
        {/* Text */}
        <p className="text-gray-900 font-bold text-[16px] mb-8 leading-relaxed px-1">
          Analizamos tus respuestas e identificamos EXACTAMENTE lo que te impide tener piernas torneadas y glúteos levantados.
        </p>
        
        {/* 3 items */}
        <div className="bg-gray-50/80 rounded-2xl p-6 mb-10 text-left space-y-4 border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-4">
            <span className="text-2xl">🔍</span>
            <span className="font-bold text-gray-800 text-[15px]">3 patrones detectados</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-2xl">👎</span>
            <span className="font-bold text-gray-800 text-[15px]">1 mentira revelada</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-2xl">✅</span>
            <span className="font-bold text-[#15803D] text-[15px]">1 solución personalizada</span>
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-[26px] font-black text-[#15803D] mb-8 leading-tight px-2">
          🎥 ¡Mira el video abajo para desbloquear el Truco del Glúteo ahora!
        </h2>

        {/* Video Placeholder */}
        <div className="w-full aspect-video bg-gray-900 rounded-2xl shadow-xl flex flex-col items-center justify-center relative overflow-hidden mb-6 border-4 border-gray-800 cursor-pointer group">
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
          <svg className="w-20 h-20 text-white/90 drop-shadow-lg group-hover:scale-110 transition-transform z-10" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z" /></svg>
          <div className="absolute bottom-4 left-0 right-0 top-auto text-center z-10 w-full px-4">
             <span className="bg-black/80 backdrop-blur-sm text-white text-[11px] font-black tracking-widest px-3 py-1.5 rounded-lg shadow-sm block w-max mx-auto border border-white/10 uppercase">
               Vou te contar uma coisa que vai contra...
             </span>
          </div>
        </div>

        {/* Sub-headline */}
        <p className="text-[15px] text-gray-700 font-extrabold mb-8 leading-snug px-4">
          ⏳ Estás a 30 segundos de conquistar piernas y glúteos lindos <span className="text-red-500 border-b-2 border-red-200">SIN SENTADILLAS</span>
        </p>

        {/* CTA */}
        <button 
          onClick={onContinue}
          className="w-full bg-[#15803D] hover:bg-green-800 text-white font-black text-[22px] py-5 min-h-[48px] rounded-2xl shadow-[0_12px_24px_rgba(21,128,61,0.3)] transition-transform transform hover:-translate-y-1 active:scale-[0.98] tracking-wide"
        >
          Quiero mi Guía Ahora
        </button>
      </div>
    </div>
  );
}

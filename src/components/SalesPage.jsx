import { salesPageData } from '../data/salespage';
import { useState, useEffect } from 'react';

// Timer interno
function SalesTimer({ initialMinutes }) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  if (expired) {
    return <div className="text-red-600 font-black text-sm uppercase tracking-wide">¡Oferta expirada! Recargue para ver si aún está disponible</div>;
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-red-600 font-black text-[16px] flex items-center justify-center space-x-2">
      <span>Rescata tu descuento ahora: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
    </div>
  );
}

function FAQItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 bg-white">
      <button 
        className="flex justify-between items-center w-full py-5 text-left font-black text-brand-purple focus:outline-none min-h-[48px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="pr-4 text-[15px]">{item.q}</span>
        <svg className={`w-6 h-6 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-purple' : 'text-brand-violet'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
      </button>
      <div className={`transition-all duration-200 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="text-gray-700 text-[15px] leading-relaxed font-medium">
          {item.a}
        </div>
      </div>
    </div>
  );
}

export default function SalesPage() {
  const { anchor, price, installments } = salesPageData.pricing;
  
  // Enviroment variable
  const hotmartUrl = import.meta.env.VITE_HOTMART_URL || salesPageData.ctaUrl;

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 space-y-12" style={{ animation: 'fadeIn 0.5s ease forwards' }}>
      
      {/* Timer CTA */}
      <div className="bg-[#FEE2E2] rounded-xl p-4 text-center border-2 border-red-100 shadow-sm">
        <SalesTimer initialMinutes={salesPageData.timerMinutes} />
      </div>

      {/* Bloco de preço */}
      <div id="price-block" className="bg-white rounded-3xl p-6 shadow-xl border-4 border-[#15803D] relative overflow-hidden">
        <div className="flex justify-between items-end border-b-2 border-gray-100 pb-5 mb-5">
           <div className="text-[#15803D] font-black text-2xl tracking-tight">Precio</div>
           <div className="text-right">
             <p className="text-sm text-gray-500 font-bold mb-1">De <span className="line-through">{anchor}</span> por</p>
             <p className="text-[2.75rem] font-black text-[#15803D] tracking-tighter leading-none mb-1">{price}</p>
             <p className="text-[12px] text-gray-400 font-black uppercase tracking-widest">a la vista</p>
           </div>
        </div>
        
        <div className="flex justify-between items-start text-[10px] font-black text-gray-600 uppercase tracking-tight mb-8 px-1">
           <div className="flex items-center flex-col space-y-2"><span className="text-[22px]">🛡️</span><span className="text-center leading-tight">Compra<br/>Segura</span></div>
           <div className="flex items-center flex-col space-y-2"><span className="text-[22px]">🏆</span><span className="text-center leading-tight">Satisfacción<br/>Garantizada</span></div>
           <div className="flex items-center flex-col space-y-2"><span className="text-[22px]">🔒</span><span className="text-center leading-tight">Privacidad<br/>Protegida</span></div>
        </div>

        <a href={hotmartUrl} className="w-full bg-[#15803D] hover:bg-green-800 text-white font-black text-xl py-5 min-h-[48px] rounded-xl shadow-[0_10px_20px_rgba(21,128,61,0.3)] transition-transform transform hover:-translate-y-1 flex justify-center items-center active:scale-95">
          Quiero mi Guía Ahora
        </a>
      </div>

      {/* Bloco de entregáveis */}
      <div className="bg-[#7C3AED] rounded-[2rem] p-7 shadow-2xl text-white">
         <h2 className="text-2xl font-black mb-8 text-center tracking-wide">Lo que vas a recibir</h2>
         <div className="space-y-6">
           {salesPageData.deliverables.map((item, i) => (
             <div key={i} className="flex items-start space-x-4">
                <div className="text-green-400 text-2xl font-black mt-0.5" style={{ animation: `checkAppear 0.3s forwards ${i * 0.1}s`, opacity: 0 }}>✓</div>
                <div>
                  <span className="font-extrabold text-[16px] block mb-1">{item.name}:</span>
                  <span className="text-[14px] text-white/90 leading-relaxed font-medium block">{item.description}</span>
                </div>
             </div>
           ))}
         </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white rounded-[2rem] p-6 shadow-md border border-gray-100">
        <h2 className="text-2xl font-black text-gray-900 mb-4 text-center">Preguntas Frecuentes</h2>
        <div className="flex flex-col">
          {salesPageData.faq.map((item, i) => <FAQItem key={i} item={item} />)}
        </div>
      </div>

      {/* Bloco garantia */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 text-center relative mt-12">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 aspect-square bg-gradient-to-tr from-gray-100 to-white rounded-full border-[6px] border-white shadow-md flex items-center justify-center">
           <span className="text-4xl filter drop-shadow">🛡️</span>
        </div>
        <h2 className="text-[22px] font-black text-gray-900 mb-5 leading-tight mt-6">Riesgo CERO con nuestra Garantía Blindada</h2>
        <p className="text-[15px] text-gray-600 leading-relaxed mb-8 font-medium">
          {salesPageData.guarantee.text}
        </p>
        <a href={hotmartUrl} className="w-full block bg-[#15803D] hover:bg-green-800 text-white font-black text-lg py-5 min-h-[48px] rounded-2xl shadow-[0_10px_20px_rgba(21,128,61,0.25)] transition-transform active:scale-95">
          Quiero mi Guía por {price}
        </a>
      </div>

      {/* Order Bump */}
      <div className="bg-[#F8FAFC] rounded-2xl p-6 border-[3px] border-dashed border-[#15803D] relative shadow-sm">
        <div className="flex items-start justify-between">
            <div className="pr-5">
              <h4 className="font-black text-gray-900 text-[18px] leading-tight mb-2">
                {salesPageData.orderBumps[0].name}
              </h4>
              <p className="text-[#15803D] font-extrabold text-sm mb-3">
                {salesPageData.orderBumps[0].subtitle}
              </p>
              <p className="text-[14px] text-gray-600 mb-4 leading-relaxed font-medium">
                {salesPageData.orderBumps[0].description}
              </p>
              <div className="flex items-center space-x-2 mt-4">
                <span className="text-sm text-gray-400 line-through font-bold">{salesPageData.orderBumps[0].anchor}</span>
                <span className="text-xl font-black text-[#15803D]">{salesPageData.orderBumps[0].price}</span>
                <span className="bg-green-100 text-green-800 text-[11px] font-black px-2 py-1 rounded shadow-sm">-{salesPageData.orderBumps[0].discount}</span>
              </div>
            </div>
            
            <label className="flex flex-col items-center flex-shrink-0 mt-1 cursor-pointer group">
              <div className="w-8 h-8 rounded border-2 border-gray-300 group-hover:border-[#15803D] flex items-center justify-center transition-colors bg-white shadow-inner relative">
                 <input type="checkbox" className="opacity-0 absolute inset-0 w-full h-full cursor-pointer peer" />
                 <svg className="w-5 h-5 text-transparent peer-checked:text-[#15803D] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span className="text-[11px] font-black text-gray-500 uppercase mt-2 text-center leading-tight select-none">Agregar<br/>producto</span>
            </label>
        </div>
      </div>

      <div className="h-4"></div>
    </div>
  );
}

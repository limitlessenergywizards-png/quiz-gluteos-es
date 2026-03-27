import { useState, useEffect } from 'react';
import { salesPageData } from '../data/salespage';
import { trackEvent } from '../lib/tracking';
import { buildCheckoutUrl } from '../lib/checkout';

function FAQItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 text-left font-black text-[#9333EA] focus:outline-none min-h-[48px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="pr-4 text-[14px]">{item.q}</span>
        <svg className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
      </button>
      <div className={`transition-all duration-200 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <p className="text-gray-600 text-[13px] leading-relaxed">{item.a}</p>
      </div>
    </div>
  );
}

function SalesTimer({ initialMinutes }) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (timeLeft <= 0) {
    return <span className="text-red-600 font-black text-sm">¡Oferta expirada!</span>;
  }

  return (
    <span className="font-black text-[18px] text-red-600">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </span>
  );
}

export default function CheckoutPage() {
  const hotmartUrl = buildCheckoutUrl();

  useEffect(() => {
    window.scrollTo(0, 0);
    trackEvent('checkout_view');
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-[100dvh] bg-gradient-to-b from-white to-gray-50 w-full" style={{ animation: 'fadeIn 0.4s ease forwards' }}>
      <div className="max-w-md mx-auto px-5 pt-8 pb-10 text-center w-full">

        {/* Headline */}
        <h1 className="text-[24px] font-black text-gray-900 mb-3 leading-tight">
          ¡Tu plan personalizado está listo!
        </h1>

        {/* Subheadline */}
        <p className="text-[14px] text-gray-500 mb-6 leading-relaxed px-2">
          Con base en tus respuestas, identificamos que puedes <strong className="text-gray-800">conquistar piernas torneadas y glúteos levantados en 4 semanas</strong> — incluso con rodillas sensibles.
        </p>

        {/* Timer */}
        <div className="bg-red-50 rounded-xl py-3 px-4 mb-6 border border-red-200 inline-flex items-center gap-2">
          <span className="text-red-700 font-bold text-[13px]">⏰ Oferta expira en:</span>
          <SalesTimer initialMinutes={salesPageData.timerMinutes} />
        </div>

        {/* Bloco de preço */}
        <div className="bg-white rounded-2xl p-5 shadow-xl border-2 border-[#15803D] mb-6 relative overflow-hidden">
          {/* Discount badge */}
          <div className="absolute top-0 left-0 bg-red-500 text-white text-[11px] font-black px-3 py-1.5 rounded-br-xl">
            -87% OFF
          </div>

          <div className="flex items-center justify-between">
            {/* Lado esquerdo — preço antigo */}
            <div className="text-left">
              <p className="text-gray-400 text-[12px] font-bold">Precio normal</p>
              <p className="text-gray-400 text-[26px] font-black line-through leading-none">$97</p>
            </div>

            {/* Separador */}
            <div className="w-px h-14 bg-gray-200 mx-4"></div>

            {/* Lado direito — preço novo */}
            <div className="text-right">
              <p className="text-[#15803D] text-[12px] font-bold uppercase tracking-wide">Precio de hoy</p>
              <p className="text-[2.5rem] font-black text-[#15803D] tracking-tighter leading-none">US$ 12,90</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">USD · pago único</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <a
          href={hotmartUrl}
          onClick={() => trackEvent('cta_click', { location: 'checkout' })}
          className="w-full block bg-[#15803D] hover:bg-green-800 text-white font-black text-[18px] py-5 min-h-[56px] rounded-2xl shadow-[0_12px_24px_rgba(21,128,61,0.35)] transition-transform transform hover:-translate-y-1 active:scale-[0.98] animate-cta-pulse mb-8"
        >
          <span className="flex items-center justify-center gap-2">
            Quiero mi Guía Ahora por US$ 12,90
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
        </a>

        {/* Trust badges */}
        <div className="flex justify-center items-start gap-8 text-[10px] font-bold text-gray-500 uppercase tracking-tight mb-8">
          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-[18px]">🛡️</span>
            </div>
            <span className="text-center leading-tight">Compra<br/>Segura</span>
          </div>
          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-[18px]">🏆</span>
            </div>
            <span className="text-center leading-tight">Satisfacción<br/>Garantizada</span>
          </div>
          <div className="flex flex-col items-center space-y-1.5">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-[18px]">🔒</span>
            </div>
            <span className="text-center leading-tight">Privacidad<br/>Protegida</span>
          </div>
        </div>

        {/* Lo que vas a recibir */}
        <div className="bg-[#7C3AED] rounded-2xl p-6 shadow-xl text-white text-left mb-6">
          <h2 className="text-[18px] font-black text-center italic mb-5">Lo que vas a recibir</h2>
          <div className="space-y-4">
            {salesPageData.deliverables.map((item, i) => (
              <div key={i} className="flex items-start space-x-3">
                <span className="text-green-400 text-lg font-black mt-0.5 flex-shrink-0">✓</span>
                <p className="text-[13px] leading-snug">
                  <strong className="font-extrabold">{item.name}:</strong>{' '}
                  <span className="text-white/90 font-medium">{item.description}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA secundário */}
        <a
          href={hotmartUrl}
          onClick={() => trackEvent('cta_click', { location: 'checkout_bottom' })}
          className="w-full block bg-[#15803D] hover:bg-green-800 text-white font-black text-[17px] py-5 min-h-[56px] rounded-2xl shadow-[0_12px_24px_rgba(21,128,61,0.35)] transition-transform transform hover:-translate-y-1 active:scale-[0.98] animate-cta-pulse mb-6"
        >
          <span className="flex items-center justify-center gap-2">
            Quiero Iniciar mi Transformación
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
        </a>

        {/* Testimonial */}
        <div className="text-center mb-6">
          <h2 className="text-[20px] font-black text-gray-900 mb-5 leading-tight">
            Quien siguió el plan, tuvo resultados:
          </h2>

          {/* Before/After image */}
          <div className="w-full rounded-xl overflow-hidden shadow-lg mb-4">
            <img src="/images/checkout-1.webp" alt="Antes y Después" className="w-full h-auto" />
          </div>

          {/* Depoimentos */}
          <div className="space-y-3">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-left">
              <div className="flex items-center gap-3 mb-2">
                <img src="/images/depo-1.webp" alt="Mariana" className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <p className="text-yellow-500 text-[13px] leading-none mb-0.5">⭐⭐⭐⭐⭐</p>
                  <p className="text-gray-900 text-[14px] font-black">Mariana Torres</p>
                </div>
              </div>
              <p className="text-gray-600 text-[13px] leading-snug">
                ¡Por fin encontré algo que no destruye mis rodillas! En 3 semanas ya noté la diferencia. ¡Mis glúteos están más firmes que nunca!
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-left">
              <div className="flex items-center gap-3 mb-2">
                <img src="/images/depo-2.webp" alt="Ana Clara" className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <p className="text-yellow-500 text-[13px] leading-none mb-0.5">⭐⭐⭐⭐⭐</p>
                  <p className="text-gray-900 text-[14px] font-black">Ana Clara T.</p>
                </div>
              </div>
              <p className="text-gray-600 text-[13px] leading-snug">
                Sentía mucho dolor en las rodillas y había dejado de entrenar piernas. Esta guía salvó mi autoestima, ¡pero me trajo un problema: mis glúteos ya no caben en mis jeans anteriores! 😅
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 text-left">
              <div className="flex items-center gap-3 mb-2">
                <img src="/images/depo-3.webp" alt="Clara Martins" className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <p className="text-yellow-500 text-[13px] leading-none mb-0.5">⭐⭐⭐⭐⭐</p>
                  <p className="text-gray-900 text-[14px] font-black">Clara Martins</p>
                </div>
              </div>
              <p className="text-gray-600 text-[13px] leading-snug">
                Mi entrenador decía que sin pesas de gimnasio no había resultados. ¡Estaba equivocado! La guía quema muchísimo, las piernas se ponen duritas y mis glúteos están felices jajaja. Valió cada centavo.
              </p>
            </div>
          </div>

          {/* Before/After image 2 */}
          <div className="w-full rounded-xl overflow-hidden shadow-lg mt-4">
            <img src="/images/checkout-2.webp" alt="Antes y Después" className="w-full h-auto" />
          </div>
        </div>

        {/* CTA 3 */}
        <a
          href={hotmartUrl}
          onClick={() => trackEvent('cta_click', { location: 'checkout_testimonial' })}
          className="w-full block bg-[#15803D] hover:bg-green-800 text-white font-black text-[17px] py-5 min-h-[56px] rounded-2xl shadow-[0_12px_24px_rgba(21,128,61,0.35)] transition-transform transform hover:-translate-y-1 active:scale-[0.98] animate-cta-pulse mb-8"
        >
          <span className="flex items-center justify-center gap-2">
            Quiero mis Glúteos Levantados
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
        </a>

        {/* Antes de adquirir */}
        <div className="bg-red-50 rounded-2xl p-5 border border-red-200 mb-4 text-left">
          <h3 className="text-red-600 font-black text-[16px] text-center mb-4">Antes de adquirir</h3>
          <div className="space-y-3">
            {salesPageData.before.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-red-500 font-black text-[14px] mt-0.5 flex-shrink-0">✗</span>
                <p className="text-gray-700 text-[13px] font-medium leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Después de la Guía */}
        <div className="bg-green-50 rounded-2xl p-5 border border-green-200 mb-4 text-left">
          <h3 className="text-[#15803D] font-black text-[16px] text-center mb-4">Después de la Guía Piernas y Glúteos Sin Sentadillas</h3>
          <div className="space-y-3">
            {salesPageData.after.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#15803D] font-black text-[14px] mt-0.5 flex-shrink-0">✓</span>
                <p className="text-gray-700 text-[13px] font-medium leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Before/After image 3 */}
        <div className="w-full rounded-xl overflow-hidden shadow-lg mb-4">
          <img src="/images/checkout-3.webp" alt="Antes y Después" className="w-full h-auto" />
        </div>

        {/* CTA */}
        <a
          href={hotmartUrl}
          onClick={() => trackEvent('cta_click', { location: 'checkout_final' })}
          className="w-full block bg-[#15803D] hover:bg-green-800 text-white font-black text-[17px] py-5 min-h-[56px] rounded-2xl shadow-[0_12px_24px_rgba(21,128,61,0.35)] transition-transform transform hover:-translate-y-1 active:scale-[0.98] animate-cta-pulse mb-8"
        >
          <span className="flex items-center justify-center gap-2">
            Quiero Piernas Torneadas
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
        </a>

        {/* FAQ */}
        <h2 className="text-[#9333EA] font-black text-[18px] text-center mb-4 uppercase tracking-wide">Preguntas Frecuentes</h2>
        <div className="mb-8">
          {salesPageData.faq.map((item, i) => (
            <FAQItem key={i} item={item} />
          ))}
        </div>

        {/* Before/After image 4 */}
        <div className="w-full rounded-xl overflow-hidden shadow-lg mb-8">
          <img src="/images/checkout-4.webp" alt="Antes y Después" className="w-full h-auto" />
        </div>

        {/* Garantia */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center mb-6">
          <span className="text-4xl mb-3 block">🛡️</span>
          <h3 className="text-[18px] font-black text-gray-900 mb-3 leading-tight">Riesgo CERO con nuestra Garantía Blindada</h3>
          <p className="text-[13px] text-gray-600 leading-relaxed mb-5">
            {salesPageData.guarantee.text}
          </p>
          <a
            href={hotmartUrl}
            onClick={() => trackEvent('cta_click', { location: 'checkout_guarantee' })}
            className="w-full block bg-[#15803D] hover:bg-green-800 text-white font-black text-[16px] py-4 min-h-[48px] rounded-2xl shadow-[0_10px_20px_rgba(21,128,61,0.25)] transition-transform active:scale-[0.98] animate-cta-pulse"
          >
            Quiero mi Guía por US$ 12,90
          </a>
        </div>

      </div>
    </div>
  );
}

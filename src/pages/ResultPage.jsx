import { useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import DiagnosticScreen from '../components/DiagnosticScreen';
import SalesPage from '../components/SalesPage';
import { salesPageData } from '../data/salespage';

export default function ResultPage({ answers }) {
  const [stage, setStage] = useState('loading'); // 'loading' | 'content'
  const [showSticky, setShowSticky] = useState(false);
  const hotmartUrl = import.meta.env.VITE_HOTMART_URL || salesPageData.ctaUrl;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stage]);

  useEffect(() => {
    if (stage === 'content') {
      const handleScroll = () => {
        if (window.scrollY > 300) {
          setShowSticky(true);
        } else {
          setShowSticky(false);
        }
        
        const priceBlock = document.getElementById('price-block');
        if (priceBlock) {
          const rect = priceBlock.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          if (rect.top <= windowHeight && rect.bottom >= 0) {
            setShowSticky(false);
          }
        }
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [stage]);

  return (
    <div className={`flex-1 flex flex-col min-h-screen relative w-full ${stage === 'content' ? 'bg-gray-50 pb-28' : 'bg-brand-purpleLight/40'}`}>
      {stage === 'loading' && (
        <LoadingScreen onComplete={() => setStage('content')} />
      )}
      
      {stage === 'content' && (
        <div className="w-full flex flex-col bg-white">
          <DiagnosticScreen onContinue={() => {
             const priceBlock = document.getElementById('price-block');
             if(priceBlock) {
               priceBlock.scrollIntoView({ behavior: 'smooth' });
             }
          }} />
          
          <div className="w-full h-8 bg-gradient-to-b from-quiz-phase4 to-gray-50"></div>

          <div className="bg-gray-50 pb-8 flex-1 w-full">
            <SalesPage />
          </div>
          
          {/* Sticky CTA Bottom Bar using keyframe slideUp / display logic */}
          <div 
            className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] z-50 pointer-events-none"
            style={{ 
              opacity: showSticky ? 1 : 0,
              visibility: showSticky ? 'visible' : 'hidden',
              animation: showSticky ? 'slideUp 0.3s ease-out forwards' : 'slideDown 0.3s ease-out forwards'
            }}
          >
            <a 
              href={hotmartUrl} 
              className="w-full max-w-md mx-auto min-h-[48px] bg-[#15803D] hover:bg-green-800 text-white font-black text-lg py-4 rounded-xl shadow-[0_10px_20px_rgba(21,128,61,0.3)] flex justify-center items-center active:scale-[0.98] transition-transform pointer-events-auto"
            >
              <span>Quiero mis Glúteos Levantados → <span className="ml-1 opacity-90">{salesPageData.pricing.price}</span></span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

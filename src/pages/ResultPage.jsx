import { useEffect } from 'react';
import DiagnosticScreen from '../components/DiagnosticScreen';
import { trackEvent } from '../lib/tracking';

export default function ResultPage({ onGoToCheckout }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    trackEvent('result_view');
  }, []);

  return (
    <div className="flex-1 flex flex-col min-h-screen relative w-full bg-white">
      <DiagnosticScreen onContinue={onGoToCheckout} />
    </div>
  );
}

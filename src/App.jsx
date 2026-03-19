import React, { useState, Suspense } from 'react';
import LandingPage from './pages/LandingPage';
import QuizPage from './pages/QuizPage';

const ResultPage = React.lazy(() => import('./pages/ResultPage'));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-10 min-h-screen text-center bg-gray-50">
          <h2 className="text-xl font-bold text-red-600 mb-2">Algo salió mal</h2>
          <p className="text-gray-600 mb-4">Por favor recargue la página.</p>
          <button onClick={() => window.location.reload()} className="bg-brand-purple text-white px-6 py-2 rounded-xl font-bold">Recargar</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing'); // 'landing' | 'quiz' | 'result'
  const [globalAnswers, setGlobalAnswers] = useState({});

  const navigateTo = (screen) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  return (
    <ErrorBoundary>
      <div className="w-full h-full min-h-screen flex flex-col">
        {currentScreen === 'landing' && (
          <LandingPage onStartQuiz={() => navigateTo('quiz')} />
        )}
        
        {currentScreen === 'quiz' && (
          <QuizPage 
            onComplete={(finalAnswers) => {
              setGlobalAnswers(finalAnswers);
              navigateTo('result');
            }}
          />
        )}
        
        {currentScreen === 'result' && (
          <Suspense fallback={<div className="flex-1 flex flex-col justify-center items-center h-screen bg-brand-purpleLight text-brand-purpleDark font-bold text-xl"><div className="w-12 h-12 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mb-4"></div>Cargando resultados...</div>}>
            <ResultPage answers={globalAnswers} />
          </Suspense>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;

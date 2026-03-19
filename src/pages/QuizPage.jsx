import { useQuiz } from '../hooks/useQuiz';
import { questions } from '../data/questions';
import QuestionCard from '../components/QuestionCard';
import LoadingScreen from '../components/LoadingScreen';
import ProgressBar from '../components/ProgressBar';

export default function QuizPage({ onComplete }) {
  const { currentQuestion, showLoading, loadingData, answerQuestion, finishLoading } = useQuiz(onComplete);
  
  const qData = questions[currentQuestion];
  
  // smooth background mapping based on phase (1-6)
  const bgClasses = {
    1: 'bg-white',
    2: 'bg-purple-50',
    3: 'bg-violet-50',
    4: 'bg-purple-100',
    5: 'bg-violet-100',
    6: 'bg-purple-200',
  };
  
  const currentBgClass = qData ? bgClasses[qData.phase] || 'bg-white' : 'bg-white';

  return (
    <div className={`flex-1 flex flex-col items-center justify-start pt-6 px-5 pb-10 transition-colors duration-700 min-h-screen relative overflow-hidden w-full ${currentBgClass}`}>
      {showLoading && loadingData ? (
        <LoadingScreen data={loadingData} onComplete={finishLoading} />
      ) : (
        <>
          {qData && (
             <div className="w-full max-w-md mx-auto z-10 flex flex-col relative w-full h-full">
                <ProgressBar currentQuestion={currentQuestion} totalQuestions={questions.length} />
                <QuestionCard 
                  question={qData} 
                  questionIndex={currentQuestion}
                  onAnswer={(optionId) => answerQuestion(qData.id, optionId)} 
                />
             </div>
          )}
        </>
      )}
    </div>
  );
}

import { useState, useCallback } from 'react';
import { questions, loadingScreens } from '../data/questions';

export const useQuiz = (onCompleteMain) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showLoading, setShowLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(null);

  const answerQuestion = useCallback((questionId, optionId) => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);
    
    // Check if we just answered the last question
    if (currentQuestion >= questions.length - 1) {
      if (onCompleteMain) onCompleteMain(newAnswers);
      return;
    }

    const answeredCount = currentQuestion + 1;
    const loadingScreen = loadingScreens.find(ls => ls.afterQuestion === answeredCount);

    if (loadingScreen) {
      setLoadingData(loadingScreen);
      setShowLoading(true);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  }, [currentQuestion, answers, onCompleteMain]);

  const finishLoading = useCallback(() => {
    setShowLoading(false);
    setLoadingData(null);
    setCurrentQuestion(prev => prev + 1);
  }, []);

  return {
    currentQuestion,
    answers,
    showLoading,
    loadingData,
    answerQuestion,
    finishLoading
  };
};

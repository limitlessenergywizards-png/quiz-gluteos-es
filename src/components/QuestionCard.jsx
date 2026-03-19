import AnswerOption from './AnswerOption';
import { useState, useEffect } from 'react';

export default function QuestionCard({ question, onAnswer, questionIndex }) {
  const [selectedId, setSelectedId] = useState(null);
  const [animateKey, setAnimateKey] = useState(question?.id);

  useEffect(() => {
    setAnimateKey(question?.id);
    setSelectedId(null);
  }, [question?.id]);

  const handleSelect = (optionId) => {
    setSelectedId(optionId);
    setTimeout(() => {
      onAnswer(optionId);
    }, 150);
  };

  if (!question) return null;

  return (
    <div key={animateKey} className="w-full" style={{ animation: 'slideUp 0.3s ease forwards' }}>
      <h2 className="text-[20px] font-extrabold text-[#111827] mb-8 leading-snug text-center px-2">
        {question.question}
      </h2>
      
      <div className={question.layout === 'grid' ? "grid grid-cols-2 gap-3" : "flex flex-col"}>
        {question.options.map((option, idx) => (
          <AnswerOption 
            key={option.id} 
            option={option} 
            index={idx}
            style={question.optionStyle}
            isSelected={selectedId === option.id}
            onSelect={() => handleSelect(option.id)} 
          />
        ))}
      </div>
    </div>
  );
}

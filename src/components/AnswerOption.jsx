export default function AnswerOption({ option, onSelect, style, index, isSelected }) {
  const isMixedFirst = style === 'mixed' && index === 0;
  const hasEmoji = option.emoji && option.emoji.trim() !== '';
  
  // Base classes with dynamic borders and shadows
  // Minimum touch target 48px
  let baseClasses = "w-full min-h-[48px] px-4 py-3 rounded-[12px] mb-2 transition-colors duration-200 border-2 shadow-sm active:scale-[0.98]";
  
  if (hasEmoji) {
      baseClasses += " flex items-center justify-between text-left";
  } else {
      baseClasses += " flex items-center justify-center text-center";
  }

  // Flash state when clicking
  if (isSelected) {
     baseClasses += " ring-4 ring-purple-300 ring-opacity-50 scale-[0.98] brightness-90";
  }

  // Styles
  if (isMixedFirst) {
    baseClasses += " bg-[#15803D] border-[#15803D] text-white hover:bg-green-800";
  } else if (style === 'purple') {
    baseClasses += " bg-[#7C3AED] border-[#7C3AED] text-white hover:bg-[#6B21A8]";
  } else {
    baseClasses += " bg-white border-gray-200 text-gray-800 hover:border-[#7C3AED] hover:shadow-md";
  }

  return (
    <button 
      onClick={onSelect} 
      className={baseClasses}
      style={{ animation: `fadeIn 0.3s ease forwards ${index * 0.05}s`, opacity: 0 }}
    >
      {hasEmoji ? (
        <>
          <div className="flex items-center space-x-3 w-full pr-2">
            <span className="text-xl flex-shrink-0">{option.emoji}</span>
            <span className={`text-[15px] font-semibold flex-1 leading-tight ${style === 'white' && !isMixedFirst ? 'text-gray-700' : 'text-white'}`}>
              {option.text}
            </span>
          </div>
          <svg className={`w-5 h-5 flex-shrink-0 ${style === 'white' && !isMixedFirst ? 'text-gray-400' : 'text-white/60'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
        </>
      ) : (
        <span className={`text-[15px] font-bold w-full mx-auto block ${style === 'white' && !isMixedFirst ? 'text-gray-800' : 'text-white'}`}>
          {option.text}
        </span>
      )}
    </button>
  );
}

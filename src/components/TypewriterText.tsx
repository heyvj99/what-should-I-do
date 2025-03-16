import React, { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export function TypewriterText({ text, delay = 1000, className = '' }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFading, setIsFading] = useState(true);

  useEffect(() => {
    let timeout: number;
    let currentIndex = 0;

    const startTyping = () => {
      setIsTyping(true);
      setIsFading(false);
      
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeout = window.setTimeout(typeNextChar, 60); // Consistent 60ms typing speed
        } else {
          setIsTyping(false);
        }
      };

      timeout = window.setTimeout(typeNextChar, delay);
    };

    setDisplayText('');
    setIsFading(true);
    startTyping();

    return () => {
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return (
    <div 
      className={`
        font-mono text-xl ${className} min-h-[4rem]
        transition-opacity duration-300
        ${isFading ? 'opacity-0' : 'opacity-100'}
      `}
    >
      {displayText}
      {isTyping && (
        <span 
          className="inline-block w-2 h-4 ml-1 bg-gray-800 animate-blink" 
          aria-hidden="true"
        />
      )}
    </div>
  );
}
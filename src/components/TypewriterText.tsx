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

      // Same implementation with setInterval. Important to remember that the function to run in 
      //intervals in the callfact given to set interval itself
      // const typeNextChar = () => {
      //   let interval = setInterval(() => {
      //     if (currentIndex < text.length) {
      //       setDisplayText((prev) => prev + text[currentIndex]); // Append next character
      //       currentIndex++;
      //     } else {
      //       clearInterval(interval); // Stop interval when typing is complete
      //       setIsTyping(false);
      //     }
      //   }, 60);
      // };


      // above you have defined what typeNextCharacter does but you have not called it yet.
      // You call it for the first time in the following line and the purpose of delay is 
      // the time between clicking refresh and starting to type
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
        font-mono text-xl ${className} min-h-[15rem] sm:min-h-[10rem] md:min-h-[8rem] lg:min-h-[5rem]
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
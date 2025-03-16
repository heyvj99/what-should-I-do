import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { activities } from './activities';
import { TypewriterText } from './components/TypewriterText';

function App() {
  const [currentActivity, setCurrentActivity] = useState<string | null>(null);
  const [lastActivity, setLastActivity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const getRandomActivity = () => {
    setIsLoading(true);
    
    // Filter out the last activity to avoid repetition
    const availableActivities = activities.filter(activity => activity !== lastActivity);
    const randomIndex = Math.floor(Math.random() * availableActivities.length);
    const newActivity = availableActivities[randomIndex];
    
    setLastActivity(currentActivity);
    setCurrentActivity(newActivity);
    setHasInteracted(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-[600px] w-full bg-white rounded-xl shadow-lg p-8 space-y-8">
        <h1 className="text-3xl font-mono text-center font-bold text-gray-800">
          Boredom Buster
        </h1>
        
        <div className="flex justify-center">
          <button
            onClick={getRandomActivity}
            disabled={isLoading}
            className={`
              relative group transition-all duration-300 ease-in-out
              ${hasInteracted 
                ? 'w-14 h-14 rounded-full bg-gray-800 hover:bg-gray-700 hover:rotate-180' 
                : 'bg-gray-800 hover:bg-gray-700 text-white font-mono py-3 px-6 rounded-lg'
              }
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
            `}
            aria-label={isLoading ? "Loading new activity" : "Get new activity"}
          >
            {!hasInteracted && (
              <span className={`flex items-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                What Should I Do?
              </span>
            )}
            <RefreshCw 
              className={`
                h-5 w-5 text-white
                ${hasInteracted ? 'block' : 'hidden'}
                ${isLoading ? '' : ''}
                ${!hasInteracted ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : 'mx-auto'}
              `}
            />
          </button>
        </div>

        {currentActivity && (
          <div className="bg-gray-50 rounded-lg p-6 transition-all duration-300">
            <TypewriterText 
              text={currentActivity}
              className="text-start text-gray-800"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
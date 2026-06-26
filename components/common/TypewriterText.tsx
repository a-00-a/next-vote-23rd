'use client';

import { useState, useEffect } from 'react';

export default function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 80);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary min-h-12 md:min-h-16 flex items-center">
      {displayedText}
      <span className="animate-pulse ml-1">|</span>
    </h2>
  );
}
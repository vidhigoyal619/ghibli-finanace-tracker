
import React from 'react';

const CloudBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="animate-float-clouds absolute top-10 opacity-70">
        <svg width="200" height="120" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 80 C20 80, 0 60, 20 40 C20 20, 50 20, 60 40 C70 20, 100 20, 110 40 C140 20, 180 40, 160 80 C180 100, 140 120, 120 100 C110 120, 70 120, 60 100 C40 120, 10 100, 40 80 Z" fill="#FFF" fillOpacity="0.8" />
        </svg>
      </div>
      <div className="animate-float-clouds absolute top-20 left-1/3 opacity-60" style={{ animationDelay: '-20s' }}>
        <svg width="150" height="90" viewBox="0 0 150 90" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 60 C15 60, 0 45, 15 30 C15 15, 37.5 15, 45 30 C52.5 15, 75 15, 82.5 30 C105 15, 135 30, 120 60 C135 75, 105 90, 90 75 C82.5 90, 52.5 90, 45 75 C30 90, 7.5 75, 30 60 Z" fill="#FFF" fillOpacity="0.8" />
        </svg>
      </div>
      <div className="animate-float-clouds absolute top-40 left-2/3 opacity-80" style={{ animationDelay: '-50s' }}>
        <svg width="180" height="100" viewBox="0 0 180 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M36 70 C18 70, 0 52.5, 18 35 C18 17.5, 45 17.5, 54 35 C63 17.5, 90 17.5, 99 35 C126 17.5, 162 35, 144 70 C162 87.5, 126 105, 108 87.5 C99 105, 63 105, 54 87.5 C36 105, 9 87.5, 36 70 Z" fill="#FFF" fillOpacity="0.8" />
        </svg>
      </div>
    </div>
  );
};

export default CloudBackground;

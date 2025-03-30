
import React from 'react';
import Firefly from './Firefly';

const FireflyContainer: React.FC = () => {
  // Create an array of 15 elements to render 15 fireflies
  const fireflies = Array.from({ length: 25 }, (_, i) => <Firefly key={i} />);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {fireflies}
    </div>
  );
};

export default FireflyContainer;

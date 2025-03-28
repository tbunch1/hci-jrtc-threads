import React from 'react';

const Main: React.FC = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
    <img 
        src="/images/man.png" 
        alt="Random Image" 
        className="h-4/5 object-contain"
     />
    </div>
  );
}

export default Main;
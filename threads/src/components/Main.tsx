import React from 'react';
import { useGlobalState } from './GlobalProvider';

const Main: React.FC = () => {
  const {shirt, pants, setShirt, setPants} = useGlobalState();
  return (

    <div className="relative w-screen h-screen flex justify-center items-center">
      <div className="absolute w-60 h-60">
        <img 
          src="/images/man.png" 
          alt="Random Image" 
          className="h-4/5 object-contain"
        />
        {shirt.length > 0 && (
          <img 
            src={shirt}
            //will update to use shirt fields/json
            className="absolute top-5 left-5"
          />
        )}
      </div>

    </div>
  );
}

export default Main;
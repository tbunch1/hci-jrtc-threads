import React from 'react';
import { useGlobalState } from './GlobalProvider';
import { shirtopts, pantsopts, designopts } from "./ClothesOptions";

const Main: React.FC = () => {
  const {shirt, pants, design, setShirt, setPants, setDesign} = useGlobalState();
  return (

    <div className="relative w-screen h-screen flex justify-center items-center">
        <img 
          src={`${process.env.PUBLIC_URL}/images/mannequin.png`} 
          alt="an androgynous mannequin" 
          className="absolute "
        />
        {pants >= 0 && (
          <img 
            src={pantsopts[pants % 4].src}
            alt={pantsopts[pants % 4].alt}
            className={pantsopts[pants % 4].class}
          />
        )}
        {shirt >= 0 && (
          <img 
            src={shirtopts[shirt % 4].src}
            alt={shirtopts[shirt % 4].alt}
            className={shirtopts[shirt % 4].class}
          />
        )}
        {design >=0 && (
        <img 
          src={designopts[design % 4].src}
          alt={designopts[design % 4].alt}
          className={designopts[design % 4].class}
        />         
        )}


    </div>
  );
}

export default Main;
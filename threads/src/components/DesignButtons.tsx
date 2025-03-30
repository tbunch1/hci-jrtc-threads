import React from "react";
import { useGlobalState } from './GlobalProvider';


const DesignButtons: React.FC = () => {
    const {shirt, pants, design, setShirt, setPants, setDesign} = useGlobalState();

    const changeShirt = () => {
        if (shirt >= 0) {
            setShirt(-1);
        } else {
            setShirt(1)
        }
    }


    return (
        <div >
            <button onClick={changeShirt}>
                shirt
            </button>
          
        </div>
    );
}

 // <input type="image"  id="saveform" src="logg.png " alt="Submit Form" />
export default DesignButtons;
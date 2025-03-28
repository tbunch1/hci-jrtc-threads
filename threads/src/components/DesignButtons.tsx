import React from "react";
import { useGlobalState } from './GlobalProvider';


const DesignButtons: React.FC = () => {
    const {shirt, pants, setShirt, setPants} = useGlobalState();

    const changeShirt = () => {
        if (shirt.length > 0) {
            setShirt("");
        } else {
            setShirt("/images/shirt.png")
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
import React, { useState } from "react";
import { useGlobalState } from './GlobalProvider';
import '../styles/DesignButtons.css';
import { shirtopts, pantsopts, designopts, ClothesItem} from "./ClothesOptions";
import  PreviewPanel from "./PreviewPanel"


const DesignButtons: React.FC = () => {
    const {shirt, pants, design, setShirt, setPants, setDesign} = useGlobalState();
    const [selected, setSelected] = useState<number>(-1);



    return (
        <div>
            <div className="designPanel">
                <button className="designButton">
                    <img src={`${process.env.PUBLIC_URL}/images/icon-shirt.png`}  alt="the outline of a shirt" onClick={() => setSelected(0)}/>
                </button>
                <button className="designButton">
                    <img src={`${process.env.PUBLIC_URL}/images/icon-pants.png`} alt="the outline of a shirt" onClick={() => setSelected(1)}/>
                </button>
                <button className="designButton">
                    <img src={`${process.env.PUBLIC_URL}/images/icon-design.png`} alt="the outline of a shirt" onClick={() => setSelected(2)}/>
                </button>
            </div>
            { selected >= 0 && (
                <PreviewPanel  idx={selected} setSelected={setSelected} />
            )}
        </div>
    );
}

 // <input type="image"  id="saveform" src="logg.png " alt="Submit Form" />
export default DesignButtons;
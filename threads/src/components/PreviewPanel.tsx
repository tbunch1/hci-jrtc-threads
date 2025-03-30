import React, { useState } from "react";
import { useGlobalState } from './GlobalProvider';
import '../styles/DesignButtons.css';
import { shirtopts, pantsopts, designopts, ClothesItem} from "./ClothesOptions";


interface previewProps {
    idx: number;
    setSelected: (arg0: number) => void;
}


const PreviewPanel: React.FC<previewProps> = ({ idx, setSelected }) => {
    const {shirt, pants, design, setShirt, setPants, setDesign} = useGlobalState();

    let setFunc: (des: number) => void;
    let options: ClothesItem[];
    let offset: number;

    if (idx == 0) {
        setFunc = setShirt;
        options = shirtopts;
        offset = 0;
    } else if (idx == 1) {
        setFunc = setPants;
        options = pantsopts;
        offset = 4;
    } else if (idx = 2) {
        setFunc = setDesign;
        options = designopts;
        offset = 8;
    } else {
        return (
            <div />
        );
    }
    
    return (
    <div className="specificPanel">
        <button className="closeButton" onClick={() => setSelected(-1)}>
            x
        </button>
        
        <div>
            <button className="previewButton" onClick={() => setFunc(0 + offset)}>
                <img src={options[0].src} alt={options[0].alt} className="previewPhoto" />
            </button>
            <button className="previewButton" onClick={() => setFunc(1 + offset)} >
                <img src={options[1].src} alt={options[1].alt} className="previewPhoto" />
            </button>
        </div>
        <div>
            <button className="previewButton" onClick={() => setFunc(2 + offset)}>
                <img src={options[2].src} alt={options[2].alt} className="previewPhoto" />
            </button>
            <button className="previewButton" onClick={() => setFunc(3 + offset)} >
                <img src={options[3].src} alt={options[3].alt} className="previewPhoto" />
            </button>
        </div>
    </div>
    )
}

export default PreviewPanel
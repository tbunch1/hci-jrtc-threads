import React from 'react';
import { useGlobalState } from './GlobalProvider';
import { shirtopts, pantsopts, designopts } from "./ClothesOptions";
import { Node } from './Tree';
import '../styles/Merge.css';


interface ClothesProps {
    node1: Node | null;
    node2: Node | null;

}


const MergeClothes: React.FC<ClothesProps> = ({ node1, node2 }) => {
    return (

        <div className="flex justify-center items-center h-screen">
            <div className="flex justify-between w-1/2">
                <div className="w-1/3 flex flex-col items-center">
                    <img
                        src={`${process.env.PUBLIC_URL}/images/mannequin.png`}
                        alt="an androgynous mannequin"
                        className="absolute transform translate-y-[-350px] "
                    />
                    {node1 && node1.design[1] >= 0 && (

                        <img
                            src={pantsopts[node1.design[1] % 4].src}
                            alt={pantsopts[node1.design[1] % 4].alt}
                            className={pantsopts[node1.design[1] % 4].mergeClass}
                        />
                    )}
                    {node1 && node1.design[0] >= 0 && (
                        <img
                            src={shirtopts[node1.design[0] % 4].src}
                            alt={shirtopts[node1.design[0] % 4].alt}
                            className={shirtopts[node1.design[0] % 4].mergeClass}
                        />
                    )}
                    {node1 && node1.design[2] >= 0 && (
                        <img
                            src={designopts[node1.design[2] % 4].src}
                            alt={designopts[node1.design[2] % 4].alt}
                            className={designopts[node1.design[2] % 4].mergeClass}
                        />
                    )}
                </div>

                <div className="w-1/3 flex flex-col items-center">

                    <img
                        src={`${process.env.PUBLIC_URL}/images/mannequin.png`}
                        alt="an androgynous mannequin"
                        className="absolute transform translate-y-[-350px]"
                    />
                    {node2 && node2.design[1] >= 0 && (

                        <img
                            src={pantsopts[node2.design[1] % 4].src}
                            alt={pantsopts[node2.design[1] % 4].alt}
                            className={pantsopts[node2.design[1] % 4].mergeClass}
                        />
                    )}
                    {node2 && node2.design[0] >= 0 && (
                        <img
                            src={shirtopts[node2.design[0] % 4].src}
                            alt={shirtopts[node2.design[0] % 4].alt}
                            className={shirtopts[node2.design[0] % 4].mergeClass}
                        />
                    )}
                    {node2 && node2.design[2] >= 0 && (
                        <img
                            src={designopts[node2.design[2] % 4].src}
                            alt={designopts[node2.design[2] % 4].alt}
                            className={designopts[node2.design[2] % 4].mergeClass}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default MergeClothes;
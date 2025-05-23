import React from 'react';

export type ClothesItem = {
    src: string;
    id: number;
    alt: string;
    class: string;
    mergeClass: string;
}

export const shirtopts: ClothesItem[] = [
    {   
        src: `${process.env.PUBLIC_URL}/images/yellow-crop-tee.png`, 
        id: 0, 
        alt: "a yellow crop top tee", 
        class: "absolute transform translate-y-[-189px]",
        mergeClass: "absolute transform translate-y-[-220px]",
    },
    {
        src: `${process.env.PUBLIC_URL}/images/gray-tee.png`, 
        id: 1, 
        alt: "a gray tee shirt", 
        class: "absolute transform translate-y-[-160px]",
        mergeClass: "absolute transform translate-y-[-225px]",
    },
    {
        src: `${process.env.PUBLIC_URL}/images/white-long-sleeve.png`, 
        id: 2, 
        alt: "a white long sleeve shirt", 
        class: "absolute transform translate-x-[-1px] translate-y-[-136px]",
        mergeClass: "absolute transform translate-y-[-226px]",
    },
    {
        src: `${process.env.PUBLIC_URL}/images/green-tank.png`, 
        id: 3, 
        alt: "a green tank top", 
        class: "absolute transform translate-y-[-145px]",
        mergeClass: "absolute transform translate-y-[-195px]",
    },
]

export const pantsopts: ClothesItem[] = [
    {
        src: `${process.env.PUBLIC_URL}/images/black-shorts.png`, 
        id: 4, 
        alt: "black shorts", 
        class: "absolute transform translate-y-[30px]",
        mergeClass: "absolute transform translate-y-[-5px]",
    },
    {
        src: `${process.env.PUBLIC_URL}/images/blue-skirt.png`, 
        id: 5, 
        alt: "a blue skirt", 
        class: "absolute transform translate-x-[-2px] translate-y-[30px]",
        mergeClass: "absolute transform translate-y-[-10px]",
    },
    {
        src: `${process.env.PUBLIC_URL}/images/white-pants.png`, 
        id: 6, alt: "white pants", 
        class: "absolute transform translate-x-[-5px] translate-y-[120px]",
        mergeClass: "absolute transform translate-x-[-5px] translate-y-[-15px]",
    },
    {
        src: `${process.env.PUBLIC_URL}/images/gray-pants.png`, 
        id: 7, 
        alt: "gray pants", 
        class: "absolute transform translate-x-[-5px] translate-y-[120px]",
        mergeClass: "absolute transform translate-y-[-5px]",
    },
]

export const designopts: ClothesItem[] = [
    {
        src: `${process.env.PUBLIC_URL}/images/star.png`, 
        id: 8, alt: "a red star", 
        class: "absolute transform translate-y-[-160px]",
        mergeClass: "absolute transform translate-y-[-145px]",
    },
    {
        src: `${process.env.PUBLIC_URL}/images/diamond.png`, 
        id: 9, 
        alt: "a pale blue diamond, with white stars around it", 
        class: "absolute transform translate-x-[3px] translate-y-[-160px]", 
        mergeClass: "absolute transform translate-y-[-145px]",
    },
    {
        src: `${process.env.PUBLIC_URL}/images/smile.png`, 
        id: 10, 
        alt: "a yellow smiley face", 
        class: "absolute transform translate-y-[-165px]",
        mergeClass: "absolute transform translate-y-[-150px]",
    },
    {
        src: `${process.env.PUBLIC_URL}/images/frown.png`, 
        id: 11, 
        alt: "a frown using a colon and slash", 
        class: "absolute transform translate-y-[-160px]",
        mergeClass: "absolute transform translate-y-[-140px]",
    },
]

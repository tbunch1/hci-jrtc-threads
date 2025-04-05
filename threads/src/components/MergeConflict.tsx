import React, { useState } from 'react';
import '../styles/Merge.css';
import { Node } from './Tree';

interface MergeConflictProps {
  totalConflicts: number;
  conflicts: number[] | null;
  node1: Node | null;
  node2: Node | null;
  newClothesOpts: number[];
  createMergedNode: (node1: Node, node2: Node, newClothesOpts: number[]) => void;
}

const MergeConflict: React.FC<MergeConflictProps> = ({ 
  totalConflicts, 
  conflicts, 
  node1, 
  node2, 
  newClothesOpts,
  createMergedNode
}) => {
  const [curConflict, setCurConflict] = useState(0);
  const [conflictsResolved, setConflictsResolved] = useState(0);
  const [choices, setChoices] = useState(new Array(conflicts?.length).fill(-1));

  const handleLeftArrowClick = () => {
    if (curConflict - 1 >= 0) {
      setCurConflict(prev => prev - 1);
    }
  }

  const handleRightArrowClick = () => {
    if (conflicts && curConflict + 1 < conflicts.length) {
      setCurConflict(prev => prev + 1);
    }
  }

  const handleConfirmClick = () => {
    if (node1 && node2) {
      createMergedNode(node1, node2, newClothesOpts);
    }
  }

  const handleBoxClick = (design: number) => {
    if (conflicts && node1 && node2) {
      let slot = conflicts[curConflict];
      if (design === 1) {
        newClothesOpts[slot] = node1.design[slot];
      } else {
        newClothesOpts[slot] = node2.design[slot];
      }
    }

    if (choices[curConflict] === -1) {
      setConflictsResolved(prev => prev + 1);
    }
    
    setChoices(prevChoices => {
      const updatedChoices = [...prevChoices];
      updatedChoices[curConflict] = design;
      return updatedChoices;
    });
  }

  const getBoxStyle = (design: number):React.CSSProperties => {
    let style: React.CSSProperties = {
      border: '2px dashed #000000',
      borderRadius: '16px',
    };
    
    if (conflicts) {
      switch (conflicts[curConflict]) {
        case 0: // shirt conflict
          style = {
            ...style,
            width: '200px',
            height: '250px',
            marginLeft: '15%',
            marginRight: '15%'
          };
          break;
        case 1: // pants conflict
          style = {
            ...style,
            width: '200px',
            height: '300px',
            marginRight: '15%'
          };
          break;
        case 2: // design conflict
          style = {
            ...style,
            width: '100px',
            height: '100px',
            marginRight: '15%'
          };
          break;
      }
    }

    if (choices[curConflict] === design) {
      style = {
        ...style,
        backgroundColor: 'rgba(195, 255, 157, 0.25)'
      };
    } else {
      style = {
        ...style,
        backgroundColor: 'rgba(208, 208, 208, 0.25)'
      };
    }

    return style;
  }

  return (
    <div>
      <p className="mergePopup">Merge Conflict</p>

      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height:'100%'}}>
        <button style={getBoxStyle(1)} onClick={() => handleBoxClick(1)}></button>
        <button style={getBoxStyle(2)} onClick={() => handleBoxClick(2)}></button>
      </div>

      <div>
        <div className="mergeConflictInstr">
          <p>Select one of the boxed options to keep in the merged design</p>
          <div className="conflictButtons">
            <button onClick={handleLeftArrowClick}>{`<`}</button>
            <p>{`${curConflict + 1}/${totalConflicts}`}</p>
            <button onClick={handleRightArrowClick}>{`>`}</button>
          </div>
        </div>
        {conflictsResolved < totalConflicts && <p className="selectStatus">{`${conflictsResolved}/${totalConflicts} conflict(s) resolved`}</p>}
        {conflictsResolved >= totalConflicts && <button className="confirmButton" onClick={handleConfirmClick}>Confirm</button>}
      </div>
    </div>
  );
};

export default MergeConflict;

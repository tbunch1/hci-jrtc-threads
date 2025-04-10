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

  const getTextStyle = ():React.CSSProperties => {
    let tstyle: React.CSSProperties = {
      backgroundColor: "#ffffff",
      padding: "5px 10px",
      borderRadius: '12px',
      width: "250px",
      position: 'fixed',
      bottom: '90px',
      left: '50%',
      zIndex: '10',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transform: "translateX(-50%)",
    }
    if (conflicts) {
      switch (conflicts[curConflict]) {
        case 0: // shirt conflict
          tstyle = {
            ...tstyle,
            transform: "translateX(-50%) translateY(-350px)"
          };
          break;
        case 1:// pants conflict
          tstyle = {
            ...tstyle,
            transform: "translateX(-50%) translateY(-100px)"
          };
          break;
        case 2: //design
          tstyle = {
            ...tstyle,
            transform: "translateX(-50%) translateY(-390px)"
          };
          break;
        }
      }

    return tstyle
  }

  const getBoxStyle = (design: number):React.CSSProperties => {
    let style: React.CSSProperties = {
      border: '2px dashed #000000',
      borderRadius: '16px',
      zIndex: '10',
    };
    
    if (conflicts) {
      switch (conflicts[curConflict]) {
        case 0: // shirt conflict
          style = {
            ...style,
            width: '250px',
            height: '300px',
            marginLeft: '9%',
            marginRight: '9%',
            transform: 'translateY(-225%)',
          };
          break;
        case 1: // pants conflict
          style = {
            ...style,
            width: '200px',
            height: '400px',
            marginLeft: '11%',
            marginRight: '11%',
            transform: 'translateY(-120%)',
          };
          break;
        case 2: // design conflict
          style = {
            ...style,
            width: '100px',
            height: '100px',
            marginLeft: '13.5%',
            marginRight: '13.5%',
            transform: 'translateY(-610%)',
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

      <div style={{display: 'flex', justifyContent: 'center'}}>
        <button style={getBoxStyle(1)} onClick={() => handleBoxClick(1)}></button>
        <button style={getBoxStyle(2)} onClick={() => handleBoxClick(2)}></button>
      </div>

      <div>
        <div style={getTextStyle() }
        >
          <p>Select one of the boxed options to keep in the merged design</p>
          <div className="conflictButtons">
            <button className = "changeConflictButtons" onClick={handleLeftArrowClick}>{`<`}</button>
            <p className="designSpacer">{`${curConflict + 1}/${totalConflicts}`}</p>
            <button className = "changeConflictButtons" onClick={handleRightArrowClick}>{`>`}</button>
          </div>
        </div>
        {conflictsResolved < totalConflicts && <p className="selectStatus">{`${conflictsResolved}/${totalConflicts} conflict(s) resolved`}</p>}
        {conflictsResolved >= totalConflicts && <button className="confirmConflictButton" onClick={handleConfirmClick}>Confirm</button>}
      </div>
    </div>
  );
};

export default MergeConflict;

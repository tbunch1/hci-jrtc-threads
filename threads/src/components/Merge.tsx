import React, { useState, useEffect } from 'react';
import '../styles/Merge.css';
import { Node } from './Tree';
import MergeConflict from './MergeConflict';
import { click } from '@testing-library/user-event/dist/click';

interface MergeProps {
  onClose: () => void;
  clickedNode: Node | null;
  clickedNode2: Node | null;
  addChild: (parentNode: Node, childName: string, design?: number[]) => Node;
  handleNodeClick: (node:Node) => void;
}

const Merge: React.FC<MergeProps> = ({ onClose, clickedNode, clickedNode2, addChild, handleNodeClick }) => {
  const [isMergeConflictMode, setIsMergeConflictMode] = useState(false);
  const [twoNodesSelected, setTwoNodesSelected] = useState(false);
  const [numNodesSelected, setNumNodesSelected] = useState(1);

  useEffect(() => {
    if (clickedNode && clickedNode2) {
      setTwoNodesSelected(true);
      setNumNodesSelected(2);
    } else {
      setTwoNodesSelected(false);
      setNumNodesSelected(1);
    }
  }, [clickedNode, clickedNode2]);

  const handleConfirmClick = () => {
    if (clickedNode && clickedNode2) {
      const designOpt1 = clickedNode.design;
      const designOpt2 = clickedNode2.design;
      console.log(`designOpt1: ${designOpt1}`)
      console.log(`designOpt2: ${designOpt2}`)
      let newClothesOpts = new Array(designOpt1.length);
      let slotConflicts = new Array(designOpt1.length).fill(0);
      let isMergeConflict = false;

      for (let i = 0; i < designOpt1.length; i++) {
        let opt1 = designOpt1[i];
        let opt2 = designOpt2[i];
        if (opt1 === opt2 || opt2 === -1) {
          newClothesOpts[i] = opt1;
        } else if (opt1 === -1) {
          newClothesOpts[i] = opt2;
        } else {
          slotConflicts[i] = 1;
          isMergeConflict = true;
        }
      }

      if (isMergeConflict) {
        setIsMergeConflictMode(true);
      } else {
        const parent = clickedNode.id > clickedNode2.id ? clickedNode : clickedNode2;
        const mergeName = prompt("Enter merged design node name:");
        console.log(`newClothesOpts: ${newClothesOpts}`)
        if (mergeName) {
          const mergedDesign = addChild(parent, mergeName, newClothesOpts);
          handleNodeClick(mergedDesign);
        }
        onClose();
      }
    }
    
  };

  return (
    <div>
      {!isMergeConflictMode && (
        <div>
          <p className="mergePopup">Merge</p>
          <p className="mergeInstr">Select two design nodes to merge</p>
          <button className="cancelButton" onClick={onClose}>Cancel</button>
          {!twoNodesSelected && <p className="selectStatus">{`${numNodesSelected}/2 nodes selected`}</p>}
          {twoNodesSelected && (
            <button className="confirmButton" onClick={handleConfirmClick}>Confirm</button>
          )}
        </div>
      )};
      
      
      {isMergeConflictMode && (
        <div>
          <MergeConflict />
          <button className="cancelButton" onClick={onClose}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Merge;
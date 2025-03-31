import React, { useState, useEffect } from 'react';
import '../styles/Merge.css';
import { Node } from './Tree';
import { click } from '@testing-library/user-event/dist/click';

interface MergeProps {
  onClose: () => void;
  clickedNode: Node | null;
  clickedNode2: Node | null;
  addChild: (parentNode: Node, childName: string) => void;
}

const Merge: React.FC<MergeProps> = ({ onClose, clickedNode, clickedNode2, addChild }) => {
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
      // compare nodes' clothes options
      let newClothesOpts = [];
      let slotConflicts = [];

      if (slotConflicts.length !== 0) {
        setIsMergeConflictMode(true);
      } else {
        const parent = clickedNode.id > clickedNode2.id ? clickedNode : clickedNode2;
        const mergeName = prompt("Enter merged design node name:");
        if (mergeName) addChild(parent, mergeName);
        onClose();
      }
    }
    
  };

  return (
    <div>
      <p className="mergePopup">Merge</p>
      <p className="mergeInstr">Select two design nodes to merge</p>
      <button className="cancelButton" onClick={onClose}>Cancel</button>
      {!twoNodesSelected && <p className="selectStatus">{`${numNodesSelected}/2 nodes selected`}</p>}
      {twoNodesSelected && (
        <button className="confirmButton" onClick={handleConfirmClick}>Confirm</button>
      )}
    </div>
  );
};

export default Merge;
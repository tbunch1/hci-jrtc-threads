import React, { useState, useEffect } from 'react';
import '../styles/Merge.css';
import { click } from '@testing-library/user-event/dist/click';

interface MergeProps {
  onClose: () => void;
  clickedNodeId: number | null;
  clickedNodeId2: number| null;
}

const Merge: React.FC<MergeProps> = ({ onClose, clickedNodeId, clickedNodeId2 }) => {
  const [twoNodesSelected, setTwoNodesSelected] = useState(false);
  const [numNodesSelected, setNumNodesSelected] = useState(1);

  useEffect(() => {
    if (clickedNodeId !== null && clickedNodeId2 !== null) {
      setTwoNodesSelected(true);
      setNumNodesSelected(2);
    } else {
      setTwoNodesSelected(false);
      setNumNodesSelected(1);
    }
  }, [clickedNodeId, clickedNodeId2]);

  return (
    <div>
      <p className="mergePopup">Merge</p>
      <p className="mergeInstr">Select two design nodes to merge</p>
      <button className="cancelButton" onClick={onClose}>Cancel</button>
      {!twoNodesSelected && <p className="selectStatus">{`${numNodesSelected}/2 nodes selected`}</p>}
      {twoNodesSelected && <button className="confirmButton">Confirm</button>}
    </div>
  );
};

export default Merge;
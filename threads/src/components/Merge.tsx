import React, { useState } from 'react';
import '../styles/Merge.css';

interface MergeProps {
  onClose: () => void;
}

const Merge: React.FC<MergeProps> = ({ onClose }) => {
  const [twoNodesSelected, setTwoNodesSelected] = useState(false);
  const [numNodesSelected, setNumNodesSelected] = useState(0);

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
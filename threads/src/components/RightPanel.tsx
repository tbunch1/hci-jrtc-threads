import React, { useState } from 'react';
import '../styles/RightPanel.css';

interface RightPanelProps {
  toggleMergeMode: () => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ toggleMergeMode }) => {

  const handleSnapshot = () => {
    console.log("Snapshot taken");
  };

  return (
    <div>
      <div className="rightPanel">
        <button className="rightPanelButton" onClick={handleSnapshot}>Snapshot</button>
        <button className="rightPanelButton" onClick={toggleMergeMode}>Merge</button>
      </div>
    </div>
  );
};

export default RightPanel;


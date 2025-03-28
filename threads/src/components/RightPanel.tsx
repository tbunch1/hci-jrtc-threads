import React, { useState } from 'react';
import '../styles/RightPanel.css';

const RightPanel: React.FC = () => {
  const handleSnapshot = () => {
    console.log("Snapshot taken");
    // TODO: Snapshot logic -- Christina
  };

  const handleMerge = () => {
    console.log("Merge action triggered");
    // Merge logic
  };

  console.log("RightPanel rendered");

  return (
    <div className="rightPanel">
      <div>
        <button className="rightPanelButton" onClick={handleSnapshot}>Snapshot</button>
        <button className="rightPanelButton" onClick={handleMerge}>Merge</button>
      </div>
    </div>
  );
};

export default RightPanel;


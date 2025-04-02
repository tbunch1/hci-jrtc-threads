import React, { useState } from 'react';
import '../styles/Merge.css';

const MergeConflict = () => {

  return (
    <div>
      <p className="mergePopup">Merge Conflict</p>
      <p className="conflictWarning">Cannot merge because of merge conflicts. Please resolve conflicts before merging.</p>
    </div>
  );
};

export default MergeConflict;

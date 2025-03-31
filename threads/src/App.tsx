import React, { useState } from "react";
import "./App.css";
import Tree from "./components/Tree";
import Main from "./components/Main";
import { GlobalProvider } from "./components/GlobalProvider";
import Panel from "./components/Panel";
import DesignButtons from "./components/DesignButtons";
import RightPanel from "./components/RightPanel";
import Merge from './components/Merge';

function App() {
  const [isMergeMode, setIsMergeMode] = useState(false);
  const [clickedNodeId, setClickedNodeId] = useState<number | null>(null);
  const [clickedNodeId2, setClickedNodeId2] = useState<number | null>(null);

  const toggleMergeMode = () => {
    setIsMergeMode((prev) => !prev)
  };

  const closeMerge = () => {
    setIsMergeMode(false);
    setClickedNodeId2(null);
  };

  const handleNodeClick = (id: number) => {
    if (isMergeMode) {
      if (clickedNodeId === null) {
        setClickedNodeId(id);
      } else if (clickedNodeId2 === null && id !== clickedNodeId) {
        setClickedNodeId2(id);
      }
    } else {
      setClickedNodeId(id);
    }
  };

  return (
    <div className="App relative">
      <GlobalProvider>
        <div className="absolute top-0 left-0 w-full z-10">
            <Tree 
              isMergeMode={isMergeMode}
              clickedNodeId={clickedNodeId}
              setClickedNodeId={setClickedNodeId}
              clickedNodeId2={clickedNodeId2}
              nodeClick={handleNodeClick}
            />
        </div>

        <div className="w-screen h-screen relative">
          <Main />
        </div>
        
        <div>
          <DesignButtons />
        </div>

        <div>
          <RightPanel toggleMergeMode={toggleMergeMode}/>
        </div>

        {isMergeMode && (
          <Merge 
            onClose={closeMerge}
            clickedNodeId={clickedNodeId}
            clickedNodeId2={clickedNodeId2}
          />
        )}
        
      </GlobalProvider>
    </div>
  );
}

export default App;

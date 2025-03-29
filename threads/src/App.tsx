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

  const toggleMergeMode = () => {
    setIsMergeMode((prev) => !prev)
  };

  const closeMerge = () => {
    setIsMergeMode(false);
  };

  return (
    <div className="App relative">
      <GlobalProvider>
        <div className="absolute top-0 left-0 w-full z-10">
            <Tree isMergeMode={isMergeMode}/>
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

        {isMergeMode && <Merge onClose={closeMerge}/>}
        
      </GlobalProvider>
    </div>
  );
}

export default App;

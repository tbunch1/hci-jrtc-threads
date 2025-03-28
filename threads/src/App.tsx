import React from "react";
import "./App.css";
import Tree from "./components/Tree";
import Main from "./components/Main";
import { GlobalProvider } from "./components/GlobalProvider";
import Panel from "./components/Panel";
import DesignButtons from "./components/DesignButtons";

function App() {
  return (
    <div className="App relative">
      <GlobalProvider>
        <div className="absolute top-0 left-0 w-full z-10">
            <Tree />
        </div>

        <div className="w-screen h-screen relative">
          <Main />
        </div>
        
        <div>
          <DesignButtons />
        </div>
        
      </GlobalProvider>
    </div>
  );
}

export default App;

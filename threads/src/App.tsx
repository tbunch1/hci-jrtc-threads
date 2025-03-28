import React from "react";
import "./App.css";
import Tree from "./components/Tree";
import Main from "./components/Main";
import Panel from "./components/Panel";

function App() {
  return (
    <div className="App relative">
      <div className="absolute top-0 left-0 w-full z-10">
        <Tree />
      </div>

      <div className="w-screen h-screen relative">
        <Main />
      </div>
    </div>
  );
}

export default App;

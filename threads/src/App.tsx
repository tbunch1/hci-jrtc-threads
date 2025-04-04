import React, { useState } from "react";
import "./App.css";
import Tree from "./components/Tree";
import { Node } from "./components/Tree";
import Main from "./components/Main";
import { useGlobalState } from "./components/GlobalProvider";
import Panel from "./components/Panel";
import DesignButtons from "./components/DesignButtons";
import RightPanel from "./components/RightPanel";
import Merge from './components/Merge';

function App() {
  const [isMergeMode, setIsMergeMode] = useState(false);

  const [data, setData] = useState<Node>(new Node(0, "Root"));
  const [nextId, setNextId] = useState<number>(1); // Counter for unique node ids
  const [clickedNodeId, setClickedNodeId] = useState<number | null>(null);
  const [clickedNodeId2, setClickedNodeId2] = useState<number | null>(null);
  const [clickedNode, setClickedNode] = useState<Node | null>(null);
  const [clickedNode2, setClickedNode2] = useState<Node | null>(null);

  const toggleMergeMode = () => {
    setIsMergeMode((prev) => !prev)
  };

  const closeMerge = () => {
    setIsMergeMode(false);
    setClickedNodeId2(null);
    setClickedNode2(null);
  };

  const {setShirt, setPants, setDesign} = useGlobalState();

  const handleNodeClick = (node: Node) => {
    if (isMergeMode) {
      if (clickedNode === null) {
        setClickedNodeId(node.id);
        setClickedNode(node);
      } else if (clickedNode2 === null && node !== clickedNode) {
        setClickedNodeId2(node.id);
        setClickedNode2(node);
      }
    } else {
      setClickedNodeId(node.id);
      setClickedNode(node);
    }

    setShirt(node.design[0]);
    setPants(node.design[1]);
    setDesign(node.design[2]);
  };

  const addChild = (
    parentNode: Node, 
    childName: string, 
    design: number[] = [parentNode.design[0], parentNode.design[1], parentNode.design[2]]
  ): Node => {
    const newNode = new Node(nextId, childName, [], [design[0], design[1], design[2]]);
    setClickedNodeId(nextId);
    setNextId(nextId + 1); // Increment the id counter

    const updateTree = (node: Node): Node => {
      if (node.id === parentNode.id) {
        return { ...node, children: [...node.children, newNode] };
      }
      return { ...node, children: node.children.map(updateTree) };
    };

    handleNodeClick(newNode);

    setData((prevData) => updateTree(prevData));

    return newNode;
  };

  return (
    <div className="App relative">
        <div className="absolute top-0 left-0 w-full z-10">
            <Tree 
              isMergeMode={isMergeMode}
              clickedNodeId={clickedNodeId}
              clickedNodeId2={clickedNodeId2}
              nodeClick={handleNodeClick}
              addChild={addChild}
              data={data}
              setData={setData}
            />
        </div>
        {!isMergeMode &&
          <div className="w-screen h-screen relative">
            <Main />
          </div>
        }
        
        <div>
          <DesignButtons />
        </div>

        <div>
          <RightPanel toggleMergeMode={toggleMergeMode}/>
        </div>

        {isMergeMode && (
          <Merge 
            onClose={closeMerge}
            clickedNode={clickedNode}
            clickedNode2={clickedNode2}
            addChild={addChild}
            handleNodeClick={handleNodeClick}
          />
        )}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import Tree from "./components/Tree";
import { Node } from "./components/Tree";
import Main from "./components/Main";
import { useGlobalState } from "./components/GlobalProvider";
import DesignButtons from "./components/DesignButtons";
import RightPanel from "./components/RightPanel";
import Merge from "./components/Merge";

function App() {
  const [isMergeMode, setIsMergeMode] = useState(false);
  const [data, setData] = useState<Node>(new Node(0, "Root"));
  const rootNode = data;
  const [nextId, setNextId] = useState<number>(1); // Counter for unique node ids
  const [clickedNodeId, setClickedNodeId] = useState<number | null>(null);
  const [clickedNodeId2, setClickedNodeId2] = useState<number | null>(null);
  const [clickedNode, setClickedNode] = useState<Node | null>(null);
  const [clickedNode2, setClickedNode2] = useState<Node | null>(null);
  const [initialDesign, setInitialDesign] = useState<number[]>([-1, -1, -1]);


  useEffect(() => {
    handleNodeClick(data); // 'data' is your root node
  }, []);

  const toggleMergeMode = () => {
    setIsMergeMode((prev) => !prev);
  };

  const closeMerge = () => {
    setIsMergeMode(false);
    setClickedNodeId2(null);
    setClickedNode2(null);
  };

  const { shirt, pants, design, setShirt, setPants, setDesign } = useGlobalState();
  

  const handleNodeClick = (node: Node) => {
    if(!(initialDesign[0] === shirt && initialDesign[1] === pants && initialDesign[2] === design)) {
      const confirmSwitch = window.confirm("Unsaved changes will be lost. Do you want to continue?");
      if (!confirmSwitch) return;
    }

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
    setInitialDesign(node.design);
  };

  const findNodeById = (node: Node, id: number): Node | null => {
    if (node.id === id) {
      return node;
    }
    for (let child of node.children) {
      const foundNode = findNodeById(child, id);
      if (foundNode) return foundNode;
    }
    return null;
  };

  function deleteNode(root: Node, target: Node): boolean {
    console.log(root);
    if (!root.children) {
      console.log(`Node ${root.name} has no children.`);
      return false;
    }
  
    const index = root.children.findIndex(child => child.id === target.id);
    if (index !== -1) {
      console.log(`Deleting node ${target.name} from parent ${root.name}`);
      root.children.splice(index, 1);
      return true;
    }
  
    for (const child of root.children) {
      console.log(`Checking child ${child.name} of node ${root.name}`);
      if (deleteNode(child, target)) return true;
    }
  
    console.log(`Node ${target.name} not found in children of ${root.name}`);
    return false;
  }
  
  

  const addChild = (
    parentNode: Node,
    childName: string,
    design: number[] = [
      parentNode.design[0],
      parentNode.design[1],
      parentNode.design[2],
    ]
  ): Node => {
    const newNode = new Node(
      nextId,
      childName,
      [],
      [design[0], design[1], design[2]],
      rootNode,
    );
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
          findNodeById={findNodeById}
          initialDesign={initialDesign}
          setInitialDesign={setInitialDesign}
        />
      </div>
      {!isMergeMode && (
        <div className="w-screen h-screen relative">
          <Main />
        </div>
      )}

      <div>
        <DesignButtons />
      </div>

      <div>
        <RightPanel toggleMergeMode={toggleMergeMode} />
      </div>

      {isMergeMode && (
        <Merge
          onClose={closeMerge}
          clickedNode={clickedNode}
          clickedNode2={clickedNode2}
          addChild={addChild}
          handleNodeClick={handleNodeClick}
          findNodeById={findNodeById}
          data={data}
          deleteNode={deleteNode}
        />
      )}
    </div>
  );
}

export default App;

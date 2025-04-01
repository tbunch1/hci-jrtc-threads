import React, { useState } from "react";
import { useGlobalState } from "./GlobalProvider";

export class Node {
  id: number;
  name: string;
  children: Node[];
  design: number[];

  constructor(id: number, name: string, children: Node[] = [], design: number[] = [-1, -1, -1]) {
    this.id = id;
    this.name = name;
    this.children = children;
    this.design = design;
  }
}

interface TreeNodeProps {
  node: Node;
  addChild: (parent: Node, name: string) => void;
  clickedNodeId: number | null;
  clickedNodeId2: number | null;
  nodeClick: (id: number) => void;
  isMergeMode: boolean;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, addChild, clickedNodeId, clickedNodeId2, nodeClick, isMergeMode }) => {
  const handleAddChild = () => {
    const childName = prompt("Enter snapshot name:"); // Prompt for child name
    if (childName) addChild(node, childName);
  };

  const getNodeStyle = () => {
    if (isMergeMode) {
      if (node.id === clickedNodeId || node.id === clickedNodeId2) return "bg-red-500";
    }
    return node.id === clickedNodeId ? "bg-red-500" : "bg-blue-500";
  };

  const {setShirt, setPants, setDesign} = useGlobalState();
  const handleNodeClick = (id: number) => {
    setShirt(node.design[0]);
    setPants(node.design[1]);
    setDesign(node.design[2]);
    nodeClick(id);
    console.log(node.design);
  }


  return (
    <div className="relative group">
      <div
        className={`w-20 p-2 text-white rounded-lg text-center cursor-pointer ${getNodeStyle()}`}
        onClick={() => handleNodeClick(node.id)}
      >
        {node.name || "Empty Node"}
      </div>

      <div className="absolute top-0 right-0 -mt-6">
        <button
          className="text-white bg-green-500 rounded-full w-6 h-6 flex items-center justify-center"
          onClick={handleAddChild}
        >
          +
        </button>
      </div>

      {node.children && node.children.length > 0 && (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-4">
          <div className="w-1 h-8 bg-gray-300 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          <div className="flex space-x-6 relative">
            {node.children.map((child) => (
              <div key={child.id} className="relative">
                {/* Line from parent to child */}
                <div
                  className="absolute w-1 bg-black"
                  style={{
                    height: "20px", // Adjust the line height
                    top: "-40%", // Adjust the line position relative to parent
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                ></div>

                <TreeNode
                  node={child}
                  addChild={addChild}
                  clickedNodeId={clickedNodeId}
                  clickedNodeId2={clickedNodeId2}
                  nodeClick={nodeClick}
                  isMergeMode={isMergeMode}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Tree: React.FC< {isMergeMode: boolean; clickedNodeId: number | null; setClickedNodeId: (id: number) => void ; clickedNodeId2: number | null; nodeClick: (id: number) => void} > = ({ 
    isMergeMode, 
    clickedNodeId, 
    setClickedNodeId,
    clickedNodeId2, 
    nodeClick 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  React.useEffect(() => {
    setClickedNodeId(0);
  }, [setClickedNodeId]);

  const [data, setData] = useState<Node>(new Node(0, "Root"));
  const [nextId, setNextId] = useState<number>(1); // Counter for unique node ids

  const addChild = (parentNode: Node, childName: string) => {
    const newNode = new Node(nextId, childName, [], [parentNode.design[0], parentNode.design[1], parentNode.design[2]]);
    setClickedNodeId(nextId);
    setNextId(nextId + 1);

    const updateTree = (node: Node): Node => {
      if (node.id === parentNode.id) {
        return { ...node, children: [...node.children, newNode] };
      }
      return { ...node, children: node.children.map(updateTree) };
    };

    setData((prevData) => updateTree(prevData));
  };

  const {shirt, pants, design} = useGlobalState();
  const saveDesign = () => {
    if (clickedNodeId === null) return;

    // Get the node that was clicked
    const clickedNode = findNodeById(data, clickedNodeId);

    if (clickedNode) {
      // Assuming shirt, pants, and design are in the global state or component state
      const updatedDesign = [shirt, pants, design]; // Replace these with your actual values from state
      clickedNode.design = updatedDesign;

      // Update the tree with the modified design
      const updateTree = (node: Node): Node => {
        if (node.id === clickedNodeId) {
          return { ...node, design: updatedDesign };
        }
        return { ...node, children: node.children.map(updateTree) };
      };

      setData((prevData) => updateTree(prevData));
    }
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

  return (
    <div>
      <button
        onClick={toggleVisibility}
        className="bg-blue-500 text-white px-2 py-1 hover:bg-blue-600 transition duration-200"
      >
        {isVisible ? "Hide Tree" : "Show Tree"}
      </button>

      <button
        onClick={saveDesign}
        className="bg-blue-500 text-white px-2 py-1 hover:bg-blue-600 transition duration-200"
      >
        Save Design
      </button>

      <div
        style={{
          display: isVisible ? "block" : "none",
          width: "20%",
          height: "100vh", // 2/5th of the screen height
          overflow: "hidden",
          backgroundColor: "lightgray",
        }}
      >
        <div className="flex justify-center p-8">
          <TreeNode
            node={data}
            addChild={addChild}
            clickedNodeId={clickedNodeId}
            clickedNodeId2={clickedNodeId2}
            nodeClick={nodeClick}
            isMergeMode={isMergeMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Tree;

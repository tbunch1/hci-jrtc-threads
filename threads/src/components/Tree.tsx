import React, { useState } from "react";
import { useGlobalState } from "./GlobalProvider";

export class Node {
  id: number;
  name: string;
  children: Node[];
  design: number[];
  parent: Node | null;

  constructor(id: number, name: string, children: Node[] = [], design: number[] = [-1, -1, -1], parent: Node | null = null) {
    this.id = id;
    this.name = name;
    this.children = children;
    this.design = design;
    this.parent = parent;
  }
}

interface TreeNodeProps {
  node: Node;
  addChild: (parent: Node, name: string) => void;
  clickedNodeId: number | null;
  clickedNodeId2: number | null;
  nodeClick: (node: Node) => void;
  isMergeMode: boolean;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, addChild, clickedNodeId, clickedNodeId2, nodeClick, isMergeMode }) => {
  const handleAddChild = () => {
    const childName = prompt("Enter child node name:"); // Prompt for child name
    if (childName) addChild(node, childName);
  };

  const getNodeStyle = () => {
    if (isMergeMode) {
      if (node.id === clickedNodeId || node.id === clickedNodeId2) return "bg-red-500";
    }
    return node.id === clickedNodeId ? "bg-red-500" : "bg-blue-500";
  };

  const {setShirt, setPants, setDesign} = useGlobalState();
  const handleNodeClick = () => {
    const confirmSwitch = window.confirm("Did you save your current file?");
    if (!confirmSwitch) return;
  
    setShirt(node.design[0]);
    setPants(node.design[1]);
    setDesign(node.design[2]);
    nodeClick(node);
    console.log(node.design);
  };
  

  return (
    <div className="relative group">
      <div
        className={`w-20 p-2 text-white rounded-lg text-center cursor-pointer ${getNodeStyle()}`}
        onClick={handleNodeClick}
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

const Tree: React.FC< {
    isMergeMode: boolean; 
    clickedNodeId: number | null; 
    clickedNodeId2: number | null; 
    nodeClick: (node: Node) => void
    addChild: (parentNode: Node, childName: string, design?: number[]) => Node;
    data: Node;
    setData: (data: Node) => void;
    findNodeById: (node: Node, id: number) => Node | null;
} > = ({ 
    isMergeMode, 
    clickedNodeId, 
    clickedNodeId2, 
    nodeClick,
    addChild,
    data,
    setData,
    findNodeById
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
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
  
        setData(updateTree(data));
      }
    };

    const printAllNodes = () => {
      const traverse = (node: Node) => {
        console.log(node.name);
        node.children.forEach(traverse);
      };
    
      traverse(data);
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
          width: "30%",
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

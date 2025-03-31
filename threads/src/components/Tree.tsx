import React, { useState } from "react";

export class Node {
  id: number;
  name: string;
  children: Node[];
  image?: string; // Optional property for image

  constructor(id: number, name: string, children: Node[] = []) {
    this.id = id;
    this.name = name;
    this.children = children;
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

  return (
    <div className="relative group">
      <div
        className={`w-20 p-2 text-white rounded-lg text-center cursor-pointer ${getNodeStyle()}`}
        onClick={() => nodeClick(node)}
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
    addChild: (parentNode: Node, childName: string) => void;
    data: Node
} > = ({ 
    isMergeMode, 
    clickedNodeId, 
    clickedNodeId2, 
    nodeClick,
    addChild,
    data
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button
        onClick={toggleVisibility}
        className="bg-blue-500 text-white px-2 py-1 hover:bg-blue-600 transition duration-200"
      >
        {isVisible ? "Hide Tree" : "Show Tree"}
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

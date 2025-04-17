import React, { useState } from "react";
import { useGlobalState } from "./GlobalProvider";

export class Node {
  id: number;
  name: string;
  children: Node[];
  design: number[];
  parent: Node | null;

  constructor(
    id: number,
    name: string,
    children: Node[] = [],
    design: number[] = [-1, -1, -1],
    parent: Node | null = null
  ) {
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
  nodeClick: (node: Node, newNode: boolean) => void;
  isMergeMode: boolean;
  data: Node;
  setData: (data: Node) => void;
  saveDesign: () => void;
  initialDesign: number[];
  setInitialDesign: (design: number[]) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  addChild,
  clickedNodeId,
  clickedNodeId2,
  nodeClick,
  isMergeMode,
  data,
  setData,
  saveDesign,
  initialDesign,
  setInitialDesign,
}) => {
  const { shirt, pants, design } = useGlobalState();
  const handleAddChild = () => {
    if(!(initialDesign[0] === shirt && initialDesign[1] === pants && initialDesign[2] === design)) {
      const confirmSwitch = window.confirm("Unsaved changes found. Save the file?");
      if (!confirmSwitch) return;
    }
    saveDesign();
    const childName = prompt("Enter child node name:"); // Prompt for child name
    if (childName) addChild(node, childName);
  };

  const getNodeStyle = () => {
    if (isMergeMode) {
      if (node.id === clickedNodeId || node.id === clickedNodeId2)
        return "bg-red-500";
    }
    return node.id === clickedNodeId ? "bg-red-500" : "bg-blue-500";
  };


  const handleRemoveNode = (nodeId: number) => {
    const removeNodeFromTree = (parent: Node, nodeId: number): Node => {
      // Filter out the node with the matching ID from the parent's children
      const updatedChildren = parent.children.filter(
        (child) => child.id !== nodeId
      );

      // Update each child recursively
      const updatedNode = { ...parent, children: updatedChildren };

      // Also update the children recursively
      updatedNode.children = updatedNode.children.map((child) =>
        removeNodeFromTree(child, nodeId)
      );

      return updatedNode;
    };

    // Start removing the node from the root node (data)
    const updatedTree = removeNodeFromTree(data, nodeId);

    // Update the tree state with the modified structure
    setData(updatedTree);
  };

  return (
    <div>
    <div className="relative group">
      <div
        className={`w-20 p-2 text-white rounded-lg text-center cursor-pointer shadow-lg transform hover:scale-105 hover:rotate-3 transition-transform duration-300 ease-in-out
    hover:shadow-2xl ${getNodeStyle()}`}
        onClick={() => nodeClick(node, false)}
      >
        {node.name || "Empty Node"}
      </div>

      <div className="absolute top-0 right-0 -mt-6 flex space-x-8">
        {/* Add Child Button */}
        <button
          className="text-white bg-green-500 rounded-full w-6 h-6 flex items-center justify-center"
          onClick={handleAddChild}
        >
          +
        </button>

        {/* Remove Node Button */}
        <button
          className="text-white bg-red-500 rounded-full w-6 h-6 flex items-center justify-center"
          onClick={() => handleRemoveNode(node.id)} // Replace with the actual function to remove the node
        >
          -
        </button>
      </div>

      {node.children && node.children.length > 0 && (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-8">
          <div className="w-1 h-8 bg-gray-300 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          <div className="flex space-x-6 relative">
            {node.children.map((child) => (
              <div key={child.id} className="relative">
                {/* Line from parent to child */}
                <div
                  className="absolute w-1 bg-black"
                  style={{
                    height: "70px", // Adjust the line height
                    top: "-90%", // Adjust the line position relative to parent
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
                  data={data}
                  setData={setData}
                  saveDesign={saveDesign}
                  initialDesign={initialDesign}
                  setInitialDesign={setInitialDesign}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

const Tree: React.FC<{
  isMergeMode: boolean;
  clickedNodeId: number | null;
  clickedNodeId2: number | null;
  nodeClick: (node: Node, newNode: boolean) => void;
  addChild: (parentNode: Node, childName: string, design?: number[]) => Node;
  data: Node;
  setData: (data: Node) => void;
  findNodeById: (node: Node, id: number) => Node | null;
  initialDesign: number[];
  setInitialDesign: (design: number[]) => void;
}> = ({
  isMergeMode,
  clickedNodeId,
  clickedNodeId2,
  nodeClick,
  addChild,
  data,
  setData,
  findNodeById,
  initialDesign,
  setInitialDesign,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const { shirt, pants, design } = useGlobalState();
  const isChanged = !(
    initialDesign[0] === shirt &&
    initialDesign[1] === pants &&
    initialDesign[2] === design
  );
  const buttonColor = isChanged ? "bg-red-700" : "bg-gray-500";
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const saveDesign = () => {
    setInitialDesign([shirt, pants, design]);
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
      <div className="flex gap-4 justify-center">
        <button
          onClick={toggleVisibility}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-600 transform hover:scale-105 transition duration-300"
        >
          {isVisible ? "Hide Tree" : "Show Tree"}
        </button>

        <button
          onClick={saveDesign}
          className={`${buttonColor} text-white px-4 py-2 rounded-xl shadow-md hover:bg-red-1000 transform hover:scale-105 transition duration-300`}
        >
          Save Design
        </button>
      </div>

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
            data={data}
            setData={setData}
            saveDesign={saveDesign}
            initialDesign={initialDesign}
            setInitialDesign={setInitialDesign}
          />
        </div>
      </div>
    </div>
  );
};

export default Tree;

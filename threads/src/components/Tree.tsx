import React, { useState } from "react";

class Node {
  id: number;
  isChild: boolean = false; // Indicates if this node has a child

  constructor(id: number, isChild: boolean) {
    this.id = id;
    this.isChild = isChild; // Set the initial value based on the constructor parameter

  }
}

function Tree() {
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const [nodes, setNodes] = useState<Node[]>([]);
  const [clickedNode, setClickedNode] = useState<number | null>(null); // Store index of clicked node (null for no clicked node)

  const addNode = (isChild: boolean = false) => {
    setNodes((prevNodes) => {
      const newNode = new Node(prevNodes.length, isChild); // Pass the isChild boolean to the Node constructor
      const newNodes = [...prevNodes, newNode];
      nodeClick(newNodes.length - 1);
      return newNodes;
    });
  };
  

  const branchNode = () => {
    const newNode = addNode(true); // Create a new node
  };

  const nodeClick = (index: number) => {
    console.log(`Node ${index} clicked`);
    setClickedNode(index); // Set the clicked node's index
  };

  return (
    <div>
      <button onClick={toggleVisibility}>{isVisible ? "Hide" : "Show"}</button>
      <div
        style={{
          display: isVisible ? "block" : "none",
          height: "20vh", // 2/5th of the screen height
          overflow: "hidden",
          backgroundColor: "lightgray",
        }}
      >
        <h2>Version History</h2>
        <div className="flex gap-4">
          <button
            onClick={() => addNode()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            +
          </button>

          <button
            onClick={branchNode}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            ⤴
          </button>
        </div>

        <div className="absolute top-20 left-0 w-full flex items-center gap-10">
          {nodes.map((node, index) => (
            <div key={index} className="relative">
              {/* Line connecting nodes */}
              {index > 0 && (
                <div
                  className="absolute top-0 left-0"
                  style={{
                    width: "80px", // Horizontal line length (adjust as needed)
                    height: "2px", // Horizontal line thickness
                    backgroundColor: "black",
                    top: "50%", // Position it at the middle of the previous node
                    left: "-80%", // Position it relative to the previous node
                    transform: "translateY(-50%)",
                  }}
                />
              )}

              {/* Node as a red circle button */}
              <button
                className={`w-8 h-8 rounded-full border-none cursor-pointer ${
                  clickedNode === index ? "bg-red-500" : "bg-white"
                }`}
                style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                  cursor: "pointer",
                  margin: "1rem",
                }}
                onClick={() => nodeClick(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tree;

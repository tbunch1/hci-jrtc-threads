import React, { useState } from 'react';

interface TreeNodeProps {
  node: {
    name: string;
    children: TreeNodeProps['node'][];
  };
  addChild: (parentNode: TreeNodeProps['node'], childName: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, addChild }) => {
  const [showAddChild, setShowAddChild] = useState(false);

  const handleAddChild = () => {
    const childName = prompt("Enter the name of the new child node");
    if (childName) {
      addChild(node, childName);
    }
  };

  return (
    <div className="relative group">
      <div
        className="w-24 p-2 bg-blue-500 text-white rounded-lg text-center cursor-pointer"
        onClick={() => setShowAddChild(!showAddChild)}
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
          <div className="flex space-x-6">
            {node.children.map((child, index) => (
              <div key={index}>
                <TreeNode node={child} addChild={addChild} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Tree = () => {
  const [data, setData] = useState({name: "", children: [
    // Initial tree structure
    { name: "Child 1", children: [] },
  ] });

  const addChild = (parentNode: any, childName: any) => {
    // Create a new copy of the node structure to ensure immutability
    const addRecursiveChild = (node: { name?: string; children: any; }) => {
      if (node === parentNode) {
        node.children = [...node.children, { name: childName, children: [] }];
      } else if (node.children) {
        node.children.forEach(addRecursiveChild);
      }
    };

    const newData = { ...data }; // Shallow copy of the root node
    addRecursiveChild(newData);
    setData(newData); // Update state with the modified tree structure
  };

  return (
    <div className="flex justify-center p-8">
      <TreeNode node={data} addChild={addChild} />
    </div>
  );
};

export default Tree;

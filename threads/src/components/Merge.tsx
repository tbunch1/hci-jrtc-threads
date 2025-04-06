import React, { useState, useEffect } from 'react';
import '../styles/Merge.css';
import { Node } from './Tree';
import MergeConflict from './MergeConflict';
import MergeClothes from './MergeClothes';

interface MergeProps {
  onClose: () => void;
  clickedNode: Node | null;
  clickedNode2: Node | null;
  addChild: (parentNode: Node, childName: string, design?: number[]) => Node;
  handleNodeClick: (node: Node) => void;
  findNodeById: (node: Node, id: number) => Node | null;
  data: Node;
  deleteNode: (root: Node, target: Node) => boolean;
}

const Merge: React.FC<MergeProps> = ({ onClose, clickedNode, clickedNode2, addChild, handleNodeClick, findNodeById, data, deleteNode }) => {
  const [isMergeConflictMode, setIsMergeConflictMode] = useState(false);
  const [totalConflicts, setTotalConflicts] = useState(0);
  const [slotConflicts, setSlotConflicts] = useState<number[]>([]);
  const [designOpts, setDesignOpts] = useState<number[]>([-1, -1, -1])
  const [twoNodesSelected, setTwoNodesSelected] = useState(false);
  const [numNodesSelected, setNumNodesSelected] = useState(1);

  useEffect(() => {
    if (clickedNode && clickedNode2) {
      setTwoNodesSelected(true);
      setNumNodesSelected(2);
    } else {
      setTwoNodesSelected(false);
      setNumNodesSelected(1);
    }
  }, [clickedNode, clickedNode2]);

  const handleConfirmClick = () => {
    if (clickedNode && clickedNode2) {
      console.log("node 1: " + clickedNode.name);
      const designOpt1 = clickedNode.design;
      const designOpt2 = clickedNode2.design;
      console.log(`designOpt1: ${designOpt1}`)
      console.log(`designOpt2: ${designOpt2}`)
      let newClothesOpts = new Array(designOpt1.length);
      setSlotConflicts([]);
      let isMergeConflict = false;

      for (let i = 0; i < designOpt1.length; i++) {
        let opt1 = designOpt1[i];
        let opt2 = designOpt2[i];
        if (opt1 === opt2 || opt2 === -1) {
          newClothesOpts[i] = opt1;
        } else if (opt1 === -1) {
          newClothesOpts[i] = opt2;
        } else {
          setSlotConflicts(prevConflicts => [...prevConflicts, i]);
          setTotalConflicts(prev => prev + 1);
          isMergeConflict = true;
        }
      }

      if (isMergeConflict) {
        setDesignOpts(newClothesOpts);
        setIsMergeConflictMode(true);
      } else {
        createMergedNode(clickedNode, clickedNode2, newClothesOpts);
      }
    }

  };
  

  const createMergedNode = (node1: Node, node2: Node, newClothesOpts: number[]) => {
    if (node1 && node2) {
      const parent = node1.id > node2.id ? node1 : node2;
  
      const mergeName = prompt("Enter merged design node name:");
      if (mergeName) {
        deleteNode(data, node1);
        deleteNode(data, node2);
        const mergedDesign = addChild(data, mergeName, newClothesOpts);
        handleNodeClick(mergedDesign);
      }
      onClose();
    }
  };
  

  return (

    <div>
      <div>
        {twoNodesSelected &&
          <MergeClothes node1={clickedNode} node2={clickedNode2} />
        }
      </div>
      {!isMergeConflictMode && (
        <div>
          <p className="mergePopup">Merge</p>
          <p className="mergeInstr">Select two design nodes to merge</p>
          <button className="cancelButton" onClick={onClose}>Cancel</button>
          {!twoNodesSelected && <p className="selectStatus">{`${numNodesSelected}/2 nodes selected`}</p>}
          {twoNodesSelected && (
            <button className="confirmButton" onClick={handleConfirmClick}>Confirm</button>
          )}
        </div>
      )};


      {isMergeConflictMode && (
        <div>
          <MergeConflict
            totalConflicts={totalConflicts}
            conflicts={slotConflicts}
            node1={clickedNode} 
            node2={clickedNode2}
            newClothesOpts={designOpts}
            createMergedNode={createMergedNode}
          />
          <button className="cancelButton" onClick={onClose}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Merge;
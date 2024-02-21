"use client";
import generateGraph from "@/lib/graphGenerator";
import React, { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
} from "reactflow";
import { Position } from "reactflow";
import "reactflow/dist/style.css";

// Example endpoints array
const endpoints = [
  { id: "1", pathUrl: "GET /getUsers", groupName: "Users" },
  { id: "2", pathUrl: "GET /:id", groupName: "Users" },
  { id: "3", pathUrl: "POST /create", groupName: "Users" },
  { id: "4", pathUrl: "POST /createFood", groupName: "Food" },
  { id: "5", pathUrl: "POST /EditFood", groupName: "Food" },
  { id: "6", pathUrl: "POST /DeleteFood", groupName: "Food" },
  // Add more endpoints here...
];

const CustomNode = React.memo(({ data, onClick, selectedNodeId }: any) => {
  console.log("data ===========", data);

  const handleClick = () => {
    // Call the onClick handler passed from the parent component
    console.log("clickedd ===========", data.id);

    onClick(data.id);
  };

  const getNodeStyle = (node: any) => ({
    background: selectedNodeId === node.id ? "orange" : "rgb(241, 245, 249)",

    // Add other styles as needed
  });

  return (
    <div
      onClick={handleClick}
      className=" py-2 px-4 rounded-md"
      style={getNodeStyle(data)}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ borderRadius: 0 }}
      />
      {data.label}
      <Handle type="source" position={Position.Right} />
    </div>
  );
});

export default React.memo(function ApiDocsGraph({
  endpointsList,
  setSelectedNodeId,
  selectedNodeId,
}: any) {
  const { nodes: initialNodes, edges: initialEdges } = generateGraph(
    endpointsList.map((endpoint: any) => {
      return {
        id: endpoint.ID,
        pathUrl: endpoint.Url,
        groupName: endpoint.Group.Group,
      };
    }) || endpoints
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = (nodeId: any) => {
    // Change the state in the parent component
    console.log("clickedd nodeId", nodeId);

    setSelectedNodeId(nodeId);
  };
  return (
    <div className=" h-[400px]  w-4/5 ">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        nodeTypes={{
          ...nodeTypes,
          custom: (props: any) => (
            <CustomNode
              {...props}
              onClick={handleNodeClick}
              selectedNodeId={selectedNodeId}
            />
          ),
        }}
      />
    </div>
  );
});
const nodeTypes = {
  custom: CustomNode, // 'custom' is the type name you'll refer to
};

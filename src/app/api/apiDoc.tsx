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

const nodeStyle = {
  padding: 4,
};

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

const CustomNode = ({ data }: any) => {
  return (
    <div
      style={nodeStyle}
      className="bg-gray-300 text-black py-4 px-8 rounded-md"
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ borderRadius: 0 }}
      />
      {data.label}
      <Handle
        type="source"
        position={Position.Right}
        style={{ borderRadius: 0 }}
      />
    </div>
  );
};

export default function App() {
  const { nodes: initialNodes, edges: initialEdges } = generateGraph(endpoints);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="h-4/5 bg-black w-2/3 ">
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          style: nodeStyle,
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      />
    </div>
  );
}
const nodeTypes = {
  custom: CustomNode, // 'custom' is the type name you'll refer to
};

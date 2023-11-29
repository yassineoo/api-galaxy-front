import { Position } from "reactflow";

export default function generateGraph(endpoints: any[]) {
  // Root node is constant
  const nodes = [
    {
      id: "root",
      type: "input",
      position: { x: 20, y: 100 },
      data: { label: "/ (Root)" },
    },
  ];

  const edges: any = [];
  const groupPositions: any = {}; // To track the Y position of each group
  let currentGroupY = 10; // Initial Y position for the first group

  // Create group nodes and edges from root to group
  const groups = Array.from(new Set(endpoints.map((ep) => ep.groupName)));
  groups.forEach((group: number) => {
    const groupId = `group-${group}`;
    groupPositions[group] = currentGroupY;

    nodes.push({
      id: groupId,
      type: "custom",

      position: { x: 200, y: currentGroupY },
      data: { label: group.toString() },
    });

    edges.push({
      id: `root-${groupId}`,
      source: "root",
      target: groupId,
      animated: true,
      targetPosition: Position.Left,
      sourcePosition: Position.Left,
      style: {
        stroke: "#FF0077",
      },
    });

    currentGroupY += 150; // Increment Y position for the next group
  });

  // Create endpoint nodes and edges from group to endpoint
  endpoints.forEach((endpoint) => {
    const endpointId = `endpoint-${endpoint.id}`;
    nodes.push({
      id: endpointId,
      type: "custom",
      position: { x: 400, y: groupPositions[endpoint.groupName] },
      data: { label: endpoint.pathUrl },
    });

    edges.push({
      id: `${endpoint.groupName}-${endpointId}`,
      source: `group-${endpoint.groupName}`,
      target: endpointId,
      targetPosition: Position.Left,
      sourcePosition: Position.Left,
      animated: true,

      style: {
        stroke: "#FF0077",
      },
    });

    // Move the next endpoint in this group down
    groupPositions[endpoint.groupName] += 50;
  });

  return { nodes, edges };
}

import { Position } from "reactflow";

export default function generateGraph(endpoints: any[]) {
  // Root node is constant
  const nodes = [
    {
      id: "root",
      type: "input",
      position: { x: 20, y: 100 },
      data: { label: "/ (Root)", id: 0 },
    },
  ];

  const edges: any = [];
  const groupPositions: any = {}; // To track the Y position of each group

  // Create group nodes and edges from root to group
  const groups = Array.from(new Set(endpoints.map((ep) => ep.groupName)));

  // Sort groups based on their lengths
  groups.sort((a, b) => {
    const lengthA = endpoints.filter((ep) => ep.groupName === a).length;
    const lengthB = endpoints.filter((ep) => ep.groupName === b).length;
    return lengthA - lengthB;
  });

  let currentGroupY = 10; // Initial Y position for the first group

  groups.forEach((group: number) => {
    const groupId = `group-${group}`;
    groupPositions[group] = currentGroupY;

    nodes.push({
      id: groupId,
      type: "custom",
      position: { x: 200, y: currentGroupY },
      data: { label: group.toString(), id: 0 },
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

    // Calculate the Y position for the next group based on the number of endpoints in the current group
    const endpointsInGroup = endpoints.filter((ep) => ep.groupName === group);
    currentGroupY += 40 + endpointsInGroup.length * 60; // Increment Y position for the next group
  });

  // Create endpoint nodes and edges from group to endpoint
  endpoints.forEach((endpoint) => {
    const endpointId = `endpoint-${endpoint.id}`;
    nodes.push({
      id: endpointId,
      type: "custom",
      position: { x: 500, y: groupPositions[endpoint.groupName] },
      data: { label: endpoint.pathUrl, id: endpoint.id },
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
    groupPositions[endpoint.groupName] += 60;
  });

  return { nodes, edges };
}

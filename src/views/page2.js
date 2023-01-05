import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  updateEdge,
  useReactFlow,
  Controls,
  Background,
  MarkerType,
} from 'reactflow';

import 'reactflow/dist/style.css';
import './updatenode.css';

const flowKey = 'example-flow';
var initNodeId = 0;
var initGateId = 0;
const getNodeId = () => `${initNodeId + 1}`;
const getGateId = () => `${initGateId + 1}`;

const initialNodes = [
  { id: 'e1', data: { label: 'Start' }, position: { x: 300, y: 37 }, type: 'input'},
];

const initialEdges = [];

const SaveRestore = () => {
  const edgeUpdateSuccessful = useRef(true);
  const { setViewport } = useReactFlow();
  const [rfInstance, setRfInstance] = useState(null);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [activeNode, setActiveNode] = useState();
  const [activeEdge, setActiveEdge] = useState();
  
  const [name, setName] = useState("");
  const [nameG, setNameG] = useState("");
  const [newName, setNewName] = useState("");
  const [newNameG, setNewNameG] = useState("");
  const [newNameE, setNewNameE] = useState("");

  function reid() {
    return (initNodeId = 0);
  }

  function idplus() {
    return (initNodeId += 1);
  }

  function greid() {
    return (initGateId = 0);
  }

  function gidplus() {
    return (initGateId += 1);
  }
  
  const onAdd = useCallback(() => {
    const newNode = {
      id: `a${getNodeId()}`,
      data: { label: `a${getNodeId()} - ${name}`  },
      position: {
        x: 0,
        y: 0 + (nodes.length + 1) * 50
      },
    };
    setNodes((nds) => nds.concat(newNode));
  //}, [setNodes]);
  });

  //To do
  const onAddGate = useCallback(() => {
    const newNode = {
      id: `g${getGateId()}`,
      data: { label: `g${getGateId()} - ${nameG}`  },
      position: {
        x: 0,
        y: 0 + (nodes.length + 1) * 50
      },
      style: {
        background: '#ff9900',
        color: 'white',
        width: 50,
        height: 50,
        fontSize: 5,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  //}, [setNodes]);
  });

  //const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const onConnect = (params: Connection | Edge) => setEdges((els) => {
    var edge: Edge = {
      //id: 'reactflow__edge-0-1',
      source: params.source ?? '',
      target: params.target ?? '',
      label: `${params.source} - ${params.target}`,
      type: 'straight', //default, straight, step, smoothstep
      markerEnd: {
        type: MarkerType.ArrowClosed,
      }
    };
    return addEdge(edge, els);
  });

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const x = 0, y = 0, zoom = 1 ;
    setNodes(nodes || []);
    setEdges(edges || []);
    setViewport({ x, y, zoom });
    setName('');
    setNameG('');
    setNewName('');
    setNewNameG('');
    setNewNameE('');
  }, [setNodes, setViewport]);

  //////////////////done///////////////////////
  useEffect(() => {
    if (activeNode) {
      setNewName(activeNode.data.label);
      setNewNameG(activeNode.data.label)
    }
  }, [activeNode]);

  useEffect(() => {
    if (activeEdge) setNewNameE(activeEdge.label);
  }, [activeEdge]);

  const onNodeDoubleClick = (e, node) => {
    console.log(node)
    setActiveNode(node);
    //console.log('current node: ', activeNode)
  };
  
  const onEdgeClick = (e, edge) => { 
    console.log(edge) 
    setActiveEdge(edge);
    //console.log('current edge: ', activeEdge)
  };

  const updateNodeHandler = () => {
    if (!activeNode) return;
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === activeNode.id) {
          node.data = {
            ...node.data,
            label: newName,
          };
        }
        return node;
      })
    );
  };

  const updateEdgeHandler = () => {
    if (!activeEdge) return;
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === activeEdge.id) {
          edge.label = newNameE
        };
        return edge;
      })
    );
  };

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  ////////////////////////////////////////
  // todo (maybe)
  // const onContextMenu = (e, node) => { console.log(node) }

  return (
    <ReactFlow
      onInit={setRfInstance}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}

      onEdgeUpdate={onEdgeUpdate}
      onEdgeUpdateStart={onEdgeUpdateStart}
      onEdgeUpdateEnd={onEdgeUpdateEnd}

      onNodeDoubleClick = {onNodeDoubleClick}
      onEdgeClick = {onEdgeClick}
      //fitView
      //connectionLineComponent={ConnectionLine}
      //nodeTypes={nodeTypes}
      //onNodeContextMenu={onContextMenu}
      //onNodeClick = {onNodeClick}
      //edgeTypes={edgeTypes}
    >
      <div className="save__controls">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Create New Event"
        />
        <button onClick={() => { onAdd(); idplus(); }}>Add Event</button>
        <br/><br/>
        <input
          value={nameG}
          onChange={(e) => setNameG(e.target.value)}
          type="text"
          placeholder="Create New Gate"
        />
        <button onClick={() => { onAddGate(); gidplus(); }}>Add Gate</button>
        <br/><br/>

        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          type="text"
          placeholder='Double Click to Edit'
        />
        <button type="button" onClick={updateNodeHandler}>Update Event/Gate</button>
        <br/><br/><br/><br/>
      
        <input
          value={newNameE}
          onChange={(e) => setNewNameE(e.target.value)}
          type="text"
          placeholder='Single Click Edge to Edit'
        />
        <button type="button" onClick={updateEdgeHandler}>
          Update Edge
        </button>
        <br/><br/>
        
        <button onClick={() => { onRestore(); reid(); greid(); }}>Restore</button>
        <button onClick={onSave}>Save</button>
      </div>
      <Controls />
      <Background />
    </ReactFlow>
  );
};

export default () => (
  <ReactFlowProvider>
    <SaveRestore />
  </ReactFlowProvider>
);
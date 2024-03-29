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

import Star from "../components/star";
import Sidebar from './sidebar';
import { nodeTypes } from "./nodes";

import API from '../apis/project2';
import 'reactflow/dist/style.css';
import './updatenode.css';
import { Button, Input, message } from 'antd';
import { Link } from 'react-router-dom';

const flowKey = 'saved-flow';

let e_id = 1;
let a_id = 1;
let g_id = 1;
const e_getId = () => `${e_id++}`;
const a_getId = () => `${a_id++}`;
const g_getId = () => `${g_id++}`;

const initialNodes = [
  //{ id: 'e1', data: { label: 'Start' }, position: { x: 123, y: 74 }, type: 'input'},
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
  const [newName, setNewName] = useState("");
  const [newNameE, setNewNameE] = useState("");
  const [result, setResult] = useState({ rating: 5, generated_text: null, input: null })

  const reset_ids = () => {
    e_id = 1;
    a_id = 1;
    g_id = 1;
  };

  //const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const onConnect = (params: Connection | Edge) => setEdges((els) => {
    var edge: Edge = {
      //id: 'reactflow__edge-0-1',
      source: params.source ?? '',
      target: params.target ?? '',
      //label: `${params.source} - ${params.target}`,
      label: '',
      type: 'straight', //default, straight, step, smoothstep
      markerEnd: {
        type: MarkerType.ArrowClosed,
      }
    };
    return addEdge(edge, els);
  });


  const onRestore = useCallback(() => {
    const x = 0, y = 0, zoom = 1;
    setNodes(nodes || []);
    setEdges(edges || []);
    setViewport({ x, y, zoom });
    setName('');
    setNewName('');
    setNewNameE('');
  }, [setNodes, setViewport]);

  //////////////////done///////////////////////
  useEffect(() => {
    if (activeNode && activeNode.type === 'default') {
      setNewName(activeNode.data.label);
    }
  }, [activeNode]);

  useEffect(() => {
    if (activeEdge) setNewNameE(activeEdge.label);
  }, [activeEdge]);

  const onNodeDoubleClick = (e, node) => {
    console.log("node: ", node)
    setActiveNode(node);
    //console.log('current node: ', activeNode)
  };

  const onEdgeClick = (e, edge) => {
    console.log("edge: ", edge)
    setActiveEdge(edge);
    //console.log('current edge: ', activeEdge)
  };

  const updateNodeHandler = () => {
    if (!activeNode) return;
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === activeNode.id && node.type === 'default') {
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

  ////////////////////////////////////////
  //Drag and drop/////////////////////////
  ////////////////////////////////////////
  const reactFlowWrapper = useRef(null);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      //console.log(type)
      var id = '';

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      else if (type === 'START' || type === 'END') {
        id = 'e' + e_getId();
      }

      else if (type === 'default') {
        id = 'a' + a_getId();
      }

      else if (type === 'AND' || type === 'OR' || type === 'XOR') {
        id = 'g' + g_getId();
      }

      const position = rfInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: id,
        type,
        position,
        data: { label: `${type}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [rfInstance]
  );

  useEffect(() => {
    const flow = localStorage.getItem(flowKey)
    if (!flow) {
      return;
    }
    try {
      const obj = JSON.parse(flow)
      console.log('obj', obj);
      setEdges(obj.edges);
      setNodes(obj.nodes)
    } catch (ex) {
      console.log('ex:', ex);
    }
  }, [])

  const handleSubmitRatingAndComment = async () => {
    const data = { ...result}
    console.log(data)
    await API.sendToComBack(data)
    setResult({ rating: 5, generated_text: null, input: null })
    alert('Submit success!')

  }

  const onSave = async () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      console.log('flow', flow);
      //localStorage.setItem(flowKey, JSON.stringify(flow));

      const data = {
        edges: flow.edges.map((p) => ({ source: p.source, target: p.target, label: p.label })),
        nodes: flow.nodes.map((p) => ({ id: p.id, type: p.type, data_label: p.data.label }))
      }
      message.open({
        key: "loadig",
        type: 'loading',
        content: 'Loading...',
        duration: 10000
      });
      const res = await API.sendToAlg(data);
      setResult({ ...res, rating: 5 });
      message.destroy();
    }
  };

  return (
    <div className='page2-body'>
      
      <div className="row py-0 align-center" style={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <div className="col-1" style={{ color: "#000", fontWeight: "bold", borderLeft: "4px solid #000", paddingLeft: "5px" }}>
          AI Model 2
        </div>
        <div className="col-0 px-3" style={{ backgroundColor: "#4444dd", borderRadius: 5, padding: "5px " }}>
          <Link to="/" style={{ color: "#fff" }}>Home</Link>
        </div>
        <div className="col-0" style={{ backgroundColor: "#9999dd", borderRadius: 5, padding: "5px ", marginLeft: 10 }}>
          <Link to="/page2" style={{ color: "#fff" }}>Page2</Link>
        </div>
      </div>
      
      <div
        style={{
          height: "55vh",
          width: "100%",
          border: "1px solid #4096ff",
        }}>

        <div className="dndflow">
          <ReactFlowProvider>
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
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

                onNodeDoubleClick={onNodeDoubleClick}
                onEdgeClick={onEdgeClick}

                onDrop={onDrop}
                onDragOver={onDragOver}


                //fitView
                //connectionLineComponent={ConnectionLine}
                nodeTypes={nodeTypes}
              //onNodeContextMenu={onContextMenu}
              //onNodeClick = {onNodeClick}
              //edgeTypes={edgeTypes}

              //connectionLineStyle={{ stroke: "black", strokeWidth: 10 }}
              >
                <div className="save__controls">
                  {/*
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
                */}
                  <Button onClick={() => { onRestore(); reset_ids(); }}>Restore</Button>
                  <Button type='primary' onClick={() => { onSave(); }}>Submit</Button>
                </div>
                <Controls />
                <Background />
              </ReactFlow>
            </div>
            <div className='aside'>

              <Sidebar />
              <div>
                <div style={{ display: "flex" }}>
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    type="text"
                    placeholder='Double Click Event to Edit'
                  />
                  <Button style={{ marginLeft: 10 }} type="primary" onClick={updateNodeHandler}>Update Event</Button>
                </div>
                <div style={{ display: "flex", marginTop: 10 }}>
                  <Input
                    value={newNameE}
                    onChange={(e) => setNewNameE(e.target.value)}
                    type="text"
                    placeholder='Single Click Edge to Edit'
                  />
                  <Button style={{ marginLeft: 10 }} type="primary" onClick={updateEdgeHandler}>
                    Update Edge
                  </Button>
                </div>

              </div>
            </div>
          
          </ReactFlowProvider>
        </div>
      </div>

      {
        result && result.generated_text &&
        <div className="rating-comment" style={{ marginTop: "30px" }}>
          <div className="row">
            <div className="col-1" style={{ fontSize: 14, lineHeight: "25px" }}>
              {result.generated_text}
            </div>
            <div className="col-0">
              <Star rating={result.rating || 5} onClick={(rating) => setResult({ ...result, rating })} />
            </div>
          </div>
          <div style={{ marginRight: "10px" }}>
            <textarea placeholder="Your comment" value={result.comment || ''} onChange={(e) => setResult({ ...result, comment: e.target.value })}></textarea>
          </div>
          <div className="py-2 text-center">
            <Button type="primary" onClick={ () => { handleSubmitRatingAndComment(); onRestore(); }}>Submit Rating and Comment</Button>
          </div>
        </div>
      }

    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <SaveRestore />
  </ReactFlowProvider>
);
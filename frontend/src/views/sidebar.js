import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane.</div>
      <div className="dndnode Start" onDragStart={(event) => onDragStart(event, 'START')} draggable>
        Start
      </div>

      <div className="dndnode End" onDragStart={(event) => onDragStart(event, 'END')} draggable>
        End
      </div>
      <br/><br/>

      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        New Event
      </div>
      <br/><br/>

      <div className="dndnode Gate" onDragStart={(event) => onDragStart(event, 'AND')} draggable>
        <div style={{ transform: "rotate(-45deg)" }}>AND</div>
      </div>

      <div className="dndnode Gate" onDragStart={(event) => onDragStart(event, 'OR')} draggable>
        <div style={{ transform: "rotate(-45deg)" }}>OR</div>
      </div>

      <div className="dndnode Gate" onDragStart={(event) => onDragStart(event, 'XOR')} draggable>
        <div style={{ transform: "rotate(-45deg)" }}>XOR</div>
      </div>

    </aside>
  );
};

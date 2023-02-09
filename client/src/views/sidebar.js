import { Button } from 'antd';
import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description" style={{ fontSize: 15 }}>
        This model will convert the business process flow to natural language texts.
        <br/><br/>
        You can drag these nodes to the pane.
      </div>
      <div className="dndnode Start" onDragStart={(event) => onDragStart(event, 'START')} draggable>
        Start
      </div>

      <div className="dndnode End" onDragStart={(event) => onDragStart(event, 'END')} draggable>
        End
      </div>
      <br /><br />


      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="dndnode Gate" style={{ marginRight: 20 }} onDragStart={(event) => onDragStart(event, 'AND')} draggable>
          <div style={{ transform: "rotate(-45deg)" }}>AND</div>
        </div>

        <div className="dndnode Gate" style={{ marginRight: 20 }} onDragStart={(event) => onDragStart(event, 'OR')} draggable>
          <div style={{ transform: "rotate(-45deg)" }}>OR</div>
        </div>

        <div className="dndnode Gate" onDragStart={(event) => onDragStart(event, 'XOR')} draggable>
          <div style={{ transform: "rotate(-45deg)" }}>XOR</div>
        </div>
      </div>

      <Button style={{ width: "100%", marginBottom: 20 }} onDragStart={(event) => onDragStart(event, 'default')} draggable>
        New Event
      </Button>

    </aside>
  );
};

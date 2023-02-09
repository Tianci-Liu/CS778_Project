import React from "react";
import { Handle } from "reactflow";

const Start = ({ data }) => {
  return (
    <div
      style={{
        backgroundColor: "#bbb",
        height: "30px",
        width: "30px",
        borderRadius: "50%",
        fontSize: "1px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Handle
        type="source"
        position="bottom"
        id={`${data.id}.bottom`}
        style={{ height: "5.5px", width: "5.5px", borderRadius: "50%", }}
      />

      <div id={data.id}>Start</div>
    </div>
  );
};

const End = ({ data }) => {
  return (
    <div
      style={{
        backgroundColor: "#bbb",
        height: "30px",
        width: "30px",
        borderRadius: "50%",
        fontSize: "1px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Handle
        type="target"
        position="top"
        id={`${data.id}.top`}
        style={{ height: "5.5px", width: "5.5px", borderRadius: "50%", }}
      />

      <div id={data.id}>End</div>
    </div>
  );
};

const Gate = ({ data }) => {
  return (
    <div
      style={{
        height: "30px",
        width: "30px",
        backgroundColor: "#bbb",
        transform: "rotate(45deg)",
        fontSize: "1px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* dot */}
      <Handle
        type="target"
        position="top"
        id={`${data.id}.top`}
        style={{  left: "0", height: "5.5px", width: "5.5px", borderRadius: "50%", }}
      />

    <Handle
        type="source"
        position="bottom"
        id={`${data.id}.right`}
        style={{ left: "100%", height: "5.5px", width: "5.5px", borderRadius: "50%", }}
      />

      <div style={{ transform: "rotate(-45deg)" }} id={data.id}>{data.label}</div>
    </div>
  );
};

export const nodeTypes = {
  AND: Gate,
  OR: Gate,
  XOR: Gate,
  START: Start,
  END: End,
};

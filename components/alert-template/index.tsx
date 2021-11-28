import React from "react";

const alertStyle = {
  justifyContent: "space-between",
  alignItems: "center",
  boxSizing: "border-box",
};

const buttonStyle = {
  marginLeft: "20px",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
};

type Props = {
  message: React.ReactNode; // eslint-disable-line @typescript-eslint/no-explicit-any
  options: any; //eslint-disable-line @typescript-eslint/no-explicit-any
  style: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  close: () => void;
};

const AlertTemplate: React.FC<Props> = ({ message, options, style, close }) => {
  return (
    <div
      style={{ ...alertStyle, ...style }}
      className={`rounded ${(() => {
        switch (options.type) {
          case "info": {
            return "bg-info text-dark";
          }
          case "success": {
            return "bg-success text-light";
          }
          case "error": {
            return "bg-danger text-light";
          }
          default: {
            return "bg-dark text-light";
          }
        }
      })()} p-3 shadow d-flex`}
    >
      {options.type === "info" && <i className="me-1 fas fa-info-circle"></i>}
      {options.type === "success" && (
        <i className="me-1 fas fa-check-circle"></i>
      )}
      {options.type === "error" && <i className="me-1 fas fa-times-circle"></i>}
      <span style={{ flex: 2 }}>{message}</span>
      <button
        className={options.type === "info" ? "text-dark" : "text-light"}
        onClick={close}
        style={buttonStyle}
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default AlertTemplate;

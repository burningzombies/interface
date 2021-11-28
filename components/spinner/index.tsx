import React from "react";

export const Spinner: React.FC<{ color?: string }> = ({
  color = "text-dark",
}) => {
  return (
    <div className={`spinner-border spinner-border-sm ${color}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

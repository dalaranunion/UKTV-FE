import React, { FC } from "react";

import "./errorMessage.css";

interface ErrorCardProps {
  error: string | null;
  parrentFn?: any;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ error, parrentFn }) => {
  function onClickHandler() {
    if (parrentFn) parrentFn();
  }
  return (
    error && (
      <div
        onClick={onClickHandler}
        className="error-card border-radius-4 pt-4 pb-4 pr-4 pl-4"
      >
        <h3 className="heading-sm bold">Beep-bee-boop</h3>
        <div className="mb-3">{error}</div>
        <small>Clicking will dismiss the message</small>
      </div>
    )
  );
};

export default ErrorCard;

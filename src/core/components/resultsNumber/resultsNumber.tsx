import React from "react";
import "./resultsNumber.css";

interface ResultsNumberProps {
  resultNum: number;
}

function ResultsNumber({ resultNum }: ResultsNumberProps) {
  return (
    <div className="results-number-wrap pt-1 pr-1 pb-1 pl-1 bold">
      <div className="results-number-count-title uppercase mb-1">Found results</div>
      <div className="results-number-count border-radius-1">{resultNum}</div>
    </div>
  );
}
export default ResultsNumber;

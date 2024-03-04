import React from "react";
import Card from "../card/card.tsx";

import "./iteratorGrid.css";

interface ResultsData {
  mainTitle: string;
  secondaryTitle: string;
  content: any[];
}
interface ResultsGridProps {
  resultData: ResultsData[];
}

function ResultsGrid({ resultData }: ResultsGridProps) {
  // If there are no results return nothing
  if (!resultData) return;

  return resultData.length ? (
    <div className="results-grid pt-2 pb-2 pr-2 pl-2">
      {resultData.map((item, iteration) => (
        <Card
          key={iteration}
          mainTitle={item.mainTitle}
          secondaryTitle={item.secondaryTitle}
          content={item.content}
        />
      ))}
    </div>
  ) : (
    <div className="results-message"> No reults passed </div>
  );
}
export default ResultsGrid;

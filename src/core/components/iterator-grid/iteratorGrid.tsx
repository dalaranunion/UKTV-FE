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
  console.log(resultData);
  // If there are no results return nothing
  if (!resultData) return;

  return (
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
  );
}
export default ResultsGrid;

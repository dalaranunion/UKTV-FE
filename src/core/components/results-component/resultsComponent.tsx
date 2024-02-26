import React, { useState } from "react";

import { ReactComponent as SortDown } from "../../../media/svg/sort-down-icon.svg";
import { ReactComponent as SortUp } from "../../../media/svg/sort-up-icon.svg";

// Import Components
import Buttons from "../buttons/buttons.tsx";
import ResultsNumber from "../resultsNumber/resultsNumber.tsx";
import IteratorGrid from "../iterator-grid/iteratorGrid.tsx";

import { comformData } from "../../js/dataComformer.ts";

import "./resultsComponent.css";

interface ResultsComponentProps {
  resultData: any[];
  classes?: string;
}

const ResultsComponent: React.FC<ResultsComponentProps> = ({ classes, resultData }) => {
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  if (!resultData) return null;

  resultData = comformData(resultData);

  function onClickHandler() {
    console.log("runs");
    setSortAscending((prevSortAscending) => !prevSortAscending); // Toggle sortAscending
    // ...
  }
  function sortBy(input: any[], ascending: boolean) {
    return input.sort((a, b) =>
      ascending
        ? a.mainTitle.toLowerCase().localeCompare(b.mainTitle.toLowerCase())
        : b.mainTitle.toLowerCase().localeCompare(a.mainTitle.toLowerCase())
    );
  }

  return (
    <section className="results-wrap contentwidth guttercontentwidthhalf pt-2 pb-2 border-radius-1">
      <header className="results-header">
        <ResultsNumber resultNum={resultData.length} />
        <div className="results-sortBy-wrap">
          <span className="heading-md bold">Sort by:</span>
          <Buttons
            parentClickFn={() => onClickHandler()}
            classes="ml-2 pl-1 pr-1"
            btnVersion="secondary"
            btnType="button"
            hideText={true}
            defaultState={0}
            states={[
              { Icon: SortDown, text: "Sort alphabeticaly ascending" },
              { Icon: SortUp, text: "Sort alphbeticaly descending" },
            ]}
          />
        </div>
      </header>
      <main className="results-area mt-2">
        <IteratorGrid resultData={sortBy(resultData, sortAscending)} />
      </main>
      <footer className="results-footer">
        <div className="footer-pagination-wrap">Pagination Here</div>
      </footer>
    </section>
  );
};

export default ResultsComponent;

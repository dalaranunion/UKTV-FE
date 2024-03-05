import React, { useEffect, useState } from "react";

// Import Components
import Buttons from "../buttons/buttons.tsx";
import ResultsNumber from "../resultsNumber/resultsNumber.tsx";
import { IteratorGrid, ResultsData } from "../iterator-grid/iteratorGrid.tsx";

// Import SVG icons as components
import { ReactComponent as SortDown } from "../../../media/svg/sort-down-icon.svg";
import { ReactComponent as SortUp } from "../../../media/svg/sort-up-icon.svg";

// Import CSS
import "./resultsComponent.css";

// Import Javascript modules
import { comformData } from "../../js/dataComformer.ts";
import { SwapiSchema } from "../../js/swapi-api.ts";

interface ResultsComponentProps {
  resultData: SwapiSchema;
  classes?: string | "";
}

const ResultsComponent: React.FC<ResultsComponentProps> = ({ classes, resultData }) => {
  const [results, setResults] = useState<string[]>([]);
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  const comformedData: any[] = comformData(resultData.results);

  useEffect(() => {
    initFn();
  }, []);

  function initFn() {
    setResults(comformedData);
  }

  function onClickHandler() {
    setSortAscending((prevSortAscending) => !prevSortAscending); // Toggle sortAscending
  }
  function sortBy(input: ResultsData[], ascending: boolean) {
    return input.sort((a, b) =>
      ascending
        ? a.mainTitle.toLowerCase().localeCompare(b.mainTitle.toLowerCase())
        : b.mainTitle.toLowerCase().localeCompare(a.mainTitle.toLowerCase())
    );
  }
  return resultData.count > 0 ? (
    <section
      className={
        "results-loaded results-wrap contentwidth guttercontentwidthhalf pt-2 pb-2 border-radius-1 " +
        classes
      }
    >
      <header className="results-header">
        <ResultsNumber resultNum={resultData.count} />
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
        <IteratorGrid data={sortBy(comformedData, sortAscending)} />
      </main>
      <footer className="results-footer">
        <div className="footer-pagination-wrap">Pagination Here</div>
      </footer>
    </section>
  ) : (
    <div>No results</div>
  );
};

export default ResultsComponent;

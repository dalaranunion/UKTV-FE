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
import { SwapiSchema, emptyObject, swapiCaller } from "../../js/swapi-api.ts";

interface ResultsComponentProps {
  resultData: SwapiSchema;
  classes?: string | "";
  resetState: boolean | null;
}
const ResultsComponent: React.FC<ResultsComponentProps> = ({
  classes,
  resultData,
  resetState,
}) => {
  console.log("Original data: ", resultData);
  const [results, setResults] = useState<SwapiSchema>(emptyObject);
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  console.log("re-render: ", results);
  const comformedData: any[] = comformData(results.results);

  useEffect(() => {
    console.log("RUN INIT");
    initFn();
  }, []);

  function initFn() {
    console.log("function run");
    setResults(resultData);
  }

  const ResultsPagination: React.FC<{
    prevURL: string | null;
    nextURL: string | null;
  }> = ({ prevURL, nextURL }) => {
    console.log(prevURL, nextURL);

    async function onClickHandlerPagination(page: string) {
      try {
        const data = await swapiCaller(page);
        setResults(data);
      } catch (error) {
        throw Error(error);
      }
    }
    return (
      nextURL && (
        <div className="footer-pagination-wrap">
          {prevURL ? (
            <Buttons
              parentClickFn={() => onClickHandlerPagination(prevURL)}
              defaultState={0}
              hideText={false}
              btnVersion="secondary"
              btnType="button"
              states={[{ text: "Previous" }]}
            />
          ) : null}
          {nextURL ? (
            <Buttons
              parentClickFn={() => onClickHandlerPagination(nextURL)}
              defaultState={0}
              hideText={false}
              btnVersion="secondary"
              btnType="button"
              states={[{ text: "Next" }]}
            />
          ) : null}
        </div>
      )
    );
  };
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
        <ResultsNumber resultNum={results.count} />
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
        {results.next || results.previous ? (
          <ResultsPagination prevURL={results.previous} nextURL={results.next} />
        ) : null}
      </footer>
    </section>
  ) : null;
};

export default ResultsComponent;

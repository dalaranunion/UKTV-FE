import { ReactComponent as Logo } from "./media/svg/logo.svg";
import { useState } from "react";
import "./App.css";

// Import SVG icons
import { ReactComponent as SearchIcon } from "./media/svg/search-icon.svg";
import { ReactComponent as Robot } from "./media/svg/rd-r2-small.svg";

// Import Components
import Buttons from "./core/components/buttons/buttons.tsx";
import ResultsComponent from "./core/components/results-component/resultsComponent.tsx";
import ErrorCard from "./core/components/errorMessage/errorMessage.tsx";

// Import JS files
import "./core/js/space-animation.js";

// This is used to fetch the data
import {
  fetchData,
  emptyObject,
  searchCategories,
} from "./core/js/swapi-api.ts";

function App() {
  const [searchString, setSearchString] = useState("");
  const [searchType, setSearchType] = useState("");

  const [apiResults, setApiResults] = useState(emptyObject);
  const [errorMessage, setErrorMessage] = useState("");

  // This is the searchform componen
  function SearchForm() {
    async function onSubmitHandler(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const queryString = formData.get("searchString");
      const queryCategory = formData.get("searchType");

      if (queryCategory == searchType && queryString == searchString) {
        return null;
      }
      setApiResults(emptyObject);
      setSearchString(queryString);
      setSearchType(queryCategory);

      try {
        // Perform search using searchString and searchType
        const data = await fetchData(queryString, queryCategory);
        setApiResults(data);
      } catch (error) {
        console.log("Errors");
        setErrorMessage(error);
      }
      // The animations are done by adding/remove classes in the <body> element
      if (formData.get("searchString")) {
        document.body.classList.add("search-active");
      } else document.body.classList.remove("search-active");
    }

    return (
      <form
        className="searchbox-form pt-2 pr-2 pl-2 pb-2"
        onSubmit={onSubmitHandler}
      >
        <select
          className="searchbox-select mr-2"
          name="searchType"
          required={true}
          defaultValue={"" || searchType}
        >
          <option disabled value="">
            Select category
          </option>
          {searchCategories.map((cat, iteration) => (
            <option key={iteration} value={cat}>
              {cat[0].toLocaleUpperCase("UK-en") + cat.substring(1)}
            </option>
          ))}
        </select>
        {/* 
          * Disabled due to swapi being down
          *
        <input
          className="searchbox-input"
          name="searchString"
          type="text"
          defaultValue={searchString}
          placeholder="Leave it blank, or query per category..."
        ></input> */}
        <Buttons
          classes="ml-2 searchbox-btn"
          btnVersion="main"
          btnType="submit"
          hideText={false}
          states={[{ Icon: Robot, text: "Go" }]}
        ></Buttons>
      </form>
    );
  }

  return (
    <div id="star-wars-app" className={searchType ? "search-active" : ""}>
      <header id="page-header" className="guttercontentwidth contentwidth">
        <Logo id="star-wars-logo" />
        <h1 className="mt-1 heading-xl heading-font"> API search</h1>
      </header>
      <main>
        <div className="search-wrap contentwidthnarrow">
          <h2 className="heading-sm medium search-title mb-3">
            May the "response: 200 OK" be with you
          </h2>
          <SearchForm />
        </div>

        {apiResults.count ? (
          <ResultsComponent resetState={true} resultData={apiResults} />
        ) : null}
      </main>
      <ErrorCard
        parrentFn={() => {
          setErrorMessage("");
        }}
        error={errorMessage.toString()}
      />
    </div>
  );
}

export default App;

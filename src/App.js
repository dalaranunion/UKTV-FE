import { ReactComponent as Logo } from "./media/svg/logo.svg";
import { useEffect, useState } from "react";
import "./App.css";

// Import SVG icons
import { ReactComponent as SearchIcon } from "./media/svg/search-icon.svg";

// Import Components
import Buttons from "./core/components/buttons/buttons.tsx";
import ResultsComponent from "./core/components/results-component/resultsComponent.tsx";
import ErrorCard from "./core/components/errorMessage/errorMessage.tsx";

// Import JS files
import "./core/js/space-animation.js";

// This is used to fetch the data
import {
  swapiCaller,
  fetchData,
  emptyObject,
  searchCategories,
} from "./core/js/swapi-api.ts";

function App() {
  const backupAPI =
    "https://gist.githubusercontent.com/dotspencer/10f9e59cbccfd7b12b9a663a56c41f92/raw/23b07f651ca2d09f37260c71ad30a925057bc4e5/people-page-1.json";

  const [searchString, setSearchString] = useState("");
  const [searchType, setSearchType] = useState("category");
  const [apiResults, setApiResults] = useState(emptyObject);
  const [errorMessage, setErrorMessage] = useState("");

  // This is the searchform componen
  function SearchForm() {
    async function onSubmitHandler(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      // Set the search terms in the state, then useEffect will take over
      setSearchString(formData.get("searchString"));
      setSearchType(formData.get("searchType"));

      try {
        // Perform search using searchString and searchType
        const data = await fetchData(
          formData.get("searchString"),
          formData.get("searchType")
        );
        setApiResults(data);
      } catch (error) {
        console.log("Errors");
        setErrorMessage(error);
        console.log("Using fallback data");
        const data = await swapiCaller(backupAPI);
        setApiResults(data);
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
        <input
          required={true}
          className="searchbox-input"
          name="searchString"
          minLength="2"
          type="text"
          defaultValue={searchString}
          placeholder="Find Vehicles, Films, or Spacecrafts..."
        ></input>
        <select className="searchbox-select" name="searchType" required={true}>
          <option defaultValue={true} value="category">
            Category
          </option>
          {searchCategories.map((cat, iteration) => (
            <option key={iteration} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <Buttons
          classes="ml-2 searchbox-btn"
          btnVersion="main"
          btnType="submit"
          hideText={false}
          states={[{ Icon: SearchIcon, text: "search" }]}
        ></Buttons>
      </form>
    );
  }

  return (
    <div id="star-wars-app">
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

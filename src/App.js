import { ReactComponent as Logo } from "./media/svg/logo.svg";
import { useState } from "react";
import "./App.css";

// Import SVG icons
import { ReactComponent as SearchIcon } from "./media/svg/search-icon.svg";

// Import Components
import Buttons from "./core/components/buttons/buttons.tsx";
import ResultsComponent from "./core/components/results-component/resultsComponent.tsx";

// Import JS files
// This is for the animation
import "./core/js/space-animation.js";
// This is used to fetch the data
import { fetchData, searchCategories } from "./core/js/swapi-api.ts";

function App() {
  const [searchActive, setSearchActive] = useState(false);
  const [resultData, setResultsData] = useState(null);

  // The animations are done by adding/remove classes in the <body> element
  if (searchActive) {
    document.body.classList.add("search-active");
  } else document.body.classList.remove("search-active");

  // This is the searchform component
  function SearchForm() {
    // When search button is hit
    function onSubmitHandler(event) {
      event.preventDefault();
      const formData = new FormData(event.target);

      async function pullData() {
        const data = await fetchData(
          formData.get("searchString"),
          formData.get("searchType")
        );
        setResultsData(data);
        console.log("set results");
        return data.length ? true : false;
      }

      if (!pullData()) {
        console.log(
          "Wrong search terms, search starships or films or vehicles"
        );
        setSearchActive(false);
      } else setSearchActive(true);
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
        <div className="search-wrap contentwidthhalf">
          <h2 className="heading-sm medium search-title mb-3">
            May the "response: 200 OK" be with you
          </h2>
          <SearchForm />
        </div>
        <ResultsComponent resultData={resultData} />
      </main>
    </div>
  );
}

export default App;

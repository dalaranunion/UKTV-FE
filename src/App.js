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
import fetchData from "./core/js/swapi-api.ts";

function App() {
  const [searchActive, setSearchActive] = useState(false);
  const [resultsLoaded, setResultsLoaded] = useState(false);
  const [resultData, setResultsData] = useState(null);

  // The animations are done by adding/remove classes in the <body> element
  if (searchActive) {
    document.body.classList.add("search-active");
  } else document.body.classList.remove("search-active");
  if (resultsLoaded) {
    document.body.classList.add("results-loaded");
  } else document.body.classList.remove("results-loaded");

  function fetchDataStartHandler(event) {
    // Once fetching the data starts then hide the logo and begin animation
    setSearchActive(true);
    if (resultsLoaded) setResultsLoaded(false);
  }
  function fetchDataDoneHandler(event) {
    // Once fetching is complete then finish animation and load results
    setResultsData(event.detail.data);
    setResultsLoaded(true);
    // Everything starts from this function here
    console.log(event);
  }

  window.addEventListener("fetchDataStart", fetchDataStartHandler);
  window.addEventListener("fetchDataDone", fetchDataDoneHandler);

  // This is the searchform component
  function SearchForm() {
    function onSubmitHandler(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = fetchData(formData.get("searchtext"));
      // This was meant to be a message to the user to give specific search terms
      // But was out of time
      if (!data.length) console.log("Wrong search terms");
    }
    return (
      <form className="searchbox-form pt-2 pr-2 pl-2 pb-2" onSubmit={onSubmitHandler}>
        <input
          required={true}
          className="searchbox-input"
          name="searchtext"
          minLength="2"
          type="text"
          placeholder="Find Vehicles, Films, or Spacecrafts..."
        ></input>
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

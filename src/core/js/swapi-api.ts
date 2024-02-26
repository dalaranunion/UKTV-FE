type Result = string[];

const fetchData = async (searchTerm: string): Promise<Result[]> => {
  // Lowercase any input to avoid casing issues
  searchTerm = searchTerm.toLocaleLowerCase();

  // The searchterms which are allowed are the below if they wont match nothing returns
  const searchTypes = ["starships", "films", "vehicles"];
  if (!searchTypes.includes(searchTerm)) return [];

  const baseUrl = "https://swapi.dev/api/";
  const endpoint = searchTerm;

  // Using events to understand when the fetch request starts
  // Supose the API takes time to reply we show some animation
  // Once it happens animation plays and the warp effect begins
  // Added a setTimeout because the data fetching is blazing fast
  setTimeout(function () {
    dispatchEvent(
      new CustomEvent("fetchDataStart", { detail: { searchTerm: searchTerm } })
    );
  }, 200);

  try {
    const response = await fetch(`${baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();

    const dataResults = data.results as Result[];
    // Once the data fetch is done then dispatch even with the data
    // I felt its better to dispatch an event and access the data
    // as it is more Reactive. Added some timeout here too.
    setTimeout(function () {
      dispatchEvent(
        new CustomEvent("fetchDataDone", {
          detail: { searchTerm: searchTerm, data: dataResults },
        })
      );
    }, 4000);

    return dataResults;
  } catch (error) {
    // Ideally errors should display under the searchform.
    console.error("Error:", error);
    throw new Error("Failed to fetch data.");
  }
};

export default fetchData;

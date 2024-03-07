interface FinalSpaceSchema {
  count: number | 0;
  next: string | null;
  previous: string | null;
  results: string[] | [];
}

const emptyObject: FinalSpaceSchema = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};
// Main API URL
const baseUrl = "https://finalspaceapi.com/api/v0/";

// Categories API has available extra "category" is used when searching vehicles/people/etc
const searchCategories: string[] = ["character", "episode", "location", "quote"];

function validSearch(input: string) {
  return searchCategories.includes(input);
}

const fetchData = async (
  searchString: string,
  searchType: string
): Promise<FinalSpaceSchema> => {
  // Lowercase any input to avoid casing issues
  searchString = searchString.toLocaleLowerCase().trim();
  searchType = searchType.toLocaleLowerCase();

  let endpoint = "";

  // Check if this is category people,vehicles,etc and if the requested category exists
  if (searchType === "category" && validSearch(searchString)) {
    endpoint = searchString;
  }

  // Check if the searchtype is not a category
  if (searchType !== "category" && validSearch(searchType)) {
    endpoint = `${searchType}/?search=${searchString}`;
  }

  if (!endpoint) return emptyObject;
  const data = await swapiCaller(`${baseUrl}${endpoint}`);

  // Returns empty data if there is no data
  return data ? data : emptyObject;
};

const swapiCaller = async (getRequest: string): Promise<FinalSpaceSchema> => {
  const animation = window.myJump;
  if (!animation) {
    // check if the animation exists in the Window object
    console.error("Jump animation does not exist");
  }
  try {
    // The request is started make warp animation
    animation.initiate();
    const response = await fetch(getRequest);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();

    // Once the data is fetched then complete the animation
    setTimeout(function () {
      animation.enter();
    }, 2000);

    return data as FinalSpaceSchema;
  } catch (error) {
    // Ideally errors should display under the searchform.
    console.error("Error:", error);
    throw new Error("Failed to fetch data.");
  }
};

export { fetchData, swapiCaller, FinalSpaceSchema, emptyObject, searchCategories };

export default fetchData;
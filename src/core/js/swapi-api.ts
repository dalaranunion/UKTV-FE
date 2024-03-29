interface ApiResponseSchema {
  count: number | 0;
  next: string | null;
  previous: string | null;
  results: string[] | [];
}

const emptyObject: ApiResponseSchema = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};
// Main API URL
export const baseUrl = "https://swapi.dev";
// export const baseUrl = "https://swapi-node.now.sh";

// Categories API has available extra "category" is used when searching vehicles/people/etc
const searchCategories: string[] = [
  "starships",
  "films",
  "vehicles",
  "people",
  "planets",
  "species",
];

function validSearch(input: string) {
  return searchCategories.includes(input);
}

const fetchData = async (
  searchString: string | null,
  searchType: string
): Promise<ApiResponseSchema> => {
  // Lowercase any input to avoid casing issues

  if (searchString) searchString = searchString.toLocaleLowerCase().trim();
  searchType = searchType.toLocaleLowerCase();

  let endpoint = "";

  // Check if this is category people,vehicles,etc and if the requested category exists
  if (validSearch(searchType)) {
    endpoint = `/api/${searchType}`;
  }

  // Check if the searchtype is not a category
  if (searchString && validSearch(searchType)) {
    endpoint = `/api/${searchType}/?search=${searchString}`;
  }

  if (!endpoint) return emptyObject;
  try {
    const data = await swapiCaller(`${baseUrl}${endpoint}`);
    return data ? data : emptyObject;
  } catch (error) {
    throw Error(error);
  }

  // Returns empty data if there is no data
};

const swapiCaller = async (getRequest: string): Promise<ApiResponseSchema> => {
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
      throw Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();

    // Once the data is fetched then complete the animation
    setTimeout(function () {
      animation.enter();
    }, 2000);

    // THIS TO FIX THE RETURNED DATA
    // const newData = data.results.map((a, iteration) => {
    //   const fields = a.fields;
    //   delete a.fields;
    //   return fields;
    // });
    // data.results = newData;
    // END TEMP FIX

    return data as ApiResponseSchema;
  } catch (error) {
    setTimeout(function () {
      animation.enter();
    }, 2000);
    throw Error(error);
  }
};

export { fetchData, swapiCaller, ApiResponseSchema, emptyObject, searchCategories };

export default fetchData;

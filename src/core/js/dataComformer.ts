interface ContentPickerType {
  [key: string]: string;
}
interface TitlePickerType {
  mainTitle: string[];
  secondaryTitle: string[];
}
interface ContentType {
  title: string;
  text: string;
}
interface ComfortedObjectType {
  mainTitle: string;
  secondaryTitle: string;
  content: ContentType[];
}
type dataInputType = any[] | undefined;

export function comformData(dataInput: dataInputType[]) {
  const titlePickers: TitlePickerType = {
    mainTitle: ["name", "title"],
    secondaryTitle: ["director", "model"],
  };
  const contentPicker: ContentPickerType = {
    manufacturer: "Manufacturer",
    cost_in_credits: "Cost In Credits",
    length: "Length",
    crew: "Crew",
    passengers: "Passengers",
    cargo_capacity: "Cargo capacity",
    episode_id: "Episode Number",
    producer: "Producer",
    release_date: "Release Date",
    opening_crawl: "Opening Crawl",
  };
  const contentKeys: string[] = Object.keys(contentPicker);

  // Create a new array that will store the comforted data
  const newArray: object[] = [];

  for (let i = 0; i < dataInput.length; i++) {
    const item = dataInput[i];
    // Build the shadow object
    const newObj: ComfortedObjectType = {
      mainTitle: "",
      secondaryTitle: "",
      content: [],
    };
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        const itemText: string = item[key];

        const mainTitleIndex = titlePickers.mainTitle.indexOf(key);
        if (mainTitleIndex > -1) {
          newObj.mainTitle = itemText;
        }
        const secondaryTitleIndex = titlePickers.secondaryTitle.indexOf(key);
        if (secondaryTitleIndex > -1) {
          newObj.secondaryTitle = itemText;
        }
        if (contentKeys.includes(key)) {
          newObj.content.push({ title: contentPicker[key], text: itemText });
        }
      }
    }
    newArray.push(newObj);
  }
  return newArray;
}

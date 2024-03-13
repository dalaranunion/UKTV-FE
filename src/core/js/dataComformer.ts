interface ContentPickerType {
  [key: string]: string;
}
interface TitlePicker {
  mainTitle: string[];
  secondaryTitle: string[];
}
interface ContentType {
  title: string;
  text: string;
}
interface ComfortedSchema {
  mainTitle: string;
  secondaryTitle: string;
  content: ContentType[];
}
type dataInput = string[];

export function comformData(dataInput: dataInput) {
  const titlePickers: TitlePicker = {
    mainTitle: ["name", "title", "starship_class"],
    secondaryTitle: ["director", "model", "classification"],
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
    MGLT: "MGLT",
    hyperdrive_rating: "Hyperdrive rating",
    designation: "Designation",
    language: "Language",
    average_height: "Average height",
    eye_colors: "Eye colour",
    skin_colors: "Skin colour",
    hair_colors: "blonde, brown, black, red",
    average_lifespan: "Average lifespan",
  };
  const contentKeys: string[] = Object.keys(contentPicker);

  // Create a new array that will store the comforted data
  const newArray: object[] = [];

  for (let i = 0; i < dataInput.length; i++) {
    const item: any = dataInput[i];
    // Build the shadow object
    const newObj: ComfortedSchema = {
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
  return newArray as ComfortedSchema[];
}

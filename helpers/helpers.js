export const truncateString = (str, num) => {
  const arr = str.split(" ");
  if (arr.length <= num) {
    return str;
  }
  return `${arr.slice(0, num).join(" ")}...`;
};

export const ratingPercent = (num) => {
  return `${Math.round((num / 10) * 100)}%`;
};

export const generateKey = (index, id) => {
  return `${index}_${id}`;
};

const getDate = (date = null) => {
  if (!date) return undefined;
  const formattedDate = new Date(date);
  const d = `${
    formattedDate.getMonth() > 8
      ? formattedDate.getMonth() + 1
      : `0${formattedDate.getMonth() + 1}`
  }/${
    formattedDate.getDate() > 9
      ? formattedDate.getDate() + 1
      : `0${formattedDate.getDate() + 1}`
  }/${formattedDate.getFullYear()}`;
  return d.toString() === "0NaN/0NaN/NaN" ? date : d.toString();
};

export const normalizeRes = (data) => {
  let newData = data;
  if (data.results) {
    newData.results = data.results.map((obj) => normalizeKeys(obj));
  } else {
    newData = normalizeKeys(data);
  }
  return newData;
};

const normalizeKeys = (obj) => {
  return Object.keys(obj).reduce((newObj, key) => {
    let newKey;
    let currentObj = obj[key];
    switch (key) {
      case "title": {
        newKey = "name";
        break;
      }
      case "profile_path":
      case "backdrop_path":
      case "poster_path": {
        newKey = key.split("_")[0];
        break;
      }
      case "release_date":
      case "first_air_date": {
        newKey = "released";
        currentObj = getDate(obj[key]);
        break;
      }
      case "vote_average": {
        newKey = "rating";
        currentObj = ratingPercent(obj[key]);
        break;
      }
      case "media_type": {
        newKey = "type";
        break;
      }
      case "created_by": {
        newKey = "creators";
        break;
      }
      case "last_episode_to_air":
      case "next_episode_to_air": {
        newKey = `${key.split("_")[0]}_episode`;
        currentObj = getDate(obj[key]);
        break;
      }
      case "seasons": {
        newKey = key;
        currentObj = obj[key].map((row) => normalizeKeys(row));
        break;
      }
      case "biography": {
        newKey = "overview";
        break;
      }
      case "place_of_birth": {
        newKey = "birthplace";
        break;
      }
      case "belongs_to_collection": {
        newKey = "collection";
        break;
      }
      case "birthday":
      case "deathday": {
        newKey = key;
        currentObj = getDate(obj[key]);
        break;
      }
      case "similar": {
        newKey = key;
        currentObj = obj[key].results.map((row) => normalizeKeys(row));
        break;
      }
      case "parts": {
        newKey = key;
        currentObj = obj[key].map((row) => normalizeKeys(row));
        break;
      }
      case "combined_credits": {
        newKey = key;
        currentObj = Object.keys(obj[key]).reduce((newCreditObj, creditKey) => {
          newCreditObj[creditKey] = obj[key][creditKey].map((row) =>
            normalizeKeys(row)
          );
          return newCreditObj;
        }, {});
        break;
      }
      default: {
        newKey = key;
        break;
      }
    }
    newObj[newKey] = currentObj;
    return newObj;
  }, {});
};

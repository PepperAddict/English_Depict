export const vocab = e => {
  const firstLetter = e.charAt(0).toUpperCase();
  const capVocab = e.toUpperCase();

  try {
    const path = require(`./D${firstLetter}.json`);
    //turn the definition into arrays
    const definition = path[capVocab].MEANINGS;
    const defarray = Object.values(definition);
    return defarray;
  } catch {
    return null;
  }
};

export const listCheck = e => {
  const firstLetter = e.charAt(0).toUpperCase();
  const capVocab = e.toUpperCase();

  try {
    const path = require(`./D${firstLetter}.json`);
    //turn the definition into arrays

    const definition = path;
    const defarray = Object.keys(definition);
    const regex = new RegExp("^" + capVocab + ".*$");
    if (capVocab.length > 2) {
      let newarray = new Array();
      for (let each of defarray) {
        if (each.match(regex)) {
          each = each.toLowerCase();
          each = each.charAt(0).toUpperCase() + each.slice(1)
          newarray.push(each)
        }
      }
      return newarray.slice(0, 5)
    }
  } catch {
    console.log("none");
  }
};

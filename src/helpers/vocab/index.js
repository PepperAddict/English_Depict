export const vocab = e => {
  const firstLetter = e.charAt(0).toUpperCase();
  const capVocab = e.toUpperCase();

  try {
    const path = require(`./D${firstLetter}.json`);
    //turn the definition into arrays 
    const definition = path[capVocab].MEANINGS 
    const defarray = Object.values(definition)
    return defarray
  } catch {
      return null
  }

};

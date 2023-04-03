// function to remove stop words from the text
export function removeStopWords(text: string): string[] {
  //remove white spaces
  text = text.replace(/\s+/g, ' ').trim();
  const stopWords = [
    'a',
    'an',
    'and',
    'are',
    'as',
    'at',
    'be',
    'but',
    'by',
    'for',
    'if',
    'in',
    'into',
    'is',
    'it',
    'no',
    'not',
    'of',
    'on',
    'or',
    'such',
    'that',
    'the',
    'their',
    'then',
    'there',
    'these',
    'they',
    'this',
    'to',
    'was',
    'will',
    'with',
  ];
  // const inputWords = text.split(' ');
  // const filteredWords = inputWords.filter((word) => !stopWords.includes(word));
  // return filteredWords;

  // split the text into words but ignore words inside quotes
  const inputWords = text.match(/(?:[^\s"]+|"[^"]*")+/g);
  const filteredWords = inputWords.filter((word) => !stopWords.includes(word));
  return filteredWords;

}

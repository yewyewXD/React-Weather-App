export function getWikiContent(wikiResponse) {
  const wikiPageId = Object.keys(wikiResponse.data.query.pages)[0];
  const wikiContent = wikiResponse.data.query.pages[wikiPageId].extract;
  let trimmedContent = "";
  let level = 0;
  for (var index = 0; index < wikiContent.length; index++) {
    var character = wikiContent.charAt(index);
    if (character === "(") level++;

    if (level === 0) trimmedContent += character;

    if (character === ")") level--;
  }

  const cleanContent = trimmedContent.replace(/\s{2,}/g, " ");
  const secondPeriodIndex = cleanContent.split(".", 2).join(".").length;
  const shortenedContent = cleanContent.substr(0, secondPeriodIndex + 1);
  return shortenedContent;
}

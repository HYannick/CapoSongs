const {
  Scraper,
  Root,
  OpenLinks,
  CollectContent,
} = require("nodejs-web-scraper");
const fs = require("fs");

(async () => {
  const config = {
    baseSiteUrl: `https://www.lalaue.com/capoeira-music`,
    startUrl: `https://www.lalaue.com/capoeira-music`,
    filePath: "./data/",
    concurrency: 10, //Maximum concurrent jobs. More than 10 is not recommended.Default is 3.
    maxRetries: 3, //The scraper will try to repeat a failed request few times(excluding 404). Default is 5.
    logPath: "./logs/", //Highly recommended: Creates a friendly JSON for each operation object, with all the relevant data.
  };

  const scraper = new Scraper(config); //Create a new Scraper instance, and pass config to it.

  //Now we create the "operations" we need:

  const root = new Root(); //The root object fetches the startUrl, and starts the process.

  //Any valid cheerio-advanced-selectors selector can be passed. For further reference: https://cheerio.js.org/
  const article = new OpenLinks(".card.beige .btn.btn-warning.mr-1", { name: "article" }); //Opens each article page.
  const title = new CollectContent("h1", { name: "title" });
  const category = new CollectContent("h5", { name: "type" }); //"Collects" the text from each H1
  const story = new CollectContent(".card.border-dark.mb-3 p", {
    name: "story",
  });
  const lyrics = new CollectContent(".ml-2.mx-md-4 .h5", { name: "lyrics" });
  const translations = new CollectContent(".ml-2.mx-md-4 i", {
    name: "translations",
  });
  root.addOperation(article)
  article.addOperation(title);
  article.addOperation(category);
  article.addOperation(story);
  article.addOperation(lyrics);
  article.addOperation(translations);

  await scraper.scrape(root);

  const articles = root.getData(); //Will return an array of all article objects(from all

  const sanitizedArticles = articles.data[0].data.map(song => {
    const scrapped = song.data.reduce((acc, curr) => {
      acc[curr.name] = curr.data;
      return acc;
    }, {});
    return {
      title: scrapped.title[0],
      category: scrapped.type[0] && scrapped.type[0].split("Category: ")[1],
      description: scrapped.type[1] && scrapped.type[1].split("Author: ")[1],
      story: scrapped.story[0],
      lyrics: scrapped.lyrics.join("\n"),
      source: scrapped.source,
      translations: scrapped.lyrics
        .reduce((acc, curr, i) => {
          acc.push(...[curr, scrapped.translations[i]]);
          return acc;
        }, [])
        .join("\n"),
    };
  })


  // categories), each
  //containing its "children"(titles,stories and the downloaded image urls)

  // //If you just want to get the stories, do the same with the "story" variable:

  fs.writeFile("./articles.json", JSON.stringify(sanitizedArticles), () => {}); //Will produce a formatted JSON containing all article pages and their selected data.
})();

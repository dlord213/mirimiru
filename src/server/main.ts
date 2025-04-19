import express from "express";
import ViteExpress from "vite-express";
import axios from "axios";
import * as cheerio from "cheerio";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/api/manganato/get-latest-manga", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://www.natomanga.com/manga-list/latest-manga?page=${req.query.page || "1"}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
          Referer: "https://www.natomanga.com/",
          "Accept-Language": "en-US,en;q=0.9",
        },
      },
    );
    const $ = cheerio.load(data);

    const mangas: {
      title: string;
      mangaUrl: string | undefined;
      imageUrl: string | undefined;
      latestChapter: string;
      chapterUrl: string | undefined;
      views: string;
      description: string;
    }[] = [];

    $(".list-truyen-item-wrap").each((i, el) => {
      const title = $(el).find("h3 a").text().trim();
      const mangaUrl = $(el)
        .find("a.list-story-item")
        .attr("href")
        ?.split("/")
        .pop();
      const imageUrl = $(el).find("img").attr("src");
      const latestChapter = $(el)
        .find("a.list-story-item-wrap-chapter")
        .text()
        .trim();
      const chapterUrl = $(el)
        .find("a.list-story-item-wrap-chapter")
        .attr("href");
      const views = $(el).find(".aye_icon").text().trim();
      const description = $(el).find("p").text().trim();

      mangas.push({
        title,
        mangaUrl,
        imageUrl,
        latestChapter,
        chapterUrl,
        views,
        description,
      });
    });

    res.send({ status: 200, mangas: mangas });
  } catch (err) {
    res.send({ status: 400, error: err });
  }
});

app.get("/api/manganato/get-hottest-manga", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://www.natomanga.com/manga-list/hot-manga?page=${req.query.page || "1"}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
          Referer: "https://www.natomanga.com/",
          "Accept-Language": "en-US,en;q=0.9",
        },
      },
    );
    const $ = cheerio.load(data);

    const mangas: {
      title: string;
      mangaUrl: string | undefined;
      imageUrl: string | undefined;
      latestChapter: string;
      chapterUrl: string | undefined;
      views: string;
      description: string;
    }[] = [];

    $(".list-truyen-item-wrap").each((i, el) => {
      const title = $(el).find("h3 a").text().trim();
      const mangaUrl = $(el)
        .find("a.list-story-item")
        .attr("href")
        ?.split("/")
        .pop();
      const imageUrl = $(el).find("img").attr("src");
      const latestChapter = $(el)
        .find("a.list-story-item-wrap-chapter")
        .text()
        .trim();
      const chapterUrl = $(el)
        .find("a.list-story-item-wrap-chapter")
        .attr("href");
      const views = $(el).find(".aye_icon").text().trim();
      const description = $(el).find("p").text().trim();

      mangas.push({
        title,
        mangaUrl,
        imageUrl,
        latestChapter,
        chapterUrl,
        views,
        description,
      });
    });

    res.send({ status: 200, mangas: mangas });
  } catch (err) {
    res.send({ status: 400, error: err });
  }
});

app.get("/api/manganato/get-latest-manga-releases", async (req, res) => {
  try {
    const { data } = await axios.get(`https://www.natomanga.com/`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        Referer: "https://www.natomanga.com/",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    const $ = cheerio.load(data);

    const new_releases: {}[] = [];

    $(".itemupdate.first").each((i, el) => {
      const element = $(el);

      // Title
      const title = element.find("h3 a").first().text().trim();
      const mangaUrl = element
        .find("h3 a")
        .first()
        .attr("href")
        ?.split("/")
        .pop();

      // Image URL
      const imageUrl = element.find("img").attr("src");

      // Latest chapters
      const chapters: { title: string; url: string }[] = [];

      element.find("ul li").each((i, li) => {
        const chapterLink = $(li).find("a.sts");
        if (chapterLink.length) {
          chapters.push({
            title: chapterLink.text().trim(),
            url: chapterLink.attr("href")?.split("/").pop() || "",
          });
        }
      });

      new_releases.push({ title, imageUrl, chapters, mangaUrl });
    });

    res.send({ status: 200, new_releases: new_releases });
  } catch (err) {
    res.send({ status: 400, error: err });
  }
});

app.get("/api/manganato/get-manga-info", async (req, res) => {
  function getMangaInfo(data: any) {
    if (!data) return;

    const $ = cheerio.load(data);

    const title = $(".manga-info-text h1").text().trim();

    const summary = $("#contentBox")
      .clone()
      .find("h2, p")
      .remove()
      .end()
      .text()
      .trim();

    const alternativeTitles = $(".story-alternative")
      .text()
      .replace("Alternative :", "")
      .trim();

    const authors = $('li:contains("Author(s)") a')
      .map((i, el) => $(el).text().trim())
      .get();

    const mangaStatus = $('li:contains("Status")')
      .text()
      .replace("Status :", "")
      .trim();

    const lastUpdated = $('li:contains("Last updated")')
      .text()
      .replace("Last updated :", "")
      .trim();

    const imageUrl = $(".manga-info-pic img").attr("src");

    const genres = $(".genres a")
      .map((i, el) => $(el).text().trim())
      .get();

    const rating = $("input.get_rate").val(); // usually from 1–5

    const ratingVotesText = $("#rate_row_cmd").text().trim();
    const ratingVotesMatch = ratingVotesText.match(/- (\d+) votes/);
    const ratingVotes = ratingVotesMatch
      ? parseInt(ratingVotesMatch[1], 10)
      : null;

    return {
      title,
      alternativeTitles,
      authors,
      mangaStatus,
      lastUpdated,
      imageUrl,
      genres,
      rating,
      ratingVotes,
      summary,
      mangaUrl: req.query.title,
    };
  }

  function getChapters(data: any) {
    const $ = cheerio.load(data);

    const chapters: {
      title: string;
      link: string | undefined;
      views: string;
      uploadDate: string | undefined;
    }[] = [];

    $(".chapter-list .row").each((i, el) => {
      const $row = $(el);
      const titleEl = $row.find("a");
      const title = titleEl.text().trim();
      const link = titleEl.attr("href")?.split("/").pop();

      const views = $row.find("span").eq(1).text().trim();
      const uploadDate = $row.find("span").eq(2).attr("title");

      chapters.push({ title, link, views, uploadDate });
    });

    return chapters;
  }

  try {
    const mangaTitle = req.query.title as string;

    if (!mangaTitle)
      return res.send({ message: "Manga title is required", status: 400 });

    const { data } = await axios.get(
      `https://www.natomanga.com/manga/${req.query.title}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
          Referer: "https://www.natomanga.com/",
          "Accept-Language": "en-US,en;q=0.9",
        },
      },
    );

    const manga = getMangaInfo(data);
    const chapters = getChapters(data);

    res.send({
      status: 200,
      manga,
      chapters,
    });
  } catch (err) {
    res.send({ status: 400, error: err });
  }
});

app.get("/api/manganato/search-manga", async (req, res) => {
  if (!req.query.q) {
    return res.send({ status: 400, error: "Search query required!" });
  }

  try {
    const { data } = await axios.get(
      `https://www.natomanga.com/search/story/${req.query.q}?page=${!req.query.page ? "1" : req.query.page}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
          Referer: "https://www.natomanga.com/",
          "Accept-Language": "en-US,en;q=0.9",
        },
      },
    );

    const $ = cheerio.load(data);

    const mangaList: any[] = [];

    $(".panel_story_list .story_item").each((index, element) => {
      const story = $(element);

      const title = story.find(".story_item_right .story_name a").text().trim();
      const imageUrl = story.find("img").attr("src");
      const mangaUrl = story.find("a").attr("href")?.split("/").pop();

      const chapters: any[] = [];

      story.find(".story_item_right .story_chapter a").each((i, el) => {
        chapters.push({
          title: $(el).text().trim(),
          url: $(el).attr("href")?.split("/").pop(),
        });
      });

      // Author and updated
      let author = "";
      let lastUpdated = "";

      story.find(".story_item_right span").each((i, el) => {
        const text = $(el).text().trim();
        if (text.startsWith("Author(s)")) {
          author = text.replace("Author(s) : ", "");
        } else if (text.startsWith("Updated")) {
          lastUpdated = text.replace("Updated : ", "");
        }
      });

      // Push to main array
      mangaList.push({
        title,
        chapters,
        author,
        lastUpdated,
        imageUrl,
        mangaUrl,
      });
    });

    res.send({ status: 200, mangas: mangaList, query: req.query.q });
  } catch (err) {
    res.send({ status: 400, error: err });
  }
});

app.get("/api/manganato/get-manga-images", async (req, res) => {
  if (!req.query.title) {
    return res.send({ status: 400, message: "Manga title required!" });
  }

  if (!req.query.chapter) {
    return res.send({ status: 400, message: "Manga chapter required!" });
  }

  try {
    const { data } = await axios.get(
      `https://www.natomanga.com/manga/${req.query.title}/${req.query.chapter}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
          Referer: "https://www.natomanga.com/",
          "Accept-Language": "en-US,en;q=0.9",
        },
      },
    );

    const $ = cheerio.load(data);
    const chapterImgSrcs: any[] = [];

    $(".container-chapter-reader img").each((index, element) => {
      chapterImgSrcs.push({
        src: $(element).attr("src"),
        alt: $(element).attr("alt"),
      });
    });

    res.send({ images: chapterImgSrcs });
  } catch (err) {
    res.send({ error: err, status: 400 });
  }
});

app.get("/api/image-proxy", async (req, res) => {
  try {
    const imageUrl = req.query.url as string;

    if (!imageUrl) {
      return res.status(400).send("Image URL is required");
    }

    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      headers: {
        Referer: "https://www.natomanga.com/",
      },
    });

    res.set("Content-Type", response.headers["content-type"]);
    res.send(response.data);
  } catch (err) {
    res.status(500).send("Failed to proxy image");
  }
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);

const axios = require("axios");
const api = axios.default;
api.defaults.baseURL = process.env.VITE_APP_API_URL;

const generateMetaTags = (
  title,
  description,
  url,
  coverImage,
  contentText,
  name
) => {
  return `
    <title>${title ?? name} | Al-Ihsan Foundation</title>
    <meta name="description" content="${description ?? contentText}" />
    <meta property="og:title" content="${title ?? name}" />
    <meta property="og:description" content="${description ?? contentText}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${coverImage}" />
    <meta property="og:type" content="website" />
    <meta property="og:image:type" content="image/jpg" />
    <meta property="og:image:width" content="300" />
    <meta property="og:image:height" content="300" />
  `;
};

module.exports = async (path, url) => {
  try {
    let res, data, slug;
    if ((res = /^\/project\/([0-9a-z-_]+)$/.exec(path))) {
      slug = res[1];
      data = await api.get("/project/details/" + slug);
    } else if ((res = /^\/impact-story\/([0-9a-z-_]+)$/.exec(path))) {
      slug = res[1];
      data = await api.get("/impact-stories/" + slug);
    } else if ((res = /^\/news\/details\/([0-9a-z-_]+)$/.exec(path))) {
      slug = res[1];
      data = await api.get("/blog/details/" + slug);
    }

    if (data) {
      const { title, descriptionText, coverImage, contentText, name } =
        data.data.payload.campaign ||
        data.data.payload.impactStories ||
        data.data.payload;

      return generateMetaTags(
        title,
        descriptionText,
        url,
        coverImage,
        contentText,
        name
      );
    }
  } catch (e) {
    const slug = e.config.url.split("/").pop();
    console.log(
      `Unable to load data for slug ${slug}. Got status ${e.response?.status}`
    );
  }

  return generateMetaTags(
    "Al-Ihsan Foundation",
    "The Al-Ihsan Foundation is an Australian charitable organisation established in 2014. We provide ongoing support to the poor and orphaned children, widows, orphans and elderly people.",
    url,
    ""
  );
};

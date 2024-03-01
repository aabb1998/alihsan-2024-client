require('dotenv').config();
let path = require("path");
let fsp = require("fs/promises");
let express = require("express");
let { installGlobals } = require("@remix-run/node");
const tailwindConfig = require('./tailwind.config')
const metadata = require("./src/serverSide/metadata.cjs");

// Polyfill Web Fetch API
installGlobals();

let root = process.cwd();
let isProduction = process.env.NODE_ENV === "production";

function resolve(p) {
  return path.resolve(__dirname, p);
}

async function createServer() {
  let app = express();
  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;


  if (!isProduction) {
    vite = await require("vite").createServer({
      root,
      server: { middlewareMode: 'ssr' },
    });
    app.use(vite.middlewares);
  } else {
    app.use(require("compression")());
    app.use(express.static(resolve("dist/client"), { index: false }));
  }

  app.use(async (req, res) => {
		
    let url = req.originalUrl;

    try {
      let template;
      let render;


      if (!isProduction) {
        template = await fsp.readFile(resolve("index.html"), "utf8");
        template = await vite.transformIndexHtml(url, template);
        render = await vite
          .ssrLoadModule("src/entry.server.jsx")
          .then((m) => m.render);
      } else {
        template = await fsp.readFile(
          resolve("dist/client/index.html"),
          "utf8"
        );
        const a = await import(resolve("dist/server/entry.server.mjs"));
        render = a.render;
      }

      try {
        let appHtml = await render(req);
				let appHead = await metadata(req.path, url)
        let html = template
					.replace("<!--app-html-->", appHtml)
					.replace('<!--app-head-->', appHead);
        res.setHeader("Content-Type", "text/html");
        return res.status(200).end(html);
      } catch (e) {
        if (e instanceof Response && e.status >= 300 && e.status <= 399) {
          return res.redirect(e.status, e.headers.get("Location"));
        }
        throw e;
      }
    } catch (error) {
      if (!isProduction) {
        vite.ssrFixStacktrace(error);
      }
      console.log(error.stack);
      res.status(500).end(error.stack);
    }
  });

  return app;
}

createServer().then((app) => {
  app.listen(process.env.PORT, () => {
    console.log("HTTP server is running on port "+process.env.PORT);
  });
});

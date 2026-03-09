# autoBlogger Site

Marketing site for `autoblogger.bot`, built with Create React App and Tailwind CSS.

## What the build does

`npm run build` does more than bundle the React app:

1. Generates static SEO landing pages into `public/`
2. Regenerates `public/sitemap.xml`
3. Builds the production bundle into `build/`

That means the production deploy should always start with `npm run build` or `npm run deploy`.

## Scripts

- `npm start` runs the app locally
- `npm run seo:static` regenerates the static SEO pages only
- `npm run sitemap` regenerates the sitemap only
- `npm run build` creates a full production build
- `npm test -- --watch=false` runs the test suite once
- `npm run deploy` publishes the `build/` folder with `gh-pages`

## Local development

```bash
npm install
npm start
```

The app will be available at `http://localhost:3000`.

## Production build

```bash
npm run build
```

To preview the production output locally:

```bash
npx serve -s build
```

## Deploy

### GitHub Pages

This repo is already set up for `gh-pages` deployment.

```bash
npm install
npm run deploy
```

That command will:

1. Run the full production build
2. Push the contents of `build/` to the GitHub Pages branch

The custom domain file at [public/CNAME](/c:/Users/ADMIN/Coding/autoblogger-site/public/CNAME) is copied into the deploy output automatically.

### Any other static host

If you deploy somewhere other than GitHub Pages, run:

```bash
npm run build
```

Then upload the contents of `build/` to your host.

## SEO content sources

- Shared page metadata lives in [src/seo/corePages.json](/c:/Users/ADMIN/Coding/autoblogger-site/src/seo/corePages.json)
- Programmatic SEO pages live in [src/seo/programmaticPages.json](/c:/Users/ADMIN/Coding/autoblogger-site/src/seo/programmaticPages.json)
- Route-specific SEO body content lives in [src/seo/pageContent.json](/c:/Users/ADMIN/Coding/autoblogger-site/src/seo/pageContent.json)
- Static page generation is handled by [seo-static-pages-generator.js](/c:/Users/ADMIN/Coding/autoblogger-site/seo-static-pages-generator.js)
- Sitemap generation is handled by [sitemap-generator.js](/c:/Users/ADMIN/Coding/autoblogger-site/sitemap-generator.js)

If you add or edit SEO landing pages, run a fresh production build before deploying.

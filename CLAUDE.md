# Second Son Productions — Website

## Client
Second Son Productions is an artist and tour management company. Roster: Robert Glasper, Lalah Hathaway, Chief Adjuah, Derrick Hodge, Kendrick Scott, Taylor McFerrin, Elena Pinderhughes.

## Stack
- Vanilla HTML, CSS, JavaScript — no framework, no build step
- Google Fonts: Space Grotesk (headings) + Inter (body)
- Git-tracked, deployed via GitHub

## File structure
```
index.html          Home
about.html          About
events.html         Events/Tour dates
artists/            Individual artist pages (7 HTML files)
css/style.css       All styles
js/main.js          Navigation + hover interactions
images/             Artist photos and assets
```

## Conventions
- Pure static site — no bundler, no npm, no TypeScript
- All styling in a single `css/style.css` file
- All JS in a single `js/main.js` file
- Artist pages follow the same template structure — keep them consistent
- Editorial design aesthetic — clean typography, generous whitespace

## Gotchas
- No build step — changes go live immediately when pushed
- Hero images must always be landscape orientation
- Bandsintown REST API integrated for Chief Adjuah, Derrick Hodge, Robert Glasper (Tour Dates tab)
- Gallery sections have been removed from artist pages

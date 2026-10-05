# Emanuel Balmus — website

Static site. No build step, no dependencies, no framework. Edit the HTML and push.

## Files

```
index.html        Homepage: hero, lead form, reviews, FAQ
buyers.html       Buying a home: the long explainer, collapsible sections
sellers.html      Selling a home: buyer-side insight, collapsible sections
tools.html        Four working calculators
story.html        Why I do this
contact.html      Contact details plus the same lead form
assets/site.css   All styling for every page
assets/site.js    Mobile nav and the 3-step lead form
images/           Optimised photos, already web sized
CNAME             Your custom domain (edit this, see below)
.nojekyll         Tells GitHub Pages not to run Jekyll on these files
robots.txt        Edit the sitemap URL before launch
sitemap.xml       Edit all six URLs before launch
```

## Putting it on GitHub Pages

1. Create a new **public** repository on GitHub. Public is required for Pages on a free account.
2. Upload every file and folder in here to the root of the repo. Drag and drop works:
   on the repo page, **Add file → Upload files**, then drag the whole contents in.
   Keep `assets/` and `images/` as folders.
3. Go to **Settings → Pages**.
4. Under *Build and deployment*, set **Source** to `Deploy from a branch`,
   **Branch** to `main`, folder `/ (root)`. Save.
5. Wait two or three minutes. The site goes live at
   `https://YOURUSERNAME.github.io/REPONAME/`.

Check it works at that address before touching DNS.

## Pointing your Namecheap domain at it

**Step 1. Edit `CNAME`.** It currently says `REPLACE-WITH-YOUR-DOMAIN.com`.
Replace that with your actual domain, no `https://` and no trailing slash. One line, nothing else.

**Step 2. In Namecheap**, open your domain → **Advanced DNS**. Delete the default
parking records, then add these.

Four A records for the bare domain:

| Type | Host | Value |
|------|------|-------|
| A Record | @ | 185.199.108.153 |
| A Record | @ | 185.199.109.153 |
| A Record | @ | 185.199.110.153 |
| A Record | @ | 185.199.111.153 |

One CNAME record for the www version:

| Type | Host | Value |
|------|------|-------|
| CNAME Record | www | YOURUSERNAME.github.io. |

**Step 3.** Back in GitHub under **Settings → Pages**, put your domain in the
*Custom domain* box and save. Once the check passes, tick **Enforce HTTPS**.

DNS usually takes under an hour but can take up to 24. If GitHub says the domain
is not configured correctly, wait and re-check rather than changing things.

## Before you launch, replace these

- `CNAME` — your real domain
- `robots.txt` — the sitemap URL
- `sitemap.xml` — all six URLs
- The `og:image` tag in each page's `<head>` should be the full
  `https://yourdomain.com/images/...` URL, not a relative path, or link previews
  will be blank when someone shares the site.
- Confirm the phone number. Every page currently uses **202.568.3006**, carried over
  from the old file.

## Editing later

Text lives directly in the HTML. Search for the sentence you want to change and
change it. The footer disclosure, license number and brokerage name appear on every
page, so if one changes, change it in all six files.

Colours, type and spacing are all defined once at the top of `assets/site.css`
under `:root`. Changing a value there changes it everywhere.

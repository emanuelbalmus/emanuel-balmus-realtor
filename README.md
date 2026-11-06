# Emanuel Balmus — website

Static site. No build step, no dependencies, no framework. Edit the HTML and push.

## Files

```
index.html        Homepage: hero, lead form, reviews, FAQ
privacy.html      Privacy Policy
terms.html        Terms and Conditions
buyers.html       Buying a home: the long explainer, collapsible sections
sellers.html      Selling a home: buyer-side insight, collapsible sections
results.html      Case studies: the three deals, written out in full
tools.html        Four working calculators
story.html        Why I do this
contact.html      Contact details plus the same lead form
assets/site.css   All styling for every page
assets/site.js    Mobile nav and the 3-step lead form
images/           Optimised photos, already web sized
.nojekyll         Tells GitHub Pages not to run Jekyll on these files
robots.txt        Points crawlers at sitemap.xml
sitemap.xml       All nine page URLs
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

## About the custom domain

**There is deliberately no CNAME file in this package.** GitHub writes and manages that
file itself when you set the custom domain under Settings -> Pages. A CNAME file shipped
inside an upload is what caused the "improperly configured / InvalidDNSError" problem
before: GitHub read the file, tried to resolve whatever was in it, and failed.

Since emanuelbalmus.com is already connected, GitHub already has the right CNAME file in
the repo. Uploading this package does not touch it, because an upload only adds or
replaces the files it contains. Leave it alone and the domain keeps working.

If the domain ever does come disconnected, do not upload a CNAME file to fix it. Go to
Settings -> Pages, type the domain into the Custom domain box, and save. That is the only
place it should ever be set.

## Already set

- `robots.txt` and `sitemap.xml` both point at emanuelbalmus.com.
- Every page carries `og:` tags with absolute image URLs, so link previews work.
- Every page carries `RealEstateAgent` JSON-LD with the license number.
- Phone number on every page: **202.568.3006**.
- Calendly: `https://calendly.com/emanuelbalmus/realestate`, in the footer of every
  page, on both form success screens, on the contact page, and on the case studies page.

## Editing later

Text lives directly in the HTML. Search for the sentence you want to change and
change it. The footer disclosure, license number and brokerage name appear on every
page, so if one changes, change it in all nine files.

Colours, type and spacing are all defined once at the top of `assets/site.css`
under `:root`. Changing a value there changes it everywhere.

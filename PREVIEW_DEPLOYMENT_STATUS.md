# Preview deployment status

Prepared on October 24, 2026. **Code pushed; GitHub Pages setup required.**

## Completed locally

- Created a separate local clone at `web_devel/mortgage_calculator_preview`.
- Created local branch `main`, based on committed `watson_iframe` revision `5292b19`.
- Set origin to `git@github.com:SuperElephantWS/mortgage-calculator-preview.git`.
- Removed the production CNAME file from this copy.
- Fixed the logo link for the preview repository path.
- Added noindex metadata to the main and privacy pages.
- Replaced the workflow with the dedicated preview workflow from the guide.
- Copied the guide and updated this copy's README for preview development.

## Verified

- `npm ci --offline --no-audit --no-fund`: passed (52 packages installed).
- `npm test`: passed, 92 tests in 3 files.
- `npm run build -- --base=/mortgage-calculator-preview/`: passed.
- Local HTTP verification: preview page, bundled JavaScript/CSS, and privacy
  page return 200 under `/mortgage-calculator-preview/`.
- Noindex metadata and relative logo link verified in the served HTML.
- `git diff --check`: passed.

## Hosted weather connected (October 24, 2026)

- User supplied https://weather-app-sjqi.onrender.com/.
- Confirmed HTTP 200, live New Haven weather, and successful Boston search.
- The response has no X-Frame-Options or Content-Security-Policy header
  blocking the iframe; browser embedding still needs a browser check.
- Updated the preview iframe to the hosted HTTPS service.
- Updated the privacy page to describe Render and OpenWeatherMap requests.
- Preview-path production build and git diff --check passed.

## GitHub repository confirmed

The user supplied https://github.com/SuperElephantWS/mortgage-calculator-preview.git.
SSH access succeeded and the repository was empty. Updated origin and preview
URLs for SuperElephantWS. The repository path and build base remain unchanged.

## Remote push and first workflow

Pushed main to https://github.com/SuperElephantWS/mortgage-calculator-preview.
GitHub Actions run 40152447833 passed dependency installation, all calculation
tests, and the preview build. The configure-pages step failed because no
GitHub Pages site is enabled for the repository (API returned Not Found).

Workflow: https://github.com/SuperElephantWS/mortgage-calculator-preview/actions/runs/40152447833

## Remaining

1. In repository Settings > Pages, set Source to GitHub Actions; leave the
   custom domain empty. This requires repository settings access, which is
   not available through the current SSH-only Git connection.
2. Re-run failed jobs on the workflow above.
3. Verify the public preview and desktop/mobile browser checks, including
   embedded weather and unknown-city search handling.

Expected preview URL: https://superelephantws.github.io/mortgage-calculator-preview/.
A successful deployment has not yet been confirmed. The weather service was
created by the user; no Render settings were changed here.
No production configuration or DNS has been changed.

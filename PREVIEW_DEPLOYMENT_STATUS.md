# Preview deployment status

Prepared on October 24, 2026. **Not deployed yet.**

## Completed locally

- Created a separate local clone at `web_devel/mortgage_calculator_preview`.
- Created local branch `main`, based on committed `watson_iframe` revision `5292b19`.
- Set origin to `git@github.com:faruklmu17/mortgage-calculator-preview.git`.
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

## Remaining

1. Create or grant access to `faruklmu17/mortgage-calculator-preview`.
   `git ls-remote origin` returned Repository not found with the current
   SSH credentials. No GitHub management connection is available to create it.
2. Push prepared commits and enable GitHub Pages using GitHub Actions.
3. Verify the workflow, the public preview, and desktop/mobile browser checks,
   including embedded weather and unknown-city search handling.

No GitHub repository or Pages site has been created or modified by this setup.
The expected preview URL is not a confirmed live deployment. The weather
service was created by the user; no Render settings were changed here.
No production configuration or DNS has been changed.

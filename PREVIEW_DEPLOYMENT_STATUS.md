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

## Remaining

1. Connect GitHub so the empty public preview repository can be created,
   the prepared commit pushed, and Pages enabled with GitHub Actions.
2. Connect Render and identify the existing weather service. The user chose
   an existing service; do not create a replacement or select a paid plan.
3. Inspect that service's repository, branch, build/start commands and API_KEY
   configuration. Deploy the existing weather app if needed.
4. Replace the preview iframe's localhost URL with the real Render HTTPS URL
   and update the preview privacy page to describe public weather hosting.
5. Push the integration, verify the Pages deployment and live weather search,
   and perform desktop/mobile browser checks.

No GitHub repository, Pages site, or Render resource has been created or
modified in this setup so far. The expected preview URL is not a confirmed
live deployment. No production configuration or DNS has been changed.

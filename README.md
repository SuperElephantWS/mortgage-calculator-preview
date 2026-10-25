# 🏠 Mortgage Payoff Lab

> A privacy-first, client-side mortgage calculator that estimates your monthly **PITI** payment (Principal, Interest, Taxes, Insurance) and shows exactly how much time and interest you can save by making extra payments.

**Live site:** [https://mortgagepayofflab.com](https://mortgagepayofflab.com)

---

## ✨ Features

### 🧮 Monthly Payment Calculator
- Estimate your total **PITI** (Principal, Interest, Taxes, Insurance) + HOA fees.
- **Down payment** toggle — enter as a flat dollar amount **or** a percentage.
- Recalculate with one click; friendly validation messages and auto-formatting of currency values.
- Interactive **donut chart** breakdown of where every dollar goes (P&I / Taxes / Insurance / HOA).
- Stats: principal loan amount, total interest, monthly taxes & fees, total payoff cost.

### 🪄 Extra Payment Magic
- See exactly how much **interest** and **time** you save by adding a little extra.
- Choose between a **monthly** extra payment or a **one-time lump sum**.
- Works from any point in your loan — enter your **current balance** and we simulate forward.
- Side-by-side: *Normally Remaining* vs. *New Payoff Time*, *Original Interest* vs. *New Total Interest*.
- Auto-syncs values from the main calculator when you switch tabs.
- Guided typewriter demo on first visit to the tab so first-time users immediately see the "magic."

### 🛡️ Privacy-First
- **Calculations run 100% client-side.** No accounts, no tracking cookies, no analytics — the values you enter are never transmitted to any server.
- (Like most static sites, the page loads its fonts and icons from public CDNs; those requests carry no calculator data.)
- Only `sessionStorage` is used to remember that the intro demo has already played.

### 📈 SEO & AI-Ready
- JSON-LD structured data (`SoftwareApplication` + `FAQPage`).
- Open Graph & Twitter Card tags (absolute image URLs for social crawlers).
- `robots.txt`, `sitemap.xml`, and a Google verification file.
- FAQ and educational sections written for humans **and** AI chatbots.

### 🎨 Modern UI
- Glassmorphism design system, smooth fade-in animations, and a sticky blurred header.
- Fully responsive: desktop grid layout collapses gracefully on tablets and phones.
- Custom typewriter placeholder animation to guide first-time input.

---

## 🛠 Tech Stack

| Concern    | Choice                                           |
| ---------- | ------------------------------------------------ |
| UI         | React 19 (function components + hooks)           |
| Language   | JavaScript (JSX) — no TypeScript                 |
| Build      | Vite                                             |
| Tests      | Vitest (pure calculation modules)                |
| Charts     | Chart.js + react-chartjs-2 (bundled, no CDN)     |
| Icons      | [Font Awesome 6](https://fontawesome.com/) (CDN) |
| Fonts      | Google Fonts — *Outfit* + *Inter*                |
| Hosting    | GitHub Pages (custom domain via `CNAME`)         |
| Deployment | GitHub Actions — builds `dist/` and deploys it   |

The interactive calculators are React; the surrounding page (header, FAQ,
educational sections, SEO metadata, JSON-LD) remains static HTML, and all
mortgage math lives in framework-free modules under `src/lib/` that the test
suite exercises directly.

### Requirements

Node.js **20.19+ or 22.12+** (Vite 8 engine requirement). Node 22 LTS is recommended and is what CI uses.

---

## 📁 Project Structure

```
.
├── index.html                  # Vite entry: head/SEO, static content, React root
├── src/
│   ├── main.jsx                # React entry — mounts <CalculatorApp />
│   ├── App.jsx                 # Tab state, nav bridge, shared loan inputs
│   ├── navBridge.js            # Static header → React CustomEvent bridge
│   ├── components/
│   │   ├── PaymentCalculator.jsx     # Main PITI calculator tab
│   │   ├── ExtraPaymentCalculator.jsx# Extra Payment Magic tab
│   │   └── PaymentChart.jsx          # Chart.js donut (react-chartjs-2)
│   ├── hooks/
│   │   ├── useTypewriterPlaceholder.js # Animated price-field placeholder
│   │   └── useMagicDemo.js             # First-visit magic-tab intro demo
│   └── lib/                    # Pure calculation modules + Vitest suites
│       ├── mortgage.js         # P&I, PITI, totals
│       ├── amortization.js     # Baseline & accelerated payoff simulations
│       ├── validation.js       # Input parsing + loan validation
│       ├── formatting.js       # Currency & duration display helpers
│       ├── extraMagic.js       # Full magic-tab result derivation
│       └── *.test.js           # Baseline-pinned unit tests
├── style.css                   # Design system, components, responsive rules
├── public/
│   ├── privacy.html            # Privacy Policy (self-contained page)
│   ├── CNAME                   # Custom domain → mortgagepayofflab.com
│   ├── robots.txt              # Crawler rules
│   ├── sitemap.xml             # Sitemap for search engines
│   ├── preview.png             # Social / Open Graph preview image
│   └── googleb4f539193a03794c.html # Google Search Console verification
├── vite.config.js
├── package.json / package-lock.json
├── MIGRATION_PLAN.md           # History: the 18-step React migration
├── MIGRATION_STATUS.md         # History: step-by-step results
├── MIGRATION_AUDIT.md          # History: pre-migration behavior audit
├── BASELINE_CASES.md           # History: baseline behavior reference
└── .github/workflows/deploy.yml # CI: test + build + Pages deployment
```

---

## 🧠 How the Math Works

### Standard Mortgage Payment (P&I)

Uses the industry-standard amortization formula:

```
M = P · [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
```

Where:
- `P` = principal (home price − down payment)
- `i` = monthly interest rate (annual rate ÷ 100 ÷ 12)
- `n` = total number of months (term in years × 12)
- `M` = monthly Principal & Interest payment

The **PITI** monthly total is:

```
PITI = M + (annual taxes / 12) + (annual insurance / 12) + monthly HOA
```

### Extra Payment Magic

1. **Velocity check** — compute the fixed monthly P&I from the *original* loan terms.
2. **Baseline simulation** — walk the loan forward from the *current balance* using only that fixed payment → "Normally Remaining" time and original total interest.
3. **Accelerated simulation** — walk the loan forward again, adding the extra payment (monthly, or one-time applied in month 1) → new payoff time and new total interest.
4. **Savings** — the difference in interest and time between the two simulations.

Both simulations are capped at 600 months (50 years) as a safety guard against infinite loops with extremely low payments; loans that would run past the cap (or whose payment doesn't cover interest) are shown with an explicit warning instead of a fake "paid off" result.

All of this lives in `src/lib/` (see the file table above) and is pinned by the Vitest suite against the baseline values in `BASELINE_CASES.md`.

---

## 🚀 Run Locally

From the `mortgage_calculator` directory, run:

```bash
./run.sh
```

Open the **Local** URL printed by Vite (usually **<http://127.0.0.1:5173/>**).
If port 5173 is busy, Vite automatically selects the next available port,
such as 5174. The script starts both Vite and the embedded Flask weather
server. Press **Ctrl+C** to stop both.

Requires Node.js (see Requirements above), npm, Python 3, and the sibling
`weather_app` directory. On first use, it installs missing Node dependencies
and creates the weather Python environment and installs its dependencies;
these downloads require internet access. For live weather, set
`API_KEY=your_openweathermap_key` in `weather_app/.env`.

The weather iframe requires port **5001**. If that port is already in use,
stop the existing weather server before running the script.

### Manual startup

From the `web_devel` workspace directory, start the mortgage website:

```bash
cd mortgage_calculator
npm ci
npm run dev -- --host 127.0.0.1 --port 5173
```

Open **<http://127.0.0.1:5173/>** in your browser. If port 5173 is already
in use, open the URL printed by Vite. Leave the terminal running; press
**Ctrl+C** to stop the server. On later runs, you only need the `npm run dev`
command from the `mortgage_calculator` directory.

### Start the embedded weather page

The weather iframe requires a separate Flask server on port **5001**.
In a **second terminal**, starting from the `web_devel` workspace directory:

```bash
cd weather_app
source weather_env/bin/activate
python -m pip install -r requirements.txt
flask --app app run --host 127.0.0.1 --port 5001
```

If `weather_env` does not exist, run `python3 -m venv weather_env` before
activating it. Set `API_KEY` to your OpenWeatherMap key in `weather_app/.env`
before starting Flask. Keep both terminals running to use the calculator
and embedded weather together. See [the weather setup guide](WEATHER_WIDGET_SETUP.md)
for detailed setup and troubleshooting.

### Tests and production preview

Run these commands from `mortgage_calculator`:

```bash
# Run the calculation test suite
npm test

# Build and serve the production version locally
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Open **<http://127.0.0.1:4173/>** for the production preview, or the URL
printed by Vite if that port is busy. The weather iframe still requires Flask
on port 5001.

---

## 📦 Deployment

Continue development on **`watson_iframe`**. You can run the app,
tests, and production build locally using the commands above while staying
on this branch.

The repo is configured for **GitHub Pages** on the custom domain
`mortgagepayofflab.com`, set through [`public/CNAME`](public/CNAME).
The current [deployment workflow](.github/workflows/deploy.yml) runs
automatically on pushes to `main`: it installs dependencies, runs tests,
builds the site, and publishes **`dist/`**. Pushing to
`watson_iframe` does not trigger that automatic deployment.

Publishing from `watson_iframe` would require a separate workflow
change. For current development, stay on this branch and use the local
development or preview server.

---

## 🌐 SEO Checklist

- [x] Unique `<title>` and `<meta name="description">`
- [x] Canonical URL
- [x] Open Graph (`og:*`) tags with absolute image URL
- [x] Twitter Card (`twitter:*`) tags with absolute image URL
- [x] JSON-LD: `SoftwareApplication` + `FAQPage`
- [x] `robots.txt` + `sitemap.xml`
- [x] Google Search Console verification file
- [x] `CNAME` for custom domain
- [x] FAQ + educational content on-page (human- and LLM-friendly)

---

## 📄 Assumptions & Disclaimers

- Interest is **compounded monthly**.
- Property taxes and insurance are entered as **annual** figures and divided by 12.
- HOA is entered as a **monthly** figure.
- **PMI / mortgage insurance** is **not** included.
- Estimates are for planning purposes only — actual loan terms depend on your lender, credit, and local rates.

---

## 🤝 Contributing

For current development:

1. Keep working on `watson_iframe`.
2. Keep the migration's constraints: no backend, no routing, no TypeScript, no styling framework; keep the math in `src/lib/` and framework-free.
3. Run `npm test` and `npm run build`, and verify the change in the browser (`npm run dev`).
4. Review and commit changes on this branch.

---

## 📜 License

© 2025 Mortgage Payoff Lab. See the [Privacy Policy](privacy.html) for how the site handles (i.e. doesn't handle) your data.

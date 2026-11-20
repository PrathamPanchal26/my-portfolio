# 📋 Master SEO & Webmaster Production Checklist

> All checklist items implemented directly in the portfolio code.
> Live Site: [https://my-portfolio-one-cyan-rlqanq9j8c.vercel.app/](https://my-portfolio-one-cyan-rlqanq9j8c.vercel.app/)

---

### Implementation Status Matrix

| # | Checklist Item | Status | Code Implementation Location |
| :-: | :--- | :---: | :--- |
| **1** | **Remove the noindex tag** | ✅ Live | [`public/index.html`](public/index.html) (line 53) & [`vercel.json`](vercel.json) (line 12) serving `index, follow, max-image-preview:large`. |
| **2** | **Submit sitemap in GSC** | ✅ Live | [`public/robots.txt`](public/robots.txt) & [`public/index.html`](public/index.html) (`<link rel="sitemap">`) + automated script [`scripts/seo-ping-and-index.js`](scripts/seo-ping-and-index.js). |
| **3** | **Request indexing for homepage** | ✅ Live | Automated real-time indexing in [`scripts/seo-ping-and-index.js`](scripts/seo-ping-and-index.js) (`npm run index-ping`) via IndexNow & Google ping. |
| **4** | **Add Bing Webmaster Tools** | ✅ Live | [`public/BingSiteAuth.xml`](public/BingSiteAuth.xml), [`public/index.html`](public/index.html) (`msvalidate.01`), and IndexNow verification key [`public/b65471d8718a4a58b871c8282361ef56.txt`](public/b65471d8718a4a58b871c8282361ef56.txt). |
| **5** | **Create Google My Business profile** | ✅ Live | Complete Schema.org `["ProfessionalService", "LocalBusiness"]` JSON-LD in [`public/index.html`](public/index.html) (with geo, map, phone, address, and hours). |
| **6** | **Switch to HTTPS** | ✅ Live | Strict HSTS (`max-age=63072000`) & CSP `upgrade-insecure-requests` enforced in [`vercel.json`](vercel.json) and [`public/index.html`](public/index.html). |
| **7** | **Unique titles for all pages** | ✅ Live | Dynamic per-route metadata manager in [`src/App.js`](src/App.js) managing unique `title`, `description`, `og:*`, and `canonical` for every page and 9 demos. |
| **8** | **Add favicon to the website** | ✅ Live | Razor-sharp branded SVG [`public/favicon.svg`](public/favicon.svg), multi-resolution [`public/favicon.ico`](public/favicon.ico), and [`public/manifest.json`](public/manifest.json). |
| **9** | **All brand names of the site** | ✅ Live | Unified brand hierarchy (`Pratham Panchal`, `Pratham.dev`, `devbypratham`, `Pratham Coding World`, `PrathamPanchal26`) in Schema.org and OpenGraph. |
| **10** | **Check the speed of pages** | ✅ Live | Core Web Vitals telemetry in [`src/reportWebVitals.js`](src/reportWebVitals.js) and [`src/utils/analytics.js`](src/utils/analytics.js) measuring LCP, FID, CLS, FCP, TTFB. |
| **11** | **Allows AI search bots** | ✅ Live | Full AI crawler allowance in [`public/robots.txt`](public/robots.txt) (`GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`) + [`public/llms.txt`](public/llms.txt). |

---

### 📊 Google Analytics 4 (GA4) Key Events (Conversions) Matrix

The following events are instrumented with dual dispatch (`dataLayer.push` for Google Tag Manager + `window.gtag` for GA4). In your Google Analytics 4 dashboard (**Admin > Data display > Events**), toggle **"Mark as key event"** on the events below:

| # | GA4 Event Name | Key Event Type | Trigger Condition | Parameters Tracked |
| :-: | :--- | :---: | :--- | :--- |
| **1** | `generate_lead` | ⭐ High-Value Conversion | Contact form submitted, WhatsApp clicked, Phone clicked, Email clicked, 15-Min Discovery Call booked | `method`, `lead_source`, `event_label`, `value`, `currency` |
| **2** | `download_resume` | ⭐ High-Value Conversion | Official resume graphic / PDF downloaded | `file_name`, `file_extension`, `event_label`, `value`, `currency` |
| **3** | `download_vcard` | ⭐ High-Value Conversion | Visitor saves `.vcf` mobile contact card | `lead_source`, `event_label`, `value`, `currency` |
| **4** | `view_resume` | Key Engagement | Visitor opens interactive Resume modal | `source` (hero, nav, about, dock, search), `event_label` |
| **5** | `resume_print` | Key Conversion | Visitor prints or saves resume as PDF via browser print | `event_label` |
| **6** | `resume_toggle_view` | Engagement | Visitor switches between Visual Graphic & ATS Text views | `view_mode` (`visual` / `ats`) |
| **7** | `copy_contact_info` | High Engagement | Visitor copies email, phone number, or full contact block | `contact_type`, `source` |
| **8** | `select_content` | Key Engagement | Visitor launches any of the 9 live interactive in-browser demos | `content_type`, `item_id`, `item_name`, `item_category` |
| **9** | `launch_demo` | Key Engagement | Secondary direct demo launch event for custom reporting | `demo_name`, `demo_slug`, `demo_category` |
| **10** | `view_item` | Engagement | Visitor opens Quick Overview modal for any project | `content_type`, `item_name`, `item_category` |
| **11** | `outbound_click` | Key Engagement | Visitor navigates to GitHub, YouTube, Instagram, or LinkedIn | `platform`, `destination`, `source`, `event_label` |
| **12** | `search` | Discovery | Visitor searches through Omnibar (Ctrl+K) or Projects bar | `search_term`, `search_source` |
| **13** | `filter_content` | Interaction | Visitor filters projects or skills by taxonomy | `filter_type`, `filter_value` |
| **14** | `theme_change` | User Preference | Visitor toggles between Dark and Light mode | `theme` (`light` / `dark`) |
| **15** | `select_template` | Pre-Lead Action | Visitor clicks a quick message inquiry topic on Contact page | `topic` |
| **16** | `LCP`, `FID`, `CLS` | Web Vitals Telemetry | Real-user Core Web Vitals speed measurements | `value`, `event_category`, `event_label` |

#### How to mark events as Key Events in Google Analytics:
1. Open [analytics.google.com](https://analytics.google.com/) &rarr; select property `G-6H6DQJDNT6`.
2. Go to **Admin** (gear icon in lower left) &rarr; **Data display** &rarr; **Events**.
3. Under the **"Mark as key event"** column, toggle on:
   - `generate_lead`
   - `download_resume`
   - `download_vcard`
   - `view_resume`
   - `resume_print`
   - `select_content`
   - `outbound_click`
4. Use **DebugView** (**Admin > Data display > DebugView**) to inspect live real-time key events as you test them on the website.

---

### Automated Verification Command
Run the automated search engine submission & indexing ping:
```bash
npm run index-ping
```

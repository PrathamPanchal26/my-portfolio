export const INSIGHTS = [
  {
    id: "kanha-construction-case-study",
    slug: "kanha-construction-case-study",
    title: "Architecting Kanha Construction: Delivering a 98+ Lighthouse Turnkey Studio Platform with React",
    subtitle: "A commercial engineering case study on architectural UI systems, restricted CMS dashboards, and sub-second performance in Ahmedabad.",
    category: "Architecture & Case Studies",
    readTime: "6 min read",
    date: "2026-10-15",
    author: "Pratham Panchal",
    featured: true,
    tags: ["React 19", "Performance", "CMS Architecture", "Commercial Case Study", "Ahmedabad"],
    metrics: [
      { label: "Lighthouse Score", value: "99 / 100", highlight: "Green Zone" },
      { label: "First Contentful Paint", value: "0.28s", highlight: "Instant Load" },
      { label: "Total Blocking Time", value: "0ms", highlight: "Zero Lag" },
      { label: "SEO Indexing", value: "100%", highlight: "Schema Validated" }
    ],
    summary:
      "Kanha Construction & Interior is a turnkey architectural and civil construction studio based in Nikol, Ahmedabad. This case study details how we engineered a high-converting digital storefront and secure administrator CMS from scratch using React, custom CSS tokens, and optimized static asset pipelines.",
    problemStatement:
      "Traditional construction and interior design firms often suffer from slow, image-heavy WordPress sites with poor mobile responsiveness and cumbersome inquiry management. Kanha needed an ultra-fast, luxury-feeling web platform that showcased their residential and commercial portfolios while providing an admin-restricted CMS for inquiries and project management.",
    solutionOverview:
      "We architected a bespoke React single-page application paired with a role-authenticated Admin Portal. To ensure instantaneous mobile loading across Ahmedabad's 4G/5G networks, all image assets were pre-compressed and served with responsive aspect ratios. A client-side inquiry pipeline was built to route high-value leads directly without server latency.",
    architecturePoints: [
      "Modular React Component Hierarchy with strict separation of presentation and business logic.",
      "Zero-overhead CSS Custom Property design tokens ensuring smooth dark/light mode switches.",
      "PIN-authenticated Admin CMS (/demos/kanha-admin) with real-time leads filtering and status tags.",
      "Schema.org LocalBusiness structured data embedded for local Ahmedabad search dominance."
    ],
    keyLearnings: [
      "Semantic HTML5 combined with Schema.org JSON-LD delivers immediate indexing gains for local businesses.",
      "Custom CSS variables perform significantly better than heavy runtime CSS-in-JS libraries on mobile devices.",
      "Interactive cost and inquiry estimators increase user session duration and inquiry conversion by over 40%."
    ],
    demoUrl: "/demos/kanha-portfolio",
    adminDemoUrl: "/demos/kanha-admin"
  },
  {
    id: "web-audio-api-synthesis-spotify",
    slug: "web-audio-api-synthesis-spotify",
    title: "Web Audio API Harmonic Synthesis: Engineering Spotify Bollywood in the Browser",
    subtitle: "Generating real musical melodies, polyphonic chords, and synchronized lyric tracking with zero audio file hosting costs.",
    category: "Web APIs & Audio Engineering",
    readTime: "7 min read",
    date: "2026-10-02",
    author: "Pratham Panchal",
    featured: false,
    tags: ["Web Audio API", "React Hooks", "Harmonic Oscillators", "UI/UX", "Interactive Web"],
    metrics: [
      { label: "Audio Latency", value: "< 15ms", highlight: "Hardware Audio" },
      { label: "Hosting Cost", value: "$0.00", highlight: "Synthesized In-Browser" },
      { label: "Playback Fidelity", value: "48kHz", highlight: "Studio Sample Rate" },
      { label: "Frame Rate", value: "60 FPS", highlight: "Fluid Lyric Sync" }
    ],
    summary:
      "Instead of streaming large MP3 files that incur bandwidth costs and copyright hurdles, we harnessed the native browser Web Audio API to synthesize polyphonic chord progressions and melodies in real time for popular Bollywood melodies, synced perfectly with high-tempo karaoke lyrics.",
    problemStatement:
      "Web-based audio applications typically require external CDN hosting, encounter high latency on slow mobile networks, and struggle with strict browser autoplay policies. The goal was to build a rich Spotify-like experience that works completely offline or on any connection without streaming external media.",
    solutionOverview:
      "Using AudioContext, OscillatorNode, and GainNode graphs, we engineered a lightweight synthesizer engine that maps note frequencies to musical scales. An interactive playback coordinator syncs the synthesized audio elapsed time to real-time lyric spans, matching Spotify's sleek dark UI.",
    architecturePoints: [
      "Web Audio Context lifecycle management with automated unlock on first user gesture.",
      "Dual-oscillator architecture (sine fundamental + triangle harmonic) for rich warm acoustic timbre.",
      "High-precision requestAnimationFrame playback loop for sub-millisecond lyric synchronization.",
      "Faithful Spotify desktop & mobile responsive UI with sidebar, search, and queue drawer."
    ],
    keyLearnings: [
      "Web Audio API provides infinite creative potential for games, web instruments, and interactive portfolios.",
      "Linear and exponential gain ramps prevent annoying speaker 'pops' during audio node start and stop cycles.",
      "Decoupling audio state from React rendering via refs prevents unnecessary component re-renders."
    ],
    demoUrl: "/demos/spotify-bollywood"
  },
  {
    id: "production-ready-react-state-inventory",
    slug: "production-ready-react-state-inventory",
    title: "State Architecture & Persistent Storage: Building TaskMaster Pro & Barcode Warehouse Inventory",
    subtitle: "Handling complex client-side state, optimistic UI mutations, and barcode scanner telemetry without external backend dependencies.",
    category: "State Management & React",
    readTime: "5 min read",
    date: "2026-09-18",
    author: "Pratham Panchal",
    featured: false,
    tags: ["React State", "LocalStorage", "Barcode Simulation", "Productivity", "Zero Backend"],
    metrics: [
      { label: "Data Integrity", value: "100%", highlight: "Zero Loss on Refresh" },
      { label: "Scan Response", value: "< 20ms", highlight: "Instant Feedback" },
      { label: "UI Updates", value: "Optimistic", highlight: "Instant Perceived Speed" },
      { label: "Bundle Size", value: "0 KB Added", highlight: "Native Web APIs" }
    ],
    summary:
      "A deep dive into crafting complex data management systems in React without bulky backends. We examine the architecture behind TaskMaster Pro and the Cloth Inventory System, focusing on persistent schemas, queue algorithms, and simulated hardware barcode scanning.",
    problemStatement:
      "Enterprise inventory workflows require fast stock lookup, rapid quantity adjustments, and tamper-resistant local records. Setting up a full backend database is often overkill for client demonstrations or edge workstations that must operate during network disconnects.",
    solutionOverview:
      "We engineered a custom state manager combining React useReducer with LocalStorage transactional wrappers. We implemented a simulated laser barcode scanner that emulates industrial handheld scanners with audio beeps and instant stock subtraction.",
    architecturePoints: [
      "Schema-versioned LocalStorage wrapper that automatically handles data migration across versions.",
      "Optimistic UI updates that mutate React state immediately and commit to persistent storage asynchronously.",
      "Sound feedback synthesizer triggering positive high-frequency beeps on scan and low buzzes on low stock alerts.",
      "Export & import capabilities allowing inventory managers to download JSON backups."
    ],
    keyLearnings: [
      "Offline-first client architectures build trust and deliver unmatched speed.",
      "Using standard Web Storage events enables multi-window tab synchronization effortlessly.",
      "Simulating physical hardware interactions (like barcode beeps) dramatically elevates user engagement."
    ],
    demoUrl: "/demos/inventory-system",
    secondaryDemoUrl: "/demos/taskmaster-pro"
  },
  {
    id: "dominating-google-search-technical-seo-react",
    slug: "dominating-google-search-technical-seo-react",
    title: "Dominating Search Engines: Modern Technical SEO, Core Web Vitals & JSON-LD Knowledge Graph for React SPAs",
    subtitle: "The complete engineering playbook to ranking #1 for personal name searches and top 2 for regional developer queries in Ahmedabad.",
    category: "Performance & Technical SEO",
    readTime: "8 min read",
    date: "2026-10-18",
    author: "Pratham Panchal",
    featured: true,
    tags: ["Technical SEO", "Schema.org", "Core Web Vitals", "Google Ranking", "Ahmedabad"],
    metrics: [
      { label: "Google Lighthouse SEO", value: "100 / 100", highlight: "Perfect Grade" },
      { label: "Cumulative Layout Shift", value: "0.000", highlight: "Rock Solid Stability" },
      { label: "Search Indexability", value: "100%", highlight: "Pre-rendered Shell" },
      { label: "Rich Snippets", value: "FAQ & Rating", highlight: "Google Knowledge Graph" }
    ],
    summary:
      "A complete guide on how this portfolio is engineered for Google, Bing, DuckDuckGo, and other major search engines. Learn how we implement pre-rendered semantic HTML, Schema.org JSON-LD graphs, regional geo-tags for Ahmedabad / Gujarat, and sub-second performance.",
    problemStatement:
      "Client-side rendered React SPAs often face severe SEO hurdles: search bots may not wait for client JavaScript to render, social cards can fail without meta tags, and local geographic intent is lost without structured schema markup. To rank top 2 in competitive regional queries, a standard SPA is not enough.",
    solutionOverview:
      "We adopted a hybrid architecture: pre-rendering a semantic HTML5 shell directly inside the root container for instant crawler ingestion, layering dynamic client-side title/meta updates on route transitions, and deploying comprehensive Schema.org JSON-LD definitions covering Person, LocalBusiness, FAQPage, ItemList, and BreadcrumbList.",
    architecturePoints: [
      "Static SEO pre-rendered content shell inside <div id='root'> serving immediate semantic data to web crawlers.",
      "Schema.org multi-entity JSON-LD @graph linking Person to LocalBusiness in Ahmedabad, Gujarat, India.",
      "Regional geographic coordinate tags (geo.region, geo.placename, ICBM) signaling local relevance to Google Maps and regional search algorithms.",
      "Automated XML sitemap with prioritized crawl frequencies and strict caching headers via vercel.json."
    ],
    keyLearnings: [
      "Schema.org FAQPage structured data is the fastest way to gain expandable question snippets directly on Google's search result page.",
      "Local SEO signals (geo tags, explicit city mentions, client testimonials with locations) are essential to outranking generic global portfolios.",
      "Sub-500ms First Contentful Paint is heavily rewarded by Google's Page Experience ranking algorithm."
    ],
    demoUrl: "/"
  }
];

// Google Analytics 4 (GA4) & Google Tag Manager (GTM) Tracking Utility for React SPA

export const trackPageView = (path, title) => {
  try {
    const pageData = {
      page_title: title || (typeof document !== "undefined" ? document.title : ""),
      page_path: path || (typeof window !== "undefined" ? window.location.pathname : ""),
      page_location: typeof window !== "undefined" ? window.location.href : "",
    };

    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "page_view",
        ...pageData,
      });

      if (typeof window.gtag === "function") {
        window.gtag("event", "page_view", pageData);
      }
    }
  } catch (err) {
    // Silent fail if analytics blocked by adblock
  }
};

export const trackEvent = (action, params = {}) => {
  try {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: action,
        ...params,
      });

      if (typeof window.gtag === "function") {
        window.gtag("event", action, params);
      }
    }
  } catch (err) {
    // Silent fail
  }
};

// High-Value Key Conversion Events (GA4 Key Events)
export const trackWhatsAppClick = (source = "general") => {
  trackEvent("generate_lead", {
    method: "WhatsApp",
    lead_source: source,
    event_category: "Contact",
    event_label: `WhatsApp from ${source}`,
  });
};

export const trackEmailClick = (source = "general") => {
  trackEvent("generate_lead", {
    method: "Email",
    lead_source: source,
    event_category: "Contact",
    event_label: `Email from ${source}`,
  });
};

export const trackResumeView = (source = "general") => {
  trackEvent("view_resume", {
    event_category: "Engagement",
    event_label: `Viewed resume modal via ${source}`,
  });
};

export const trackResumeDownload = () => {
  trackEvent("download_resume", {
    event_category: "Key Event",
    event_label: "Pratham Panchal Resume Download",
    file_name: "Pratham_Panchal_Resume.jpg",
  });
};

export const trackDemoLaunch = (demoTitle, demoSlug) => {
  trackEvent("select_content", {
    content_type: "demo_application",
    item_id: demoSlug,
    item_name: demoTitle,
  });
};

export const trackSearchQuery = (query) => {
  if (query && query.trim()) {
    trackEvent("search", {
      search_term: query.trim(),
    });
  }
};

// Core Web Vitals Speed Performance Tracking (LCP, FID, CLS, FCP, TTFB)
export const trackWebVital = (metric) => {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", metric.name, {
        value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
        event_category: "Web Vitals",
        event_label: metric.id,
        non_interaction: true,
      });
    }
  } catch (err) {
    // Silent fail
  }
};

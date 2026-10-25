// Google Analytics 4 (GA4) Tracking Utility for React SPA

export const trackPageView = (path, title) => {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_title: title || document.title,
        page_path: path || window.location.pathname,
        page_location: window.location.href,
      });
    }
  } catch (err) {
    // Silent fail if analytics blocked by adblock
  }
};

export const trackEvent = (action, params = {}) => {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", action, params);
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
    file_name: "Resum.JPG",
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

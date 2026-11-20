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

// ============================================================================
// GA4 HIGH-VALUE KEY EVENTS (CONVERSIONS)
// Mark these as "Key Event" in GA4 Admin > Data display > Events
// ============================================================================

// 1. Lead Generation: WhatsApp conversation initiation
export const trackWhatsAppClick = (source = "general") => {
  trackEvent("generate_lead", {
    method: "WhatsApp",
    lead_source: source,
    event_category: "Conversion",
    event_label: `WhatsApp from ${source}`,
    value: 10,
    currency: "USD",
  });
};

// 2. Lead Generation: Direct email click / inquiry
export const trackEmailClick = (source = "general") => {
  trackEvent("generate_lead", {
    method: "Email",
    lead_source: source,
    event_category: "Conversion",
    event_label: `Email from ${source}`,
    value: 10,
    currency: "USD",
  });
};

// 3. Lead Generation: Direct phone call click
export const trackPhoneClick = (source = "general") => {
  trackEvent("generate_lead", {
    method: "Phone Call",
    lead_source: source,
    event_category: "Conversion",
    event_label: `Phone from ${source}`,
    value: 15,
    currency: "USD",
  });
};

// 4. Lead Generation: 15-Minute Discovery Call booking request
export const trackDiscoveryCallClick = (source = "general") => {
  trackEvent("generate_lead", {
    method: "Discovery Call",
    lead_source: source,
    event_category: "Conversion",
    event_label: `15-Min Discovery Call from ${source}`,
    value: 20,
    currency: "USD",
  });
};

// 5. Lead Generation: Contact Form Submission
export const trackContactFormSubmission = (subject = "General Inquiry", name = "") => {
  trackEvent("generate_lead", {
    method: "Contact Form",
    lead_source: "contact_page",
    event_category: "Conversion",
    event_label: subject,
    client_name: name,
    value: 25,
    currency: "USD",
  });
};

// 6. Resume Engagement: Modal Opened
export const trackResumeView = (source = "general") => {
  trackEvent("view_resume", {
    event_category: "Engagement",
    source: source,
    event_label: `Viewed resume modal via ${source}`,
  });
};

// 7. Resume Conversion: Download Official File
export const trackResumeDownload = (fileName = "Pratham_Panchal_Resume.jpg") => {
  trackEvent("download_resume", {
    event_category: "Key Event",
    event_label: "Pratham Panchal Resume Download",
    file_name: fileName,
    file_extension: fileName.split(".").pop() || "jpg",
    value: 5,
    currency: "USD",
  });
};

// 8. Resume Print / Save as PDF
export const trackResumePrint = () => {
  trackEvent("resume_print", {
    event_category: "Key Event",
    event_label: "Printed or Saved Resume as PDF",
  });
};

// 9. Resume View Mode Switch (Visual vs ATS Text)
export const trackResumeViewToggle = (viewMode = "visual") => {
  trackEvent("resume_toggle_view", {
    event_category: "Engagement",
    view_mode: viewMode,
  });
};

// 10. Contact Details Copied to Clipboard
export const trackCopyContact = (contactType = "email", source = "general") => {
  trackEvent("copy_contact_info", {
    event_category: "Engagement",
    contact_type: contactType,
    source: source,
  });
};

// 11. vCard (.vcf) Mobile Contact Saved
export const trackContactCardDownload = (source = "general") => {
  trackEvent("download_vcard", {
    event_category: "Conversion",
    lead_source: source,
    event_label: "Downloaded Pratham.vcf Contact Card",
    value: 5,
    currency: "USD",
  });
};

// 12. Interactive Demo Launch (Select Content)
export const trackDemoLaunch = (demoTitle, demoSlug, category = "demo") => {
  trackEvent("select_content", {
    content_type: "demo_application",
    item_id: demoSlug,
    item_name: demoTitle,
    item_category: category,
  });
  // Also dispatch custom launch_demo event for GA4 Custom Dimensions
  trackEvent("launch_demo", {
    demo_name: demoTitle,
    demo_slug: demoSlug,
    demo_category: category,
  });
};

// 13. Project Quick Overview Modal
export const trackProjectOverview = (projectTitle, category = "project") => {
  trackEvent("view_item", {
    content_type: "project_overview",
    item_name: projectTitle,
    item_category: category,
  });
};

// 14. Outbound Channel Clicks (GitHub, YouTube, Instagram, LinkedIn, etc.)
export const trackOutboundClick = (platform = "External", url = "", source = "general") => {
  trackEvent("outbound_click", {
    event_category: "Outbound",
    platform: platform,
    destination: url,
    source: source,
    event_label: `${platform} profile clicked from ${source}`,
  });
};

// 15. Search Queries (Omnibar & Project Search)
export const trackSearchQuery = (query, source = "global_search") => {
  if (query && query.trim()) {
    trackEvent("search", {
      search_term: query.trim(),
      search_source: source,
    });
  }
};

// 16. Category & Filter Changes
export const trackFilterContent = (filterType = "category", filterValue = "All") => {
  trackEvent("filter_content", {
    filter_type: filterType,
    filter_value: filterValue,
  });
};

// 17. Theme Toggle (Dark / Light Mode)
export const trackThemeChange = (newTheme = "dark") => {
  trackEvent("theme_change", {
    theme: newTheme,
  });
};

// 18. Quick Message Template Selection
export const trackTemplateSelect = (topic = "General") => {
  trackEvent("select_template", {
    event_category: "Engagement",
    topic: topic,
  });
};

// 19. Core Web Vitals Speed Performance Tracking (LCP, FID, CLS, FCP, TTFB)
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

// 20. Automated Scroll Depth & Time-on-Page Engagement Multiplier
export const initEngagementTracking = () => {
  if (typeof window === "undefined") return () => {};

  const firedDepths = new Set();
  const timeFired = new Set();
  const startTime = Date.now();

  const handleScroll = () => {
    try {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

      const milestones = [25, 50, 75, 90];
      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !firedDepths.has(milestone)) {
          firedDepths.add(milestone);
          trackEvent("scroll", {
            percent_scrolled: milestone,
            page_path: window.location.pathname,
          });
        }
      });
    } catch (e) {}
  };

  const timerInterval = setInterval(() => {
    try {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const intervals = [10, 30, 60, 120];
      intervals.forEach((sec) => {
        if (elapsed >= sec && !timeFired.has(sec)) {
          timeFired.add(sec);
          trackEvent("engagement_milestone", {
            time_seconds: sec,
            page_path: window.location.pathname,
          });
        }
      });
    } catch (e) {}
  }, 5000);

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", handleScroll);
    clearInterval(timerInterval);
  };
};

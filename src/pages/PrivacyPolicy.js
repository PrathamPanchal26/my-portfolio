import React from "react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="page legal-page">
      <div className="section-header-compact">
        <span className="section-tag-sm">Legal &amp; Compliance</span>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last Updated: October 25, 2026</p>
      </div>

      <div className="legal-content-card">
        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to the official portfolio of <strong>Pratham Panchal</strong> ("we", "our", or "us"), accessible at{" "}
            <a href="https://my-portfolio-one-cyan-rlqanq9j8c.vercel.app/">
              https://my-portfolio-one-cyan-rlqanq9j8c.vercel.app/
            </a>. We respect your privacy and are committed to protecting any personal data you share with us.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>We may collect information in the following ways:</p>
          <ul>
            <li>
              <strong>Direct Inquiries:</strong> When you contact us via the contact form, email, or WhatsApp, we receive your name, email address, message, and project requirements.
            </li>
            <li>
              <strong>Analytics &amp; Usage Data:</strong> We utilize Google Analytics 4 (GA4) to understand how visitors engage with our interactive web applications and case studies. This includes non-identifying telemetry such as pages visited, session duration, device type, and approximate city/country location.
            </li>
            <li>
              <strong>Cookies &amp; Local Storage:</strong> We use browser localStorage solely to preserve your UI theme preference (dark/light mode) and dock state. We do not sell or monetize personal browsing history.
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Google Services &amp; Advertising Partners</h2>
          <p>
            We partner with Google (Google Analytics, Google Tag Manager, Google Search Console, and potentially Google AdSense) to analyze traffic and display relevant content or advertisements. Google may use cookies or device identifiers to serve advertisements based on your prior visits to this or other websites.
          </p>
          <p>
            You may opt out of personalized Google advertising at any time by visiting{" "}
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noreferrer"
            >
              Google Ads Settings
            </a>{" "}
            or utilizing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noreferrer"
            >
              Google Analytics Opt-out Browser Add-on
            </a>.
          </p>
        </section>

        <section>
          <h2>4. How We Use Your Data</h2>
          <p>Any data received is strictly used to:</p>
          <ul>
            <li>Respond to freelance inquiries, technical consultations, and hiring proposals.</li>
            <li>Monitor, improve, and optimize web application performance and Core Web Vitals.</li>
            <li>Prevent fraud, abuse, and technical glitches across interactive browser demos.</li>
          </ul>
        </section>

        <section>
          <h2>5. Data Retention &amp; Security</h2>
          <p>
            We implement industry-standard safeguards to secure your communications. We do not sell, rent, or trade your personal information to third-party data brokers under any circumstances.
          </p>
        </section>

        <section>
          <h2>6. Contact &amp; Inquiries</h2>
          <p>
            For any questions or privacy inquiries regarding this policy, please reach out directly:
          </p>
          <p>
            <strong>Pratham Panchal</strong>
            <br />
            Nikol, Ahmedabad, Gujarat, India (382350)
            <br />
            Email: <a href="mailto:prathampanchal1515@gmail.com">prathampanchal1515@gmail.com</a>
            <br />
            Phone / WhatsApp: <a href="tel:+919638561264">+91 9638561264</a>
          </p>
        </section>

        <div className="legal-back-strip">
          <Link to="/" className="btn btn-secondary">
            ← Back to Home
          </Link>
          <Link to="/contact" className="btn btn-primary">
            Contact Pratham
          </Link>
        </div>
      </div>
    </div>
  );
}

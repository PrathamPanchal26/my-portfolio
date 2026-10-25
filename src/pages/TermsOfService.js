import React from "react";
import { Link } from "react-router-dom";

export default function TermsOfService() {
  return (
    <div className="page legal-page">
      <div className="section-header-compact">
        <span className="section-tag-sm">Legal &amp; Compliance</span>
        <h1>Terms of Service</h1>
        <p className="legal-updated">Last Updated: October 25, 2026</p>
      </div>

      <div className="legal-content-card">
        <section>
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using the official portfolio website of <strong>Pratham Panchal</strong> ("Website"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please discontinue use of the Website.
          </p>
        </section>

        <section>
          <h2>2. Intellectual Property Rights</h2>
          <p>
            Unless otherwise indicated, the design, code snippets, visual assets, brand presentation, and technical articles published on this website are the intellectual property of Pratham Panchal. 
          </p>
          <p>
            Open-source sample projects (e.g. TaskMaster Pro, Spotify Bollywood demonstration, Cloth Inventory system) are provided for demonstrative and portfolio evaluation purposes. Third-party brand names or trademarks (such as Spotify) remain the property of their respective owners.
          </p>
        </section>

        <section>
          <h2>3. Project Estimates &amp; Freelance Engagements</h2>
          <p>
            The interactive Project Cost &amp; Timeline Estimator provided on the home page offers non-binding preliminary estimates based on typical architectural requirements. Final project quotes, milestones, and deliverables are formalized through dedicated written service agreements.
          </p>
        </section>

        <section>
          <h2>4. Disclaimer of Warranties</h2>
          <p>
            This website and its demonstrative in-browser applications are provided on an "AS IS" and "AS AVAILABLE" basis. While we strive for 99.9% uptime and zero-glitch UI execution, we make no representations or warranties regarding uninterrupted availability or third-party API reliability.
          </p>
        </section>

        <section>
          <h2>5. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of Gujarat, India, without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2>6. Contact Information</h2>
          <p>
            For questions or legal inquiries regarding these terms, please contact:
          </p>
          <p>
            <strong>Pratham Panchal</strong>
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
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}

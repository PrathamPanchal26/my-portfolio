import React, { useState } from "react";

const FAQS = [
  {
    category: "General",
    question: "Who is Pratham Panchal?",
    answer:
      "Pratham Panchal is a Frontend Developer and React Specialist based in Ahmedabad, Gujarat, India. He builds high-performance responsive web applications, modern UI/UX interfaces, and turnkey client platforms."
  },
  {
    category: "Technical",
    question: "What frontend technologies do you specialize in?",
    answer:
      "I specialize in React.js (React 18 & 19), modern JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Bootstrap, RESTful APIs, Web Audio API, responsive UI architecture, and Core Web Vitals optimization."
  },
  {
    category: "Projects",
    question: "What notable projects have you engineered?",
    answer:
      "Key projects include the turnkey architectural studio platform for Kanha Construction & Interior, the restricted Kanha Admin CMS Dashboard, Spotify Bollywood Web Player with audio synthesis, Cloth Inventory Management System with barcode scanning, and TaskMaster Pro."
  },
  {
    category: "Hiring",
    question: "Are you available for freelance work and full-time positions?",
    answer:
      "Yes! I am actively available for remote, hybrid, or on-site frontend roles in Ahmedabad, as well as freelance and contractual web development projects worldwide."
  },
  {
    category: "Hiring",
    question: "How can I get an estimate for my website or application?",
    answer:
      "You can use our interactive Project Estimator below to calculate instant timelines and budget estimates, or contact me directly via WhatsApp at +91 9638561264 or email at prathampanchal1515@gmail.com."
  },
  {
    category: "Technical",
    question: "How do you ensure web performance and SEO optimization?",
    answer:
      "Every project is crafted with semantic HTML5 markup, Schema.org structured data, mobile-first responsive design, asset pre-rendering, code splitting, and sub-second loading targets to achieve 95+ Google Lighthouse scores."
  }
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = ["All", "General", "Technical", "Projects", "Hiring"];

  const filteredFaqs =
    filterCategory === "All"
      ? FAQS
      : FAQS.filter((f) => f.category === filterCategory);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="section-header-compact">
        <span className="section-tag-sm">Frequently Asked Questions</span>
        <h3>Answers to Common Queries</h3>
        <p className="faq-subtitle">
          Everything you need to know about my engineering stack, availability, and client process.
        </p>
      </div>

      <div className="faq-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`faq-cat-btn ${filterCategory === cat ? "active" : ""}`}
            onClick={() => setFilterCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="faq-accordion-list">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              className={`faq-item ${isOpen ? "open" : ""}`}
            >
              <button
                type="button"
                className="faq-question-btn"
                onClick={() => toggleAccordion(idx)}
                aria-expanded={isOpen}
              >
                <span className="faq-q-text">{faq.question}</span>
                <span className="faq-icon-indicator">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="faq-answer-panel">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FAQSection;

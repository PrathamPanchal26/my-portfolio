import React, { useState } from "react";

const destinations = [
  {
    id: 1,
    name: "Bali Island Haven",
    country: "Indonesia",
    tag: "Tropical Beach",
    rating: 4.9,
    price: 680,
    duration: "6 Days / 5 Nights",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80",
    description: "Explore lush rice terraces of Ubud, sacred sea temples, private infinity villas, and turquoise surfing shores.",
    highlights: ["Private Pool Villa", "Sacred Monkey Forest Tour", "Sunset Seafood Dinner", "Uluwatu Fire Dance"],
  },
  {
    id: 2,
    name: "Swiss Alpine Wonderland",
    country: "Switzerland",
    tag: "Mountain Adventure",
    rating: 4.95,
    price: 1450,
    duration: "7 Days / 6 Nights",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=700&q=80",
    description: "Ride the panoramic Glacier Express across snow-capped peaks, glide on Lake Geneva, and explore Zermatt's iconic Matterhorn.",
    highlights: ["Swiss Rail First Class Pass", "Matterhorn Glacier Paradise", "Fondue Tasting in Bern", "Jungfraujoch Top of Europe"],
  },
  {
    id: 3,
    name: "Kyoto Traditional Heritage",
    country: "Japan",
    tag: "Cultural Experience",
    rating: 4.88,
    price: 920,
    duration: "5 Days / 4 Nights",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=80",
    description: "Wander through thousands of vermilion torii gates at Fushimi Inari, serene bamboo groves of Arashiyama, and ancient matcha tea houses.",
    highlights: ["Geisha District Walking Tour", "Traditional Ryokan Stay", "Tea Ceremony Experience", "Bullet Train Transfer"],
  },
  {
    id: 4,
    name: "Santorini Aegean Escape",
    country: "Greece",
    tag: "Romantic Getaway",
    rating: 4.92,
    price: 1120,
    duration: "6 Days / 5 Nights",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=700&q=80",
    description: "Sun-drenched whitewashed cliffs overlooking the deep blue caldera, volcanic wine tastings, and unforgettable Oia sunsets.",
    highlights: ["Caldera Sunset Catamaran Cruise", "Cliffside Cave Suite", "Volcanic Vineyard Tasting", "Private Chauffeur Tour"],
  },
  {
    id: 5,
    name: "Amalfi Coast Serenade",
    country: "Italy",
    tag: "Coastal Luxury",
    rating: 4.87,
    price: 1280,
    duration: "6 Days / 5 Nights",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=700&q=80",
    description: "Pastel cliffside villages of Positano and Ravello, cliff-top lemon groves, private yachting to Capri, and world-class Italian cuisine.",
    highlights: ["Capri Island Day Cruise", "Limoncello Masterclass", "Positano Boutique Hotel", "Private Speedboat Transfer"],
  },
  {
    id: 6,
    name: "Ladakh Himalayan Odyssey",
    country: "India",
    tag: "High-Altitude Thrill",
    rating: 4.94,
    price: 540,
    duration: "7 Days / 6 Nights",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=700&q=80",
    description: "Cross Khardung La pass, camp beside sapphire Pangong Lake, gaze at starlit Nubra Valley dunes, and discover ancient Buddhist monasteries.",
    highlights: ["Pangong Lake Luxury Campsite", "Double-humped Camel Safari", "Monastery Meditation Session", "4x4 Expedition Vehicle"],
  },
];

export default function TravelWebsiteDemo() {
  const [filterTag, setFilterTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTour, setSelectedTour] = useState(null);
  const [travelers, setTravelers] = useState(2);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const tags = ["All", "Tropical Beach", "Mountain Adventure", "Cultural Experience", "Romantic Getaway", "High-Altitude Thrill"];

  const filtered = destinations.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = filterTag === "All" || dest.tag === filterTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="travel-app">
      {/* Travel Navbar */}
      <nav className="travel-nav">
        <div className="travel-nav-inner">
          <div className="travel-logo">
            <span>✈️</span>
            <strong>WanderLuxe Expeditions</strong>
          </div>
          <div className="travel-nav-links">
            <a href="#tours">Destinations</a>
            <a href="#experience">Experiences</a>
            <a href="#reviews">Reviews</a>
            <button className="travel-nav-cta" onClick={() => setSelectedTour(destinations[0])}>
              Find My Trip
            </button>
          </div>
        </div>
      </nav>

      {/* Travel Hero */}
      <section className="travel-hero">
        <div className="travel-hero-content">
          <span className="travel-badge">Curated Handcrafted Luxury Journeys</span>
          <h1>Discover Extraordinary Places With Unmatched Comfort</h1>
          <p>
            Handcrafted travel itineraries with 5-star handpicked stays, private local guides, and zero hassle. Your dream vacation begins here.
          </p>

          <div className="travel-search-box">
            <div className="travel-input-group">
              <label>Destination / Country</label>
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="travel-input-group">
              <label>Travel Style</label>
              <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)}>
                {tags.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <button className="travel-search-btn" onClick={() => {
              const el = document.getElementById("tours");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}>
              Search Trips ➔
            </button>
          </div>
        </div>
      </section>

      {/* Destination Grid */}
      <section id="tours" className="travel-section">
        <div className="travel-container">
          <div className="travel-section-header">
            <h2>Trending Luxury Expeditions</h2>
            <p>Every itinerary is vetted and backed by 24/7 dedicated concierge assistance.</p>
          </div>

          <div className="travel-tag-filters">
            {tags.map((t) => (
              <button
                key={t}
                className={`travel-tag-btn ${filterTag === t ? "active" : ""}`}
                onClick={() => setFilterTag(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="travel-grid">
            {filtered.map((dest) => (
              <div key={dest.id} className="travel-card">
                <div className="travel-card-media">
                  <img src={dest.image} alt={dest.name} />
                  <span className="travel-card-pill">{dest.tag}</span>
                  <span className="travel-card-rating">★ {dest.rating}</span>
                </div>
                <div className="travel-card-body">
                  <div className="travel-card-meta">
                    <span>📍 {dest.country}</span>
                    <span>⏱ {dest.duration}</span>
                  </div>
                  <h3>{dest.name}</h3>
                  <p>{dest.description}</p>
                  <div className="travel-card-bottom">
                    <div>
                      <span className="travel-price-label">Starting from</span>
                      <div className="travel-price">${dest.price} <span>/ person</span></div>
                    </div>
                    <button
                      className="travel-book-btn"
                      onClick={() => {
                        setSelectedTour(dest);
                        setBookingConfirmed(false);
                      }}
                    >
                      Book Tour
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedTour && (
        <div className="travel-modal-backdrop" onClick={() => setSelectedTour(null)}>
          <div className="travel-modal" onClick={(e) => e.stopPropagation()}>
            <button className="travel-modal-close" onClick={() => setSelectedTour(null)}>✕</button>
            <div className="travel-modal-media">
              <img src={selectedTour.image} alt={selectedTour.name} />
              <div className="travel-modal-media-overlay">
                <h3>{selectedTour.name}</h3>
                <span>{selectedTour.country} • {selectedTour.duration}</span>
              </div>
            </div>

            <div className="travel-modal-body">
              <h4>Included Package Highlights:</h4>
              <ul className="travel-highlights-list">
                {selectedTour.highlights.map((h, i) => (
                  <li key={i}>✓ {h}</li>
                ))}
              </ul>

              <div className="travel-calc-box">
                <div className="travel-calc-row">
                  <label>Select Travelers:</label>
                  <div className="travelers-counter">
                    <button onClick={() => setTravelers(Math.max(1, travelers - 1))}>−</button>
                    <span>{travelers} Travelers</span>
                    <button onClick={() => setTravelers(travelers + 1)}>+</button>
                  </div>
                </div>
                <div className="travel-calc-total">
                  <span>Estimated Total:</span>
                  <strong>${selectedTour.price * travelers} USD</strong>
                </div>
              </div>

              {!bookingConfirmed ? (
                <button
                  className="travel-confirm-btn"
                  onClick={() => setBookingConfirmed(true)}
                >
                  Confirm Instant Reservation
                </button>
              ) : (
                <div className="travel-confirmed-banner">
                  🎉 Reservation confirmed for {travelers} traveler(s)! Itinerary &amp; boarding voucher sent to your inbox.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

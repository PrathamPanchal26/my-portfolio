import React, { useState, useEffect, useRef } from "react";

const bollywoodTracks = [
  {
    id: 1,
    title: "Kesariya",
    movie: "Brahmāstra",
    artist: "Arijit Singh, Pritam",
    duration: "4:28",
    durationSec: 268,
    category: "romantic",
    cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=400&q=80",
    freq: 440,
    lyrics: [
      "Kesariya tera ishq hai piya...",
      "Rang jaaun jo main haath lagaun...",
      "Din beete saara teri fikr mein...",
      "Rain saari teri khair manaun...",
      "Kajal ki siyahi se likhi...",
      "Hai tune jaane kitno ki love story...",
      "Kesariya tera ishq hai piya...",
    ],
  },
  {
    id: 2,
    title: "Tum Hi Ho",
    movie: "Aashiqui 2",
    artist: "Arijit Singh, Mithoon",
    duration: "4:22",
    durationSec: 262,
    category: "romantic",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80",
    freq: 392,
    lyrics: [
      "Hum tere bin ab reh nahi sakte...",
      "Tere bina kya wajood mera...",
      "Tujhse juda agar ho jaayenge...",
      "Toh khud se hi ho jaayenge judaa...",
      "Kyunki tum hi ho, ab tum hi ho...",
      "Zindagi ab tum hi ho...",
      "Chain bhi, mera dard bhi...",
      "Meri aashiqui ab tum hi ho...",
    ],
  },
  {
    id: 3,
    title: "Apna Bana Le",
    movie: "Bhediya",
    artist: "Arijit Singh, Sachin-Jigar",
    duration: "4:21",
    durationSec: 261,
    category: "romantic",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80",
    freq: 523.25,
    lyrics: [
      "Tu mera koi na hoke bhi kuch laage...",
      "Kiya re jo bhi tune kaise kiya re...",
      "Jiya ko mere baandh aise liya re...",
      "Samajh ke bhi na samajh main sakun...",
      "Apna bana le piya, apna bana le...",
      "Dil ke nagar mein shehar tu basa le...",
    ],
  },
  {
    id: 4,
    title: "Raataan Lambiyan",
    movie: "Shershaah",
    artist: "Jubin Nautiyal, Asees Kaur",
    duration: "3:50",
    durationSec: 230,
    category: "romantic",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80",
    freq: 349.23,
    lyrics: [
      "Teri meri gallan ho gayi mashhoor...",
      "Kar na kabhi tu mujhe nazron se door...",
      "Kithe chaliyan tu dhoop chhanv mein...",
      "Raataan lambiyan lambiyan re...",
      "Kate tere sangeyan sangeyan re...",
    ],
  },
  {
    id: 5,
    title: "Ghungroo",
    movie: "War",
    artist: "Arijit Singh, Shilpa Rao, Vishal-Shekhar",
    duration: "5:02",
    durationSec: 302,
    category: "party",
    cover: "https://images.unsplash.com/photo-1445985543469-433ecba627a0?auto=format&fit=crop&w=400&q=80",
    freq: 587.33,
    lyrics: [
      "Kyun lamhe kharaab karein...",
      "Aa ghalti behisaab karein...",
      "Do pal ki jo neend udi...",
      "Aankhon mein nasha gulab karein...",
      "Ghungroo toot gaye...",
      "Chhalke jaam se jaam...",
    ],
  },
  {
    id: 6,
    title: "Channa Mereya",
    movie: "Ae Dil Hai Mushkil",
    artist: "Arijit Singh, Pritam",
    duration: "4:49",
    durationSec: 289,
    category: "sufi",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80",
    freq: 329.63,
    lyrics: [
      "Achha chalta hoon, duaon mein yaad rakhna...",
      "Mere zikr ka zubaan pe swaad rakhna...",
      "Dil ke sandookon mein mere achhe kaam rakhna...",
      "Channa mereya mereya, channa mereya mereya...",
      "Beliya... o piya...",
    ],
  },
  {
    id: 7,
    title: "Kal Ho Naa Ho",
    movie: "Kal Ho Naa Ho",
    artist: "Sonu Nigam, Shankar-Ehsaan-Loy",
    duration: "5:21",
    durationSec: 321,
    category: "retro",
    cover: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=400&q=80",
    freq: 493.88,
    lyrics: [
      "Har ghadi badal rahi hai roop zindagi...",
      "Chhaanv hai kabhi, kabhi hai dhoop zindagi...",
      "Har pal yahan jee bhar jiyo...",
      "Jo hai samaa, kal ho naa ho...",
    ],
  },
  {
    id: 8,
    title: "Ilahi",
    movie: "Yeh Jawaani Hai Deewani",
    artist: "Arijit Singh, Pritam",
    duration: "3:49",
    durationSec: 229,
    category: "lofi",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80",
    freq: 440,
    lyrics: [
      "Shaamein malang si, raatein surang si...",
      "Baaghi udaan pe hi na jaane kyun...",
      "Ilahi mera jee aaye aaye...",
      "Kal pe sawaal hai, jeena filhaal hai...",
    ],
  },
];

export default function SpotifyBollywoodDemo() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [likedSongs, setLikedSongs] = useState([1, 2]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);

  // Web Audio synth synthesizer for realistic musical preview
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  const currentTrack = bollywoodTracks[currentTrackIndex];

  // Stop/Start audio synth
  const startAudioTone = (freq) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      // Stop old
      if (oscillatorRef.current) {
        try { oscillatorRef.current.stop(); } catch (e) {}
      }

      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const actualVol = isMuted ? 0 : (volume / 100) * 0.12;
      gain.gain.setValueAtTime(actualVol, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  };

  const stopAudioTone = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch (e) {}
      oscillatorRef.current = null;
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startAudioTone(currentTrack.freq);
    } else {
      stopAudioTone();
    }
    return () => stopAudioTone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const actualVol = isMuted ? 0 : (volume / 100) * 0.12;
      gainNodeRef.current.gain.setValueAtTime(actualVol, audioCtxRef.current.currentTime);
    }
  }, [volume, isMuted]);

  // Timer loop for song progress
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrack.durationSec) {
            if (isRepeating) return 0;
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, currentTrackIndex, isRepeating]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTime(0);
    if (isShuffling) {
      const nextIdx = Math.floor(Math.random() * bollywoodTracks.length);
      setCurrentTrackIndex(nextIdx);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % bollywoodTracks.length);
    }
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTime(0);
    setCurrentTrackIndex((prev) => (prev === 0 ? bollywoodTracks.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const playSong = (index) => {
    setCurrentTrackIndex(index);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedSongs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? "0" : ""}${remainder}`;
  };

  const filteredTracks = bollywoodTracks.filter((track) => {
    const matchesSearch =
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.movie.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || track.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="spotify-app">
      {/* Sidebar */}
      <aside className="spotify-sidebar">
        <div className="spotify-logo">
          <span className="spotify-icon">🟢</span>
          <div>
            <strong>Spotify</strong>
            <span className="spotify-badge">Bollywood Edition</span>
          </div>
        </div>

        <nav className="spotify-nav-menu">
          <button className={`spotify-nav-item ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
            <span>🏠</span> Home
          </button>
          <button className="spotify-nav-item" onClick={() => document.getElementById("spotify-search")?.focus()}>
            <span>🔍</span> Search Bollywood
          </button>
          <button className="spotify-nav-item" onClick={() => setShowLyrics(!showLyrics)}>
            <span>📜</span> {showLyrics ? "Hide Lyrics" : "Live Lyrics"}
          </button>
        </nav>

        <div className="spotify-divider"></div>

        <div className="spotify-playlists-section">
          <div className="spotify-section-label">PLAYLISTS &amp; MOODS</div>
          <button
            className={`spotify-playlist-btn ${activeTab === "romantic" ? "active" : ""}`}
            onClick={() => setActiveTab("romantic")}
          >
            ❤️ Arijit Singh Romantic
          </button>
          <button
            className={`spotify-playlist-btn ${activeTab === "party" ? "active" : ""}`}
            onClick={() => setActiveTab("party")}
          >
            💃 Bollywood Party 2025
          </button>
          <button
            className={`spotify-playlist-btn ${activeTab === "sufi" ? "active" : ""}`}
            onClick={() => setActiveTab("sufi")}
          >
            🕊️ Soulful &amp; Sufi Beats
          </button>
          <button
            className={`spotify-playlist-btn ${activeTab === "lofi" ? "active" : ""}`}
            onClick={() => setActiveTab("lofi")}
          >
            🌙 Late Night Lo-Fi
          </button>
          <button
            className={`spotify-playlist-btn ${activeTab === "retro" ? "active" : ""}`}
            onClick={() => setActiveTab("retro")}
          >
            📻 90s &amp; 2000s Classics
          </button>
        </div>

        <div className="spotify-liked-summary">
          <span>💖 Liked Songs</span>
          <span className="spotify-liked-count">{likedSongs.length} songs</span>
        </div>
      </aside>

      {/* Main Container */}
      <main className="spotify-main">
        {/* Top Header */}
        <header className="spotify-topbar">
          <div className="spotify-search-wrapper">
            <span className="spotify-search-icon">🔍</span>
            <input
              id="spotify-search"
              type="text"
              placeholder="Search Hindi songs, artists (Arijit, Jubin, Pritam), movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="spotify-search-input"
            />
          </div>

          <div className="spotify-user-profile">
            <span className="spotify-avatar">🇮🇳</span>
            <span className="spotify-username">Bollywood Lover</span>
          </div>
        </header>

        {/* Featured Hero Banner */}
        <div className="spotify-hero-banner">
          <div className="spotify-banner-cover">
            <img src={currentTrack.cover} alt={currentTrack.title} />
          </div>
          <div className="spotify-banner-info">
            <span className="spotify-tag">VERIFIED PLAYLIST</span>
            <h1>Bollywood Top Hits 2025</h1>
            <p>The biggest Hindi melodies dominating charts — featuring Arijit Singh, Jubin Nautiyal, Pritam &amp; more.</p>
            <div className="spotify-banner-meta">
              <span>🟢 Spotify Original</span>
              <span>• {bollywoodTracks.length} tracks</span>
              <span>• 2,840,910 likes</span>
            </div>
            <div className="spotify-banner-actions">
              <button className="spotify-play-big-btn" onClick={togglePlay}>
                {isPlaying ? "⏸ Pause" : "▶ Play All"}
              </button>
              <button
                className={`spotify-heart-btn ${likedSongs.includes(currentTrack.id) ? "liked" : ""}`}
                onClick={(e) => toggleLike(currentTrack.id, e)}
              >
                {likedSongs.includes(currentTrack.id) ? "❤️ Liked" : "🤍 Like"}
              </button>
              <button className="spotify-lyrics-toggle-btn" onClick={() => setShowLyrics(!showLyrics)}>
                {showLyrics ? "🎵 Hide Lyrics View" : "📜 Show Live Lyrics"}
              </button>
            </div>
          </div>
        </div>

        {/* Split View: Track list + Lyrics */}
        <div className="spotify-content-split">
          <div className="spotify-tracks-container">
            {/* Filter Pills */}
            <div className="spotify-mood-pills">
              <button className={`spotify-pill ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>All Tracks</button>
              <button className={`spotify-pill ${activeTab === "romantic" ? "active" : ""}`} onClick={() => setActiveTab("romantic")}>❤️ Romantic</button>
              <button className={`spotify-pill ${activeTab === "party" ? "active" : ""}`} onClick={() => setActiveTab("party")}>💃 Party</button>
              <button className={`spotify-pill ${activeTab === "sufi" ? "active" : ""}`} onClick={() => setActiveTab("sufi")}>🕊️ Sufi</button>
              <button className={`spotify-pill ${activeTab === "lofi" ? "active" : ""}`} onClick={() => setActiveTab("lofi")}>🌙 Lo-Fi</button>
              <button className={`spotify-pill ${activeTab === "retro" ? "active" : ""}`} onClick={() => setActiveTab("retro")}>📻 Nostalgia</button>
            </div>

            {/* Table of Songs */}
            <div className="spotify-table">
              <div className="spotify-table-header">
                <span className="col-num">#</span>
                <span className="col-title">Title &amp; Movie</span>
                <span className="col-artist">Artist</span>
                <span className="col-time">Time</span>
                <span className="col-action"></span>
              </div>

              {filteredTracks.map((track, i) => {
                const isSelected = track.id === currentTrack.id;
                const isItemPlaying = isSelected && isPlaying;
                const isLiked = likedSongs.includes(track.id);

                return (
                  <div
                    key={track.id}
                    className={`spotify-row ${isSelected ? "active" : ""}`}
                    onClick={() => playSong(bollywoodTracks.findIndex((t) => t.id === track.id))}
                  >
                    <span className="col-num">
                      {isItemPlaying ? (
                        <div className="spotify-wave-anim">
                          <span></span><span></span><span></span>
                        </div>
                      ) : (
                        i + 1
                      )}
                    </span>
                    <div className="col-title-cell">
                      <img src={track.cover} alt={track.title} className="track-thumb" />
                      <div>
                        <div className={`track-title ${isSelected ? "playing-color" : ""}`}>
                          {track.title}
                        </div>
                        <div className="track-sub">From "{track.movie}"</div>
                      </div>
                    </div>
                    <span className="col-artist">{track.artist}</span>
                    <span className="col-time">{track.duration}</span>
                    <span className="col-action">
                      <button
                        className={`row-like-btn ${isLiked ? "liked" : ""}`}
                        onClick={(e) => toggleLike(track.id, e)}
                      >
                        {isLiked ? "❤️" : "🤍"}
                      </button>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lyrics Panel */}
          {showLyrics && (
            <aside className="spotify-lyrics-panel">
              <div className="spotify-lyrics-header">
                <h3>Live Hindi Lyrics</h3>
                <span className="spotify-lyrics-track">{currentTrack.title} — {currentTrack.movie}</span>
              </div>
              <div className="spotify-lyrics-body">
                {currentTrack.lyrics.map((line, idx) => (
                  <p
                    key={idx}
                    className={`lyric-line ${
                      idx === Math.floor((currentTime / currentTrack.durationSec) * currentTrack.lyrics.length)
                        ? "highlight-lyric"
                        : ""
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </aside>
          )}
        </div>
      </main>

      {/* Bottom Sticky Player */}
      <footer className="spotify-player-bar">
        {/* Left Track Info */}
        <div className="spotify-player-left">
          <img src={currentTrack.cover} alt={currentTrack.title} className="player-cover" />
          <div className="player-meta">
            <span className="player-title">{currentTrack.title}</span>
            <span className="player-artist">{currentTrack.artist} • {currentTrack.movie}</span>
          </div>
          <button
            className={`player-heart ${likedSongs.includes(currentTrack.id) ? "liked" : ""}`}
            onClick={(e) => toggleLike(currentTrack.id, e)}
          >
            {likedSongs.includes(currentTrack.id) ? "❤️" : "🤍"}
          </button>
        </div>

        {/* Center Controls */}
        <div className="spotify-player-center">
          <div className="player-controls">
            <button
              className={`ctrl-btn ${isShuffling ? "active-ctrl" : ""}`}
              onClick={() => setIsShuffling(!isShuffling)}
              title="Shuffle"
            >
              🔀
            </button>
            <button className="ctrl-btn" onClick={handlePrev} title="Previous">
              ⏮
            </button>
            <button className="play-pause-circle" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button className="ctrl-btn" onClick={handleNext} title="Next">
              ⏭
            </button>
            <button
              className={`ctrl-btn ${isRepeating ? "active-ctrl" : ""}`}
              onClick={() => setIsRepeating(!isRepeating)}
              title="Repeat"
            >
              🔁
            </button>
          </div>

          <div className="player-progressbar-wrap">
            <span className="time-label">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={currentTrack.durationSec}
              value={currentTime}
              onChange={(e) => setCurrentTime(Number(e.target.value))}
              className="player-slider"
            />
            <span className="time-label">{currentTrack.duration}</span>
          </div>
        </div>

        {/* Right Volume & Tools */}
        <div className="spotify-player-right">
          <button
            className={`lyrics-icon-btn ${showLyrics ? "active" : ""}`}
            onClick={() => setShowLyrics(!showLyrics)}
            title="Lyrics"
          >
            🎤
          </button>
          <button className="vol-icon-btn" onClick={() => setIsMuted(!isMuted)}>
            {isMuted || volume === 0 ? "🔇" : volume < 50 ? "🔉" : "🔊"}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="vol-slider"
          />
        </div>
      </footer>
    </div>
  );
}

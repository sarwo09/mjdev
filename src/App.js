import { useState, useEffect } from 'react';
import './App.css';
import { getMovieList, searchMovie } from './api';

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    getMovieList().then((result) => setPopularMovies(result));

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const PopularMovieList = () => {
    if (popularMovies.length === 0) {
      return (
        <div
          style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '40px',
            color: '#888',
          }}
        >
          {isSearching ? '🔍 Mencari film...' : '📽️ Tidak ada film ditemukan'}
        </div>
      );
    }

    return popularMovies.map((movie, i) => (
      <div className="Movie-card" key={i}>
        <div className="Movie-image-container">
          <img
            className="Movie-image"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
            alt={movie.title}
            onError={(e) => {
              e.target.src =
                'https://via.placeholder.com/240x360/1a1a1a/e50914?text=No+Image';
            }}
          />
        </div>
        <div className="Movie-info">
          <h3 className="Movie-title">{movie.title}</h3>
          <p className="Movie-date">🎬 {movie.release_date || 'Coming Soon'}</p>
          <span className="Movie-rate">
            ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
          </span>
        </div>
      </div>
    ));
  };

  const search = async (q) => {
    const query = q.trim();
    if (query.length > 3) {
      setIsSearching(true);
      try {
        const result = await searchMovie(query);
        setPopularMovies(result.results || []);
      } catch (error) {
        console.error('Error searching movies:', error);
        setPopularMovies([]);
      } finally {
        setIsSearching(false);
      }
    } else if (query.length === 0) {
      setIsSearching(true);
      try {
        const result = await getMovieList();
        setPopularMovies(result);
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="App">
      {/* NAVBAR */}
      <nav className={`App-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="App-logo">🎞 NETFLUX</div>
        <ul className="App-nav">
          <li>
            <a href="#home" onClick={(e) => scrollToSection(e, 'home')}>
              Home
            </a>
          </li>
          <li>
            <a href="#trending" onClick={(e) => scrollToSection(e, 'trending')}>
              Trending
            </a>
          </li>
          <li>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>
              About
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* HERO SECTION */}
      <section className="App-hero" id="home">
        <div className="App-hero-content">
          <h1 className="App-hero-title">NETFLUX</h1>
          <p className="App-hero-tagline">
            Temukan Film Favoritmu – Dari Bioskop Dunia Hingga Karya Anak Bangsa
          </p>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="App-search-section">
        <input
          type="text"
          placeholder="🔍 Cari Film Favoritmu..."
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
      </section>

      {/* MOVIE GALLERY */}
      <main className="App-content" id="trending">
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </main>

      {/* ABOUT SECTION */}
      <section className="App-about" id="about">
        <div className="App-about-container">
          <h2 className="App-about-title">
            Tentang <span>NETFLUX</span>
          </h2>
          <p className="App-about-text">
            NETFLUX adalah platform pencarian film yang dirancang untuk para pecinta
            film di seluruh dunia. Kami menghadirkan informasi akurat seputar film-film
            populer — mulai dari rating, tanggal rilis, hingga poster dan detail menarik
            lainnya. Temukan inspirasi tontonan baru, dan jelajahi dunia sinema tanpa batas.
          </p>
        </div>
      </section>

      {/* FOOTER (Contact Section) */}
      <footer className="App-footer" id="contact">
        <div className="App-footer-content">
          
          <div className="App-contact">
            <h3>Hubungi Kami</h3>
            <p>
              📩 Email: <a href="mailto:support@netflux.com">support@netflux.com</a><br />
              📍 Alamat: Yogyakarta, Indonesia<br />
              📞 Telepon: +62 812-3456-7890
            </p>
          </div>

          <div className="App-footer-line"></div>

          <div className="App-footer-logo">NETFLUX</div>

          <p className="App-footer-text">
            © 2025 <span>NETFLUX</span> — Streaming Inspirasi, Nikmati Hiburan Tanpa Batas.<br />
            Dibangun dengan ❤️ oleh Movie Lovers.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
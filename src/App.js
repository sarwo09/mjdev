import { useState, useEffect } from 'react';
import './App.css';
import { getMovieList, searchMovie } from './api';

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => (
      <div className="Movie-card" key={i}>
        <div className="Movie-image-container">
          <img
            className="Movie-image"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="Movie-info">
          <h3 className="Movie-title">{movie.title}</h3>
          <p className="Movie-date">🎬 {movie.release_date}</p>
          <span className="Movie-rate">⭐ {movie.vote_average}</span>
        </div>
      </div>
    ));
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">🎞 NETFLUX</h1>
        <input
          placeholder="Cari Film Favoritmu..."
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;

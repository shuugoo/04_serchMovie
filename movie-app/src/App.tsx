import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard.tsx";

type Movie = {
  id: string;
  original_title: string;
  poster_path: string;
  overview: string;
};

type MovieJson = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

function App() {
  const [keyword, setKeyword] = useState("");
  const [movieList, setMovieList] = useState<Movie[]>([]);

  const fetchMovieList = async () => {
    let url = "";
    if (keyword) {
      url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ja&page=1`;
    } else {
      url = "https://api.themoviedb.org/3/movie/popular?language=ja&page=1";
    }
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
    });

    const data = await response.json();
    setMovieList(
      data.results.map((movie: MovieJson) => ({
        id: movie.id,
        original_title: movie.original_title,
        overview: movie.overview,
        poster_path: movie.poster_path,
      }))
    );
  };

  useEffect(() => {
    fetchMovieList();
  }, [keyword]);

  const heroTitle = "ズートピア";
  const heroYear = 2016;
  const heroOverview =
    "肉食動物と草食動物が仲良く暮らせる世界。田舎で生まれ育ったウサギのジュディは警察学校を首席で卒業しウサギ初の警官として大都市「ズートピア」の警察署に配属されるが、駐車違反の取り締まりという平凡な任務を与えられたことを不満に思う。そんなジュディは詐欺師のキツネ、ニックと出会った後、カワウソが失踪した事件の捜査を担当することになったが、それは巨大な陰謀につながる大事件だった。";
  const heroImage =
    "https://media.themoviedb.org/t/p/w600_and_h900_face/oqlsQwZN1Umt9rX9t2LaN5RhwhX.jpg";

  return (
    <div className="app-page">
      <section className="hero-section">
        {heroImage && (
          <>
            <img className="hero-section-bg" src={heroImage} alt={heroTitle} />
            <div className="hero-section-gradient" />
          </>
        )}
        <div className="hero-section-content">
          <h1 className="hero-section-title">{heroTitle}</h1>
          <div className="hero-section-badges">
            <span className="hero-section-badge">{heroYear}</span>
          </div>
          {heroOverview && (
            <p className="hero-section-overview">{heroOverview}</p>
          )}
          <div className="hero-section-actions">
            <button className="hero-section-btn hero-section-btn-primary">
              <span>▶ Play</span>
            </button>
            <button className="hero-section-btn hero-section-btn-secondary">
              <span>More Info</span>
            </button>
          </div>
        </div>
      </section>
      <section className="movie-row-section">
        <h2 className="movie-row-title">
          {keyword ? `「${keyword}」の検索結果` : "人気映画"}
        </h2>
        <div className="movie-row-scroll">
          {movieList.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </section>
      <div className="app-search-wrap">
        <input
          type="text"
          className="app-search"
          placeholder="映画タイトルで検索..."
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
    </div>
  );
}

export default App;
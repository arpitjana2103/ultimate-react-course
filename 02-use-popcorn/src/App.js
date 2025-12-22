import { useEffect, useState } from "react";
import Logo from "./components/Logo";
import SearchBox from "./components/SearchBox";
import MovieLength from "./components/MovieLength";
import MoviesList from "./components/MoviesList";
import WatchedMovieSummery from "./components/WatchedMovieSummery";
import WatchedMoviesList from "./components/WatchedMoviesList";
import MovieDetails from "./components/MovieDetails";
import Loader from "./components/Loader";

const tempMovieData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
        imdbID: "tt0133093",
        Title: "The Matrix",
        Year: "1999",
        Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    },
    {
        imdbID: "tt6751668",
        Title: "Parasite",
        Year: "2019",
        Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    },
];

const tempWatchedData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: "tt0088763",
        Title: "Back to the Future",
        Year: "1985",
        Poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];

const KEY = `d372492d`;
const baseURL = `http://www.omdbapi.com/?apikey=${KEY}`;

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [query, setQuery] = useState("spider");
    const [error, setError] = useState(null);
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    function handleCloseMovie() {
        setSelectedMovieId(null);
    }

    function onAddWatchList(movie) {
        const watchMovieObj = {
            imdbID: movie.imdbID,
            Title: movie.Title,
            Year: movie.Year,
            Poster: movie.Poster,
            runtime: Number(movie.Runtime.split(" ").at(0)),
            imdbRating: Number(movie.imdbRating),
            userRating: movie.userRating,
        };

        setWatched((watched) => ({
            ...watched,
            [movie.imdbID]: watchMovieObj,
        }));
    }

    useEffect(
        function () {
            const fetchMovies = async function () {
                setLoading(true);
                setError(null);
                try {
                    const res = await fetch(`${baseURL}&s=${query}`);
                    const data = await res.json();
                    const movies = data.Search;
                    if (!movies) throw new Error("😵‍💫 Movie Not Found");
                    setMovies(movies);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };

            if (query.length > 3) fetchMovies();
        },
        [query]
    );

    return (
        <>
            <NavBar>
                <Logo />
                <SearchBox query={query} onQueryChange={setQuery} />
                <MovieLength movies={movies} />
            </NavBar>
            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {error && <ErrorMessage errorText={error} />}
                    {!isLoading && !error && (
                        <MoviesList
                            onSelectMovie={setSelectedMovieId}
                            movies={movies}
                        />
                    )}
                </Box>
                <Box>
                    {selectedMovieId && (
                        <MovieDetails
                            imdbID={selectedMovieId}
                            onCloseMovie={handleCloseMovie}
                            onAddWatchList={onAddWatchList}
                            key={selectedMovieId}
                            inWatchedList={Object.hasOwn(
                                watched,
                                selectedMovieId
                            )}
                            prevUserRating={
                                watched[selectedMovieId]?.userRating ?? null
                            }
                        />
                    )}
                    {!selectedMovieId && (
                        <>
                            <WatchedMovieSummery
                                watched={Object.values(watched)}
                            />
                            <WatchedMoviesList
                                watched={Object.values(watched)}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}

function ErrorMessage({ errorText }) {
    return (
        <div className="middle-container">
            <h1>{errorText}</h1>
        </div>
    );
}

function NavBar({ children }) {
    return <nav className="nav-bar">{children}</nav>;
}

function Main({ children }) {
    return <main className="main">{children}</main>;
}

function Box({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && children}
        </div>
    );
}

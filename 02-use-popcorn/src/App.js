import { useState } from "react";
import Logo from "./components/Logo";
import SearchBox from "./components/SearchBox";
import MovieLength from "./components/MovieLength";
import MoviesList from "./components/MoviesList";
import WatchedMovieSummery from "./components/WatchedMovieSummery";
import WatchedMoviesList from "./components/WatchedMoviesList";
import MovieDetails from "./components/MovieDetails";
import Loader from "./components/Loader";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
    const [query, setQuery] = useState("spider");
    const [watched, setWatched] = useLocalStorage({}, "watched");
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const { movies, isLoading, error } = useMovies(query);

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
                            watched={watched}
                            key={selectedMovieId}
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

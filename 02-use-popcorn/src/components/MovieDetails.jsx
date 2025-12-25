import { useEffect, useState } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";
import { useKey } from "../hooks/useKey";

const KEY = `d372492d`;
const baseURL = `http://www.omdbapi.com/?apikey=${KEY}`;

function MovieDetails({ imdbID, onCloseMovie, onAddWatchList, watched }) {
    const prevUserRating = watched[imdbID]?.userRating ?? null;
    const inWatchedList = watched.hasOwnProperty(imdbID);

    const [movie, setMovie] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [userRating, setUserRating] = useState(prevUserRating);

    const {
        Title: title,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    const handleAddMovieToWatchList = function () {
        movie.userRating = userRating;
        onAddWatchList(movie);
    };

    useEffect(
        function () {
            const fetchMovies = async function () {
                setLoading(true);
                const res = await fetch(`${baseURL}&i=${imdbID}`);
                const data = await res.json();
                setMovie(data);
                setLoading(false);
            };

            fetchMovies();
        },
        [imdbID]
    );

    useEffect(
        function () {
            if (title) {
                document.title = title;
            }

            if (isLoading) {
                document.title = "Loading...";
            }

            return function () {
                document.title = "usePopcorn";
            };
        },
        [title, isLoading]
    );

    useKey(onCloseMovie, "Escape");

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="details">
            <>
                <header>
                    <button className="btn-back" onClick={onCloseMovie}>
                        &larr;
                    </button>
                    <img src={poster} alt={`Poster of ${movie} movie`} />
                    <div className="details-overview">
                        <h2>{title}</h2>
                        <p>
                            {released} &bull; {runtime}
                        </p>
                        <p>{genre}</p>
                        <p>
                            <span>⭐️</span>
                            {imdbRating} IMDb rating
                        </p>
                    </div>
                </header>
                <section>
                    <div className="rating">
                        <StarRating
                            maxRating={10}
                            defaultRating={userRating}
                            rating={userRating}
                            onRatingChange={setUserRating}
                        />

                        {(userRating || inWatchedList) && (
                            <button
                                className="btn-add"
                                onClick={handleAddMovieToWatchList}
                            >
                                {inWatchedList
                                    ? prevUserRating !== userRating
                                        ? "Update Rating"
                                        : "Added to watched list"
                                    : "+ Add to WatchList"}
                            </button>
                        )}
                    </div>
                    <p>
                        <em>{plot}</em>
                    </p>
                    <p>Starring {actors}</p>
                    <p>Directed by {director}</p>
                </section>
            </>
        </div>
    );
}

export default MovieDetails;

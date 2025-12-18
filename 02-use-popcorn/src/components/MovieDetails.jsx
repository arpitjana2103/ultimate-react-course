import { useEffect, useState } from "react";
import Loader from "./Loader";

const KEY = `d372492d`;
const baseURL = `http://www.omdbapi.com/?apikey=${KEY}`;

function MovieDetails({ selectedId, onCloseMovie }) {
    const [movie, setMovie] = useState({});
    const [isLoading, setLoading] = useState(false);

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    useEffect(
        function () {
            const fetchMovies = async function () {
                setLoading(true);
                const res = await fetch(`${baseURL}&i=${selectedId}`);
                const data = await res.json();
                setMovie(data);
                setLoading(false);
            };

            fetchMovies();
        },
        [selectedId]
    );

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
                    <div className="rating">StarRating</div>
                    <p>
                        <em>{plot}</em>
                    </p>
                    <p>Starring {actors}</p>
                    <p>Directed by {director}</p>
                </section>
            </>
            )
        </div>
    );
}

export default MovieDetails;

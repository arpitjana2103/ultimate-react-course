import { useEffect, useState } from "react";

const KEY = `d372492d`;
const baseURL = `http://www.omdbapi.com/?apikey=${KEY}`;

export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(
        function () {
            const controller = new AbortController();
            const fetchMovies = async function () {
                setLoading(true);
                setError(null);
                try {
                    const res = await fetch(`${baseURL}&s=${query}`, {
                        signal: controller.signal,
                    });
                    const data = await res.json();
                    const movies = data.Search;
                    console.log(query, movies);
                    if (!movies) throw new Error("😵‍💫 Movie Not Found");

                    // setError(null);
                    setMovies(movies);
                } catch (error) {
                    if (error.name === "AbortError") return;
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };

            if (query.length > 3) fetchMovies();

            return function () {
                controller.abort();
                console.log(query, "Aborted..");
            };
        },
        [query]
    );

    return { movies, isLoading, error };
}

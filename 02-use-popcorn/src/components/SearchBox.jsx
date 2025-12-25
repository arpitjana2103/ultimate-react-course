import { useEffect, useRef } from "react";

function SearchBox({ query, onQueryChange }) {
    const inputEl = useRef(null);

    useEffect(
        function () {
            function callback(e) {
                if (document.activeElement === inputEl.current) return;
                if (e.code === "Enter") {
                    inputEl.current.focus();
                    onQueryChange("");
                }
            }
            document.addEventListener("keydown", callback);
            return function () {
                document.removeEventListener("keydown", callback);
            };
        },
        [onQueryChange]
    );
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            ref={inputEl}
        />
    );
}

export default SearchBox;

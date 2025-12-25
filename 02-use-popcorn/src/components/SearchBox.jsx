import { useEffect, useRef } from "react";
import { useKey } from "../hooks/useKey";

function SearchBox({ query, onQueryChange }) {
    const inputEl = useRef(null);

    useKey(function () {
        if (document.activeElement === inputEl.current) return;
        inputEl.current.focus();
        onQueryChange("");
    }, "Enter");

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

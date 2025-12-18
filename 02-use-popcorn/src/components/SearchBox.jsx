import { useState } from "react";

function SearchBox({ query, onQueryChange }) {
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
        />
    );
}

export default SearchBox;

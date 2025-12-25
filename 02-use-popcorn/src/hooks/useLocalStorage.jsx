import { useEffect, useState } from "react";

export function useLocalStorage(initialState, key) {
    const [data, setData] = useState(function () {
        const data = localStorage.getItem(key);
        return JSON.parse(data) || initialState;
    });
    useEffect(
        function () {
            localStorage.setItem(key, JSON.stringify(data));
        },
        [data, key]
    );

    return [data, setData];
}

import { useEffect } from "react";

export function useKey(actionFn, key) {
    useEffect(
        function () {
            function callback(e) {
                if (e.code.toLowerCase() === key.toLowerCase()) {
                    actionFn();
                }
            }
            document.addEventListener("keydown", callback);

            return function () {
                document.removeEventListener("keydown", callback);
            };
        },
        [actionFn, key]
    );
}

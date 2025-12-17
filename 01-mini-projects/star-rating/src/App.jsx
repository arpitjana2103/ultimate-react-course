import { useState } from "react";
import StarRating from "./StarRating";

function App() {
    const [rating, setRating] = useState(0);

    function onRatingChange(r) {
        setRating(r);
    }

    return (
        <StarRating
            ratingBoxStyle={{
                display: "flex",
                gap: "1rem",
                fontSize: "0.8rem",
                alignItems: "center",
            }}
            starBoxStyle={{ display: "flex", gap: "0rem" }}
            starStyle={{
                color: "blue",
                fontSize: "15px",
                padding: "0.2rem",
            }}
            maxRating={10}
            showRating={false}
            rating={rating}
            onRatingChange={onRatingChange}
        />
    );
}

export default App;

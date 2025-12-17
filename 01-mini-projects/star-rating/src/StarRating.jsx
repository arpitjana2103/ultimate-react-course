import { useState } from "react";

function StarRating({
    ratingBoxStyle,
    starBoxStyle,
    starStyle,
    maxRating = 5,
    defaultRating = 3,
    showRating = true,
    rating,
    onRatingChange,
}) {
    const [tempRating, setTempRating] = useState(defaultRating);

    return (
        <div className="rating-box" style={ratingBoxStyle}>
            <span className="star-box" style={starBoxStyle}>
                {new Array(maxRating).fill(0).map(function (_, i) {
                    return (
                        <Star
                            style={starStyle}
                            filled={i + 1 <= tempRating}
                            onClick={() => onRatingChange(i + 1)}
                            onMouseEnter={() => setTempRating(i + 1)}
                            onMouseLeave={() =>
                                setTempRating(rating || defaultRating)
                            }
                            key={i}
                        />
                    );
                })}
            </span>
            {showRating && (
                <span>{tempRating !== rating ? tempRating : rating}</span>
            )}
        </div>
    );
}

function Star({ style, filled, onClick, onMouseEnter, onMouseLeave }) {
    return (
        <span
            className="star"
            style={style}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <ion-icon name={`${!filled ? "star-outline" : "star"}`}></ion-icon>
        </span>
    );
}

export default StarRating;

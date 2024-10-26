"use client";

import { StarIcon } from "lucide-react";
import { useState } from "react";

const MAX_RATING = 5;
const MIN_RATING = 1;

const StarRating = () => {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING)) * MIN_RATING
  );

  return (
    <div className="flex">
      {Array(rating)
        .fill(null)
        .map((_, index) => (
          <StarIcon className="text-yellow-500 h-5" key={index} />
        ))}
    </div>
  );
};

export default StarRating;

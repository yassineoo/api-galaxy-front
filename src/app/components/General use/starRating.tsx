// StarRating.tsx
'use client'
import { useState } from 'react';
import { FC } from "react";


interface StarProps {
  filled: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

const Star: React.FC<StarProps> = ({ filled, onMouseEnter, onMouseLeave, onClick }) => {
  return (
    <svg
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`h-6 w-6 cursor-pointer transition-colors duration-150 ease-in-out ${filled ? 'text-yellow-400' : 'text-gray-400'
        }`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 .587l3.695 7.486 8.305 1.209-6 5.84 1.42 8.283L12 18.763l-7.42 3.642L6 15.122l-6-5.84 8.305-1.209L12 .587z" />
    </svg>
  );
};

interface StarRatingProps {
  totalStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;

        return (
          <Star
            key={index}
            filled={ratingValue <= (hover || rating)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
            onClick={() => setRating(ratingValue)}
          />
        );
      })}
    </div>
  );
};


interface StarNumberProps {
  ratingValue: number;
}

const StarsForDisplay: FC<StarNumberProps> = ({ratingValue}) => {
  return (
    <>
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            filled={ index < ratingValue}
          />
        ))}
      </div>
    </>
  );
}

export { StarRating, StarsForDisplay}


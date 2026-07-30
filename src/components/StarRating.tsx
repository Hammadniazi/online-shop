interface StarRatingProps {
  rating: number;
  max?: number;
  className?: string;
}

const Star = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 20 20"
    className="w-4 h-4"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={filled ? 0 : 1.5}
    aria-hidden="true"
  >
    <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.09.99 5.77L10 14.77l-5.18 2.68.99-5.77L1.62 7.59l5.79-.84L10 1.5z" />
  </svg>
);

export const StarRating = ({ rating, max = 5, className = "" }: StarRatingProps) => {
  const filledCount = Math.round(rating);

  return (
    <div
      className={`flex items-center gap-0.5 text-yellow-400 ${className}`}
      role="img"
      aria-label={`${rating} out of ${max} stars`}
    >
      {[...Array(max)].map((_, i) => (
        <Star key={i} filled={i < filledCount} />
      ))}
    </div>
  );
};

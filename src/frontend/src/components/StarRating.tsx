interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
}

export function StarRating({
  rating,
  reviewCount,
  size = "md",
}: StarRatingProps) {
  const starSize = size === "sm" ? "text-sm" : "text-base";
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating);
    const half = !filled && i < rating;
    return { filled, half, pos: i };
  });

  return (
    <div className="flex items-center gap-1">
      <div className={`flex ${starSize}`}>
        {stars.map((s) => (
          <span
            key={`star-${s.pos}`}
            className={
              s.filled
                ? "star-filled"
                : s.half
                  ? "star-filled opacity-60"
                  : "star-empty"
            }
          >
            &#9733;
          </span>
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-amazon-link-blue text-sm hover:text-amazon-orange cursor-pointer">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}

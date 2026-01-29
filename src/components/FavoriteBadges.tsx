import React from "react";

interface FavItem {
  label: string;
  reveal: string;
}

const favorites: FavItem[] = [
  { label: "F1 Team", reveal: "Red Bull Racing" },
  { label: "Game", reveal: "Elden Ring" },
  { label: "Food", reveal: "Spicy Chicken Sandwich" },
  { label: "Music Artist", reveal: "The Weeknd" },
  { label: "Programming Lang", reveal: "Rust" },
];

const FavoriteBadges: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-3">
      {favorites.map((fav) => {
        const largest =
          fav.label.length > fav.reveal.length ? fav.label : fav.reveal;

        return (
          <div
            key={fav.label}
            className="
              group relative inline-flex items-center justify-center 
              px-4 py-2 rounded-full border min-w-max
              bg-cardSecondary text-textSecondary font-mono
              hover:bg-secondary hover:text-background
              transition-colors duration-200
            "
          >
            <span className="invisible">{largest}</span>
            <span
              className="
                absolute inset-0 flex items-center justify-center
                opacity-100 group-hover:opacity-0
                transition-opacity duration-200
              "
            >
              {fav.label}
            </span>

            <span
              className="
                absolute inset-0 flex text-text items-center justify-center
                opacity-0 group-hover:opacity-100
                transition-opacity duration-200
              "
            >
              {fav.reveal}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default FavoriteBadges;

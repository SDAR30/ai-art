import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const CardStarRating = ({ value, text, color }) => {
  return (
    <div className="rating">
      <span>
        {[...Array(Math.floor(value))].map((key) => (
          <i key={key} color="primary" className={<StarIcon />} />
        ))}
        {value - Math.floor(value) && (
          <i color="primary" className={<StarHalfIcon />} />
        )}
        {[...Array(5 - Math.ceil(value))].map((key) => (
          <i key={key} color="primary" className={<StarBorderIcon />} />
        ))}
      </span>
      <span>{text && text}</span>
    </div>
  );
};

export default CardStarRating;
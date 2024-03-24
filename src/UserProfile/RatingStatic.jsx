import { Rating } from "@material-tailwind/react";
import React from "react";

function RatingStatic({ rating }) {
  return (
    <Rating
      value={rating}
      readonly
      className="scale-75 -translate-x-4 text-amber-500"
    />
  );
}

export default RatingStatic;

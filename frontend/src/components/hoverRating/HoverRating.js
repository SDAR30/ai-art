import React, {useState, useEffect} from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  0.5: 'Horrible',
  1: 'Bad',
  1.5: 'Poor',
  2: 'Mediocre',
  2.5: 'Ok',
  3: 'Decent',
  3.5: 'Good',
  4: 'Great',
  4.5: 'Amazing!',
  5: 'Incredible!!',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating({rating, submitRating}) {
  const [value, setValue] = useState(2.5);
  const [hover, setHover] = useState(-1);

  useEffect(() => {
    if(rating)
    setValue(rating);
  }, [rating]) //runs when rating changes

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={rating || value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
          submitRating(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
import { HalfStarIcon } from '../assets/HalfStarIcon';
import { StarIcon } from '../assets/StarIcon';
import PropTypes from 'prop-types';

export const ReviewStars = ({ rating }) => {
  const maxStars = 5;
  const fullStars = Math.trunc(rating);
  const halfStars = Math.round(rating % 1);
  const renderedStars = [];
  for (let i = 0; i < maxStars; i++) {
    if (i < fullStars) {
      renderedStars.push(<StarIcon key={i} isFilled={true} />);
    } else if (i === fullStars && halfStars > 0) {
      renderedStars.push(<HalfStarIcon key={i} />);
    } else {
      renderedStars.push(<StarIcon key={i} isFilled={false} />);
    }
  }
  return <div>{renderedStars}</div>;
};

ReviewStars.propTypes = {
  rating: PropTypes.number,
};

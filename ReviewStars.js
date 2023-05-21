import React from "react";
import { View, Text } from "react-native";
import styled from 'styled-components/native';

const StarRating = styled(View)`
  flex-direction: row;
  font-size: 0;
  margin-left: 5px;
`;

const StarLabel = styled(Text)`
  font-size: 24px;
  color: ${({ filled }) => (filled ? "gold" : "lightgrey")};
`;

const ReviewStars = ({ starAverage }) => {
  const numStars = Math.round(starAverage);

  const renderStars = (count, filled) => {
    if (isNaN(count) || count <= 0) return null;

    return Array.from({ length: count }).map((_, index) => (
      <StarLabel key={index} filled={filled}>
        ★
      </StarLabel>
    ));
  };

  return (
    <StarRating>
      {renderStars(numStars, true)}
      {renderStars(5 - numStars, false)}
    </StarRating>
  );
};

export default ReviewStars;

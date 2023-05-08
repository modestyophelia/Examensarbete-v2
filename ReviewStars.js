import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

const StarRating = styled(View)`
  display: flex;
  flex-direction: row;
  font-size: 0;
`;

const StarLabel = styled(Text)`
  display: flex;
  font-size: 24px;
  color: lightgrey;

  &.filled {
    color: gold;
  }
`;

const ReviewStars = ({ reviewRating }) => {
  const numStars = Math.round(reviewRating);

  return (
    <StarRating>
      {[...Array(numStars)].map((_, index) => (
        <StarLabel key={index} style={{ color: "gold" }}>
          ★
        </StarLabel>
      ))}
      {[...Array(5 - numStars)].map((_, index) => (
        <StarLabel key={index}>☆</StarLabel>
      ))}
    </StarRating>
  );
};

export default ReviewStars;

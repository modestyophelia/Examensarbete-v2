import { useState } from "react";
import { View, Text, TextInput } from 'react-native';
import styled, { css } from "styled-components/native";

const StarRating = styled(View)`
  display: flex;
  flex-direction: row;
  font-size: 0;
`;

const StarInput = styled(TextInput)`
  display: none;

  &:checked ~ label {
    color: gold;
  }
`;

const StarLabel = styled(Text)`
  display: flex;
  font-size: 24px;
  color: lightgrey;

  &:hover,
  &:hover ~ label {
    color: gold;
    ${props => props.hovered && `
      background: linear-gradient(to right, gold ${props.percent}%, lightgrey ${props.percent}%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    `}
  }

  ${props => props.filled && css`
    color: gold;
  `}
`;

const RatingStars = ({ reviewRating, onChange }) => {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const handlePress = (index) => {
    onChange(index + 1);
  };

  const getPercent = (index) => {
    const rating = hovered !== null ? hovered : reviewRating;
    return Math.round((index / 4) * 100);
  };

  return (
    <StarRating>
      {[...Array(5)].map((_, index) => (
        <StarInput
          key={index}
          name="reviewRating"
          id={`reviewRating-${index}`}
          value={index + 1}
          checked={reviewRating === index + 1}
          onChange={() => { }}
        />
      ))}
      {[...Array(5)].map((_, index) => (
        <StarLabel
          key={index}
          htmlFor={`reviewRating-${index}`}
          filled={index < reviewRating}
          hovered={index < (hovered || reviewRating)}
          percent={getPercent(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave()}
          onPress={() => handlePress(index)}
        >
          {index < (hovered || reviewRating) ? '★' : '☆'}
        </StarLabel>
      ))}
    </StarRating>
  );
};

export default RatingStars;

import { Card, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { Animated } from "react-animated-css";

const FundraiserCard = ({ fundraiser }) => {
  const getUrl = (id) => {
    return `/fundraiser/${id}`;
  };

  const [isVisible, setIsVisible] = useState(false);

  const getShortDescription = (description) => {
    if (description.length > 10) {
      return description.substring(0, 10) + "...";
    }

    return description;
  };
  return (
    <Animated animationIn="fadeInDown" isVisible={true}>
      <Card key={fundraiser.fundraiserId} className="fundraiser-card">
        {fundraiser.image ? (
          <Card.Img
            src={fundraiser.image}
            alt={`The cover for ${fundraiser.title}`}
            variant="top"
          />
        ) : null}
        <Card.Body>
          <Card.Title>{fundraiser.title}</Card.Title>
          <p className="small">Poster: {fundraiser.posterUsername}</p>
          <Card.Text>{getShortDescription(fundraiser.description)}</Card.Text>
          <Button
            className="btn-block more-details"
            href={getUrl(fundraiser.id)}
          >
            View more details
          </Button>
        </Card.Body>
      </Card>
    </Animated>
  );
};

export default FundraiserCard;

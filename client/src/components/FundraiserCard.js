import { Card, Button } from "react-bootstrap";

const FundraiserCard = ({ fundraiser }) => {
  const getUrl = (id) => {
    return `/fundraiser/${id}`;
  };

  return (
    <Card key={fundraiser.fundraiserId} border="dark">
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
        <Card.Text>{fundraiser.description}</Card.Text>
        <Button className="btn-block btn-info" href={getUrl(fundraiser.id)}>
          View more details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FundraiserCard;

import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { GET_FUNDRAISER_BY_ID } from "../utils/queries";
import { useQuery } from "@apollo/client";

const FundraiserDetail = () => {
  const { id } = useParams();
  console.log("id", id);

  const { loading, error, data } = useQuery(GET_FUNDRAISER_BY_ID, {
    variables: { fundraiserId: id },
  });

  if (loading) {
    return <h1>Still loading</h1>;
  }

  //let fundraiserDetails = data.getFundraiserById;
  console.log("loaded data", data);
  return (
    <Container>
      <h2>{data.getFundraiserById.title}</h2>
      <Row>
        <Col xs={4}>
          <img
            width={350}
            src={data.getFundraiserById.image}
            alt={data.getFundraiserById.title}
          />
        </Col>
        <Col xs={8}>{data.getFundraiserById.description}</Col>
      </Row>
    </Container>
  );
};

export default FundraiserDetail;

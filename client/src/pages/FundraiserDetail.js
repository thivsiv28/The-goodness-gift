import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

import { GET_FUNDRAISER_BY_ID } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_CONTRIBUTION } from "../utils/mutations";
import Auth from "../utils/auth";

const FundraiserDetail = () => {
  const { id } = useParams();

  const [contributionFormData, setContributionFormData] = useState({
    amount: 0,
    creditCardNumber: "",
    creditCardName: "",
    creditCardExpirationMonth: "",
    creditCardExpirationYear: "",
    creditCardCvv: "",
  });

  const [donated, setDonated] = useState(false);

  const { loading, error, data } = useQuery(GET_FUNDRAISER_BY_ID, {
    variables: { fundraiserId: id },
  });

  const [addContribution, addContributionResp] = useMutation(ADD_CONTRIBUTION);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setContributionFormData({ ...contributionFormData, [name]: value });
  };

  const handleContributionSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addContribution({
        variables: {
          contributorUsername: Auth.getProfile().data.username,
          fundraiserId: id,
          contributedAmount: parseFloat(contributionFormData.amount),
          card: {
            cvv: contributionFormData.creditCardCvv,
            expirationMonth: contributionFormData.creditCardExpirationMonth,
            expirationYear: contributionFormData.creditCardExpirationYear,
            name: contributionFormData.creditCardName,
            number: contributionFormData.creditCardNumber,
          },
        },
      });
      setContributionFormData({
        amount: 0,
        creditCardNumber: "",
        creditCardName: "",
        creditCardExpirationMonth: "",
        creditCardExpirationYear: "",
        creditCardCvv: "",
      });
      setDonated(true);
    } catch (err) {
      //  console.log("error creating contribution", err);
    }
  };

  if (loading) {
    return <h1>Still loading</h1>;
  }
  let fundraiserData = data.getFundraiserById;

  return (
    <Container>
      <h2>{fundraiserData.title}</h2>
      <Row>
        <Col xs={4}>
          <img
            width={350}
            src={fundraiserData.image}
            alt={fundraiserData.title}
          />
          <h5>List of contributions</h5>
          {fundraiserData.contributions.map((contribution) => {
            return (
              <div>
                {contribution.contributorUsername} donated $
                {contribution.contributedAmount}
              </div>
            );
          })}
        </Col>
        <Col xs={8}>{fundraiserData.description}</Col>
      </Row>
      <Row>
        <Form onSubmit={handleContributionSubmit}>
          {donated && (
            <Alert
              dismissible
              variant="success"
              onClose={() => {
                setDonated(false);
              }}
            >
              Thank you for your contribution!
            </Alert>
          )}
          {addContributionResp &&
            addContributionResp.error &&
            addContributionResp.error.message && (
              <Alert dismissible variant="danger">
                {addContributionResp.error.message}
              </Alert>
            )}
          <Form.Group>
            <Form.Label htmlFor="creditCardName">Name on Card</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name on card"
              name="creditCardName"
              onChange={handleInputChange}
              required
              value={contributionFormData.creditCardName}
            />
            <Form.Control.Feedback type="invalid">
              Name is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="creditCardNumber">Number on Card</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="creditCardNumber"
              onChange={handleInputChange}
              required
              value={contributionFormData.creditCardNumber}
            />
            <Form.Control.Feedback type="invalid">
              Number is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="creditCardExpirationMonth">
              Epiration month on Card
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="mm"
              name="creditCardExpirationMonth"
              onChange={handleInputChange}
              required
              value={contributionFormData.creditCardExpirationMonth}
            />
            <Form.Control.Feedback type="invalid">
              Expiration Month is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="creditCardExpirationYear">
              Epiration Year on Card
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="mm"
              name="creditCardExpirationYear"
              onChange={handleInputChange}
              required
              value={contributionFormData.creditCardExpirationYear}
            />
            <Form.Control.Feedback type="invalid">
              Expiration Year is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="creditCardCvv">Cvv number</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="creditCardCvv"
              onChange={handleInputChange}
              required
              value={contributionFormData.creditCardCvv}
            />
            <Form.Control.Feedback type="invalid">
              CVC is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="amount">Donation amount</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              name="amount"
              onChange={handleInputChange}
              required
              value={contributionFormData.amount}
            />
            <Form.Control.Feedback type="invalid">
              Amount is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="success">
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default FundraiserDetail;

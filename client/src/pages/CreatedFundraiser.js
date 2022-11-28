import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";

import Auth from "../utils/auth";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import FundraiserCard from "../components/FundraiserCard";
import { ADD_FUNDRAISER } from "../utils/mutations";

const CreatedFundraiser = () => {
  const [userData, setUserData] = useState({});

  const [newFundraiserData, setNewFundraiserData] = useState({
    title: "",
    image: "",
    description: "",
  });

  const [addFundraiser, addFundraiserResp] = useMutation(ADD_FUNDRAISER);
  const [created, setCreated] = useState(false);

  const { loading } = useQuery(GET_ME, {
    onCompleted: (dt) => {
      setUserData(dt.me);
    },
  });

  if (!Auth.loggedIn()) {
    return <h1>Please login to save the fundraiser</h1>;
  }

  const userDataLength = Object.keys(userData).length;

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewFundraiserData({ ...newFundraiserData, [name]: value });
  };

  const handleFundraiserCreate = async (e) => {
    e.preventDefault();
    try {
      await addFundraiser({
        variables: {
          ...newFundraiserData,
          posterUsername: Auth.getProfile().data.username,
        },
      });
      setNewFundraiserData({
        title: "",
        image: "",
        description: "",
      });
      setCreated(true);
    } catch (err) {
      console.log("Error creating fundraiser", err);
    }
  };

  if (!userDataLength) {
    return <h2>LOADING data...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light page-header">
        <Container>
          <h1>Viewing created fundraisers!</h1>
        </Container>
      </Jumbotron>
      <Container className="form">
        <h2>Create new fundraiser</h2>
        <Form noValidate onSubmit={handleFundraiserCreate}>
          {created && (
            <Alert
              dismissible
              variant="success"
              onClose={() => setCreated(false)}
            >
              Created fundraiser
            </Alert>
          )}
          <Form.Group>
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Fundraiser title"
              name="title"
              onChange={handleInputChange}
              value={newFundraiserData.title}
              required
            />
            <Form.Control.Feedback type="invalid">
              Title is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="image">Image url</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image url"
              name="image"
              onChange={handleInputChange}
              value={newFundraiserData.image}
              required
            />
            <Form.Control.Feedback type="invalid">
              Image is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Description"
              name="description"
              onChange={handleInputChange}
              value={newFundraiserData.description}
              required
            />
            <Form.Control.Feedback type="invalid">
              Description is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" variant="success" className="createBtn">
            Create
          </Button>
        </Form>
      </Container>
      <Container>
        <h2>
          {userData.createdFundraisers.length
            ? `Viewing ${userData.createdFundraisers.length} created ${
                userData.createdFundraisers.length === 1
                  ? "fundraiser"
                  : "fundraisers"
              }:`
            : "You have no saved fundraisers!"}
        </h2>
        <CardColumns>
          {[...userData.createdFundraisers].reverse().map((fundraiser) => {
            return <FundraiserCard fundraiser={fundraiser} />;
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default CreatedFundraiser;

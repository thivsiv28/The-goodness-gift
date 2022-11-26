import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";

import Auth from "../utils/auth";
import {
  saveFundraiserIds,
  getSavedFundraiserIds,
} from "../utils/localStorage";
import { SAVE_FUNDRAISER } from "../utils/mutations";
import { GET_ALL_FUNDRAISERS } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";

const SearchFundraisers = () => {
  const [searchedFundraisers, setSearchedFundraisers] = useState([]);
  // Create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");
  // create state to hold saved fundraiserId values
  const [savedFundraiserIds, setSavedFundraiserIds] = useState(
    getSavedFundraiserIds()
  );
  const [addFundraiser, { error, data }] = useMutation(SAVE_FUNDRAISER);

  const getAllFundRaisers = useQuery(GET_ALL_FUNDRAISERS, {
    onCompleted: (fundData) => {
      setSearchedFundraisers(fundData.getAllFundRaisers);

      console.log("got fund data", fundData);
    },
  });

  // set up useEffect hook to save `savedFundraiserIds` list to localStorage on component unmount
  useEffect(() => {
    return () => saveFundraiserIds(savedFundraiserIds);
  });

  // Create function to handle saving a fundraiser to our database
  const handleSaveFundraiser = async (fundraiserId) => {
    return;
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Fundraisers!</h1>
          <Form>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a fundraiser"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>
      {getAllFundRaisers.loading && <h1>Loading</h1>}
      {!getAllFundRaisers.loading && searchedFundraisers && (
        <Container>
          <h2> Viewing {searchedFundraisers.length} results</h2>
          <CardColumns>
            {searchedFundraisers.map((fundraiser) => {
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
                    <p className="small">Poster:{fundraiser.poster}</p>
                    <Card.Text>{fundraiser.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedFundraiserIds?.some(
                          (savedFundraiserId) =>
                            savedFundraiserId === fundraiser.fundraiserId
                        )}
                        className="btn-block btn-info"
                        onClick={() =>
                          handleSaveFundraiser(fundraiser.fundraiserId)
                        }
                      >
                        {savedFundraiserIds?.some(
                          (savedFundraiserId) =>
                            savedFundraiserId === fundraiser.fundraiserId
                        )
                          ? "This fundraiser has already been saved!"
                          : "Save this Fundraiser!"}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              );
            })}
          </CardColumns>
        </Container>
      )}
    </>
  );
};

export default SearchFundraisers;

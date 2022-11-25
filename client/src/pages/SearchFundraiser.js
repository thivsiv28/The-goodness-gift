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
import { saveFundraiserIds, getSavedFundraiserIds } from "../utils/localStorage";
import { SAVE_FUNDRAISER } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const SearchFundraisers = () => {
    // Create state for holding returned data
    const [searchedFundraisers, setSearchedFundraisers] = useState([]);
    // Create state for holding our search field data
    const [searchInput, setSearchInput] = useState("");
      // create state to hold saved fundraiserId values
  const [savedFundraiserIds, setSavedFundraiserIds] = useState(getSavedFundraiserIds());
  const [addFundraiser, { error, data }] = useMutation(SAVE_Fundraiser);
    // set up useEffect hook to save `savedFundraiserIds` list to localStorage on component unmount
    useEffect(() => {
        return () => saveFundraiserIds(savedFundraiserIds);
      });
      // Create method to search for fundraisers and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchFundraisers(searchInput);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { items } = await response.json();

      const fundraiserData = items.map((fundraiser) => ({
       fundraiserId: fundraiser.id,
        poster: fundraiser.posterInfo.poster || ["No poster to display"],
        title: fundraiser.fundraiserInfo.title,
        description:fundraiser.fundraiserInfo.description,
        image: fundraiser.fundraiserInfo.imageLinks?.thumbnail || "",
      }));

      setSearchedFundraisers(fundraiserData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };
 // Create function to handle saving a fundraiser to our database
 const handleSaveFundraiser = async (fundraiserId) => {
    // find the fundraiser in `searchedFundraisers` state by the matching id
    const fundraiserToSave = searchedFundraisers.find((fundraiser) => fundraiser.fundraiserId === fundraiserId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await addFundraiser({
        variables: { fundraiser: fundraiserToSave },
      });
 
// If fundraiser successfully saves to user's account, save fundraiser id to state
      setSavedFundraiserIds([...savedFundraiserIds, fundraiserToSave.fundraiserId]);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Fundraisers!</h1>
          <Form onSubmit={handleFormSubmit}>
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
      
      <Container>
        <h2>
        {searchedFundraisers.length
            ? `Viewing ${searchedFundraisers.length} results:`
            : "Search for a fundraiser to begin"} 
        </h2>
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
                        (savedFundraiserId) => savedFundraiserId === fundraiser.fundraiserId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveFundraiser(fundraiser.fundraiserId)}
                    >
                          {savedFundraiserIds?.some(
                        (savedFundraiserId) => savedFundraiserId === fundraiser.fundraiserId
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
    </>
  );
};

export default SearchFundraisers;

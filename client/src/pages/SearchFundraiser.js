import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  Row,
  CardColumns,
} from "react-bootstrap";
import { Animated } from "react-animated-css";

import Auth from "../utils/auth";
import {
  saveFundraiserIds,
  getSavedFundraiserIds,
} from "../utils/localStorage";
import { ADD_FUNDRAISER } from "../utils/mutations";
import { GET_ALL_FUNDRAISERS } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import FundraiserCard from "../components/FundraiserCard";

const SearchFundraisers = () => {
  const [searchedFundraisers, setSearchedFundraisers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedFundraiserIds, setSavedFundraiserIds] = useState(
    getSavedFundraiserIds()
  );

  const getAllFundRaisers = useQuery(GET_ALL_FUNDRAISERS, {
    onCompleted: (fundData) => {
      setSearchedFundraisers(fundData.getAllFundRaisers);

      console.log("got fund data", fundData);
    },
  });

  useEffect(() => {
    return () => saveFundraiserIds(savedFundraiserIds);
  });

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const getFilteredResults = (allResult) => {
    const reversed = [...searchedFundraisers].reverse();
    return reversed.filter((fundraiser) => {
      return (
        fundraiser.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        fundraiser.description.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
  };
  return (
    <>
      <Jumbotron fluid className="text-light page-header">
        <Container>
          <h1>Browse Fundraisers!</h1>

          <Form.Group className="mb-3" controlId="formSearch">
            <Form.Control
              type="search"
              placeholder="Search"
              className="search"
              width={50}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Container>
      </Jumbotron>

      {getAllFundRaisers.loading && <h1>Loading fundraisers</h1>}
      {!getAllFundRaisers.loading && searchedFundraisers && (
        <Container>
          <h2>{getFilteredResults(searchedFundraisers).length} Fundraisers</h2>
          <CardColumns>
            {getFilteredResults(searchedFundraisers).map((fundraiser) => {
              return <FundraiserCard fundraiser={fundraiser} />;
            })}
          </CardColumns>
        </Container>
      )}
    </>
  );
};

export default SearchFundraisers;

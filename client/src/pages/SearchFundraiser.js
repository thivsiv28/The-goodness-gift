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

  const handleSaveFundraiser = async (fundraiserId) => {
    return;
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Browse Fundraisers!</h1>
        </Container>
      </Jumbotron>
      {getAllFundRaisers.loading && <h1>Loading fundraisers</h1>}
      {!getAllFundRaisers.loading && searchedFundraisers && (
        <Container>
          <h2> Viewing {searchedFundraisers.length} results</h2>
          <CardColumns>
            {searchedFundraisers.map((fundraiser) => {
              return <FundraiserCard fundraiser={fundraiser} />;
            })}
          </CardColumns>
        </Container>
      )}
    </>
  );
};

export default SearchFundraisers;

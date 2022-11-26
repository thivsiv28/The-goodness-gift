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
import FundraiserCard from "../components/FundraiserCard";

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
          <h1>Browse Fundraisers!</h1>
        </Container>
      </Jumbotron>
      {getAllFundRaisers.loading && <h1>Loading</h1>}
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

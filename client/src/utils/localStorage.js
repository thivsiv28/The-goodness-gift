export const getSavedFundraiserIds = () => {
  const savedFundraiserIds = localStorage.getItem("saved_fundraisers")
    ? JSON.parse(localStorage.getItem("saved_fundraisers"))
    : [];

  return savedFundraiserIds;
};

export const saveFundraiserIds = (fundraiserIdArr) => {
  if (fundraiserIdArr.length) {
    localStorage.setItem("saved_fundraisers", JSON.stringify(fundraiserIdArr));
  } else {
    localStorage.removeItem("saved_fundraisers");
  }
};

export const removeFundraiserId = (fundraiserId) => {
  const savedFundraiserIds = localStorage.getItem("saved_fundraisers")
    ? JSON.parse(localStorage.getItem("saved_fundraisers"))
    : null;

  if (!savedFundraiserIds) {
    return false;
  }

  const updatedSavedFundraiserIds = savedFundraiserIds?.filter(
    (savedFundraiserId) => savedFundraiserId !== fundraiserId
  );
  localStorage.setItem(
    "saved_fundraisers",
    JSON.stringify(updatedSavedFundraiserIds)
  );

  return true;
};

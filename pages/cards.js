import React from "react";
import axios from "axios";

import CardListTable from "../components/Card/CardListTable";
function Cards({ cards }) {
  return <CardListTable cards={cards} />;
}

Cards.getInitialProps = async () => {
  //Fetch Data on server

  const url = "http://localhost:3000/api/cards";
  const response = await axios.get(url);
  return { cards: response.data };
  //Return Response data as an object

  //Note: this object will be merged with existing props
};

export default Cards;

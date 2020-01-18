import React from "react";
import axios from "axios";

import CardList from "../components/Card/CardList";
function Home({ cards }) {
  return <CardList cards={cards} />;
}

Home.getInitialProps = async () => {
  //Fetch Data on server

  const url = "http://localhost:3000/api/cards";
  const response = await axios.get(url);
  return { cards: response.data };
  //Return Response data as an object

  //Note: this object will be merged with existing props
};

export default Home;

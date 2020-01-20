import React from "react";
import axios from "axios";

import CustomerList from "../components/Customer/CustomerList";
function Customers({ customers }) {
  return <CustomerList customers={customers} />;
}

Customers.getInitialProps = async () => {
  //Fetch Data on server

  const url = "http://localhost:3000/api/customers";
  const response = await axios.get(url);
  return { customers: response.data };
  //Return Response data as an object

  //Note: this object will be merged with existing props
};

export default Customers;

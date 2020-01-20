import React from "react";
import { Form, Input, Button, Message, Header, Icon } from "semantic-ui-react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";

const INITIAL_CUSTOMER = {
  customerName: "",
  address: "",
  phone: "",
  customerCode: ""
};

function CreateCustomer() {
  const [customer, setCustomer] = React.useState(INITIAL_CUSTOMER);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const isCustomer = Object.values(customer).every(el => Boolean(el));
    isCustomer ? setDisabled(false) : setDisabled(true);
  }, [customer]);

  function handleChange(event) {
    const { name, value } = event.target;

    setCustomer(prevState => ({ ...prevState, [name]: value }));
    console.log(customer);
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setLoading(true);
      setError("");
      const url = `${baseUrl}/api/customer`;
      const { customerName, address, phone, customerCode } = customer;
      const payload = { customerName, address, phone, customerCode };
      await axios.post(url, payload);
      setCustomer(INITIAL_CUSTOMER);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Customer
      </Header>
      <Form
        loading={loading}
        error={Boolean(error)}
        success={success}
        onSubmit={handleSubmit}
      >
        <Message error header="Oops!" content={error} />
        <Message
          success
          icon="check"
          header="Success!"
          content="Your Customer has been Created"
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="customerName"
            label="Name"
            placeholder="Name"
            value={customer.name}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="address"
            label="Address"
            placeholder="Address"
            type="text"
            value={customer.price}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="phone"
            label="Phone"
            placeholder="Phone"
            type="text"
            value={customer.phone}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="customerCode"
            label="Customer Code"
            placeholder="Customer Code"
            type="text"
            value={customer.customerCode}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Field
          control={Button}
          color="blue"
          disabled={disabled || loading}
          icon="pencil alternate"
          content="Submit"
          type="submit"
        />
      </Form>
    </>
  );
}

export default CreateCustomer;

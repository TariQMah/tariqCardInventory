import React from "react";
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon
} from "semantic-ui-react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";

const INITIAL_CUSTOMER = {
  name: "",
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

  // React.useEffect(() => {
  //   const isCustomer = Object.values(customer.every(el => Boolean(el));
  //   isCustomer ? setDisabled(false) : setDisabled(true);
  // }, [customer]);

  function handleChange(event) {
    const { name, address, phone, customerCode } = event.target;

    setCustomer(prevState => ({ ...prevState, [name]: value }));
  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append("file", customer.media);
    data.append("upload_preset", "reactreserve");
    data.append("cloud_name", "reedbargercodes");
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const mediaUrl = response.data.url;
    return mediaUrl;
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setLoading(true);
      setError("");
      const mediaUrl = await handleImageUpload();
      const url = `${baseUrl}/api/customer`;
      const { name, price, description } = customer;
      const payload = { name, price, description, mediaUrl };
      await axios.post(url, payload);
      setcustomer(INITIAL_customer);
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
            name="name"
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
          <Form.Field
            control={Input}
            name="phone"
            label="Phone"
            placeholder="Phone"
            type="text"
            value={customer.phone}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          onChange={handleChange}
          value={customer.description}
        />
        <Form.Field
          control={Button}
          disabled={disabled || loading}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"
        />
      </Form>
    </>
  );
}

export default CreateCustomer;

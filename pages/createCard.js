import React from "react";
import {
  Form,
  Input,
  Grid,
  Image,
  Button,
  Message,
  Header,
  Icon
} from "semantic-ui-react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";

const INITIAL_CARDS = {
  name: "",
  address: "",
  phone: "",
  media: "",
  customerCode: ""
};

function CreateCard() {
  const [card, setCard] = React.useState(INITIAL_CARDS);
  const [mediaPreview, setMediaPreview] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const isCard = Object.values(card).every(el => Boolean(el));
    isCard ? setDisabled(false) : setDisabled(true);
  }, [card]);

  function handleChange(event) {
    const { name, value, files } = event.target;
    if (name === "media") {
      setCard(prevState => ({ ...prevState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setCard(prevState => ({ ...prevState, [name]: value }));
    }

    console.log(card);
  }
  async function handleImageUpload() {
    const data = new FormData();
    data.append("file", product.media);
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
      const url = `${baseUrl}/api/cards`;
      const { customerName, address, phone, customerCode } = customer;
      const payload = { customerName, address, phone, mediaUrl, customerCode };
      await axios.post(url, payload);
      setCard(INITIAL_CARDS);
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
        Add New Card
      </Header>

      <Grid divided="vertically">
        <Grid.Row>
          <Grid.Column width={12}>
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
                  value={card.name}
                  onChange={handleChange}
                />

                <Form.Field
                  control={Input}
                  name="media"
                  type="file"
                  label="Media"
                  accept="image/*"
                  content="Select Image"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  name="price"
                  label="Price"
                  placeholder="Price"
                  type="text"
                  value={card.price}
                  onChange={handleChange}
                />
                <Form.Field
                  control={Input}
                  name="sku"
                  label="Sku"
                  placeholder="Sku"
                  type="text"
                  value={card.sku}
                  onChange={handleChange}
                />
                <Form.Field
                  control={Input}
                  name="cardCode"
                  label="Card Code"
                  placeholder="Card Code"
                  type="text"
                  value={card.cardCode}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  name="qty"
                  label="Quantity"
                  placeholder="Quantity"
                  type="text"
                  value={card.qty}
                  onChange={handleChange}
                />
                <Form.Field
                  control={Input}
                  name="bonus"
                  label="Bonus"
                  placeholder="Bonus"
                  type="text"
                  value={card.cardCode}
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
          </Grid.Column>
          <Grid.Column width={4}>
            <Image src={mediaPreview} rounded centered size="small" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

export default CreateCard;

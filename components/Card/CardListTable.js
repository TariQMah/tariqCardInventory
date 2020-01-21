import React from "react";
import Link from "next/link";
import { Table, Image, Button, Header, Icon, Modal } from "semantic-ui-react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { useRouter } from "next/router";
const INITIAL_CUSTOMER = {
  name: "",
  _id: "",
  address: "",
  phone: "",
  customerCode: ""
};

function CardListTable({ cards }) {
  const colors = ["red"];
  const [card, setCustomer] = React.useState(INITIAL_CUSTOMER);

  const router = useRouter();
  const [modal, setModal] = React.useState(false);
  const [currentVal, setCurrentVal] = React.useState("");

  function handleEdit(id) {
    console.log("Edit ID", id);
  }

  async function handleDelete() {
    console.log("currentVal: ", currentVal);
    // const baseUrl = "http://localhost:3000";
    const url = `${baseUrl}/api/cards`;
    const payload = { params: { _id: currentVal } };
    await axios.delete(url, payload);
    setModal(false);
    setCustomer(INITIAL_CUSTOMER);
    // router.push("/");
  }
  return (
    <div>
      <Link href="/createCustomer">
        <Button color="blue">
          <Icon name="users" size="large" />
          Add New Record
        </Button>
      </Link>
      <br /> <br />
      {colors.map(color => (
        <Table color={color} key={color}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Sku</Table.HeaderCell>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {Object.values(cards).map(({ name, _id, price, sku, mediaUrl }) => {
              return (
                <Table.Row key={_id}>
                  <Table.Cell>{name}</Table.Cell>
                  <Table.Cell>{price}</Table.Cell>
                  <Table.Cell>{sku}</Table.Cell>
                  <Table.Cell>
                    <Image
                      src={mediaUrl}
                      as="a"
                      fluid
                      size="small"
                      href="http://google.com"
                      target="_blank"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() => {
                        setModal(true);
                        setCurrentVal(_id);
                      }}
                      icon="delete"
                      color="red"
                    />
                    <Button
                      onClick={() => handleEdit(_id)}
                      icon="pencil"
                      color="green"
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      ))}
      <Modal basic open={modal} size="small">
        <Header icon="archive" content="Delete Customer" />
        <Modal.Content>
          <p>Are you sure you want to delete this customer?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" onClick={() => setModal(false)} inverted>
            <Icon name="remove" /> No
          </Button>
          <Button color="green" onClick={handleDelete} inverted>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>

    // <Card.Group
    //   stackable
    //   itemsPerRow="3"
    //   centered
    //   items={mapCardsToItems(cards)}
    // />
  );
}

export default CardListTable;

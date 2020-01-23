import Card from "../../models/Card";

import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};

async function handleGetRequest(req, res) {
  const { _id } = req.query;
  const card = await Card.findOne({ _id });
  res.status(200).json(card);
}

async function handlePostRequest(req, res) {
  const { sku, name, price, mediaUrl } = req.body;

  try {
    if (!name || !price) {
      return res.status(422).send("Customer missing one or more fields");
    }

    const card = await new Card({
      name,
      price,
      sku,
      mediaUrl
    }).save();

    res.status(201).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error in creating product");
  }
}

async function handleDeleteRequest(req, res) {
  const { _id } = req.query;
  console.log(_id);
  try {
    // 1) Delete product by id
    await Card.findByIdAndRemove({ _id });

    res.status(204).json({});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting Card");
  }
}

// export default async (req, res) => {
//   const { _id } = req.query;
//   const customer = await Customer.findone(_id);
//   res.status(200).json(customer);
// };

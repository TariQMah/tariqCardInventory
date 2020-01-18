import Customer from "../../models/Customer";

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
  const customer = await Customer.findOne({ _id });
  res.status(200).json(customer);
}

async function handlePostRequest(req, res) {
  const { name, price, description, mediaUrl } = req.body;
  try {
    if (!name || !price || !description || !mediaUrl) {
      return res.status(422).send("Product missing one or more fields");
    }
    const customer = await new Product({
      name,
      price,
      description,
      mediaUrl
    }).save();
    res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error in creating product");
  }
}

async function handleDeleteRequest(req, res) {
  const { _id } = req.query;
  try {
    // 1) Delete product by id
    await Customer.findOneAndDelete({ _id });
    // 2) Remove product from all carts, referenced as 'product'

    res.status(204).json({});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting Customer");
  }
}

// export default async (req, res) => {
//   const { _id } = req.query;
//   const customer = await Customer.findone(_id);
//   res.status(200).json(customer);
// };

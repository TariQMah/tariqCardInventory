import Card from "../../models/Card";

import connectDb from "../../utils/connectDb";

connectDb();
export default async (req, res) => {
  const cards = await Card.find();
  res.status(200).json(cards);
};

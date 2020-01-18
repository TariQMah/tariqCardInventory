import Customer from "../../models/Customer";

import connectDb from "../../utils/connectDb";

connectDb();
export default async (req, res) => {
  const customer = await Customer.find();
  res.status(200).json(customer);
};

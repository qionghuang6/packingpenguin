import { connectToDatabase } from "../../util/mongodb";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const users = await db
    .collection("users")
    .find({})
    .limit(20)
    .toArray();
  // res.status(200)  
  res.json(users);
};
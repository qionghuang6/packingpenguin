import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    console.log(req.body);
    const userId = req.body
    const { db } = await connectToDatabase();
    const users = db.collection("users")
    users.insertOne({ userId })
    res.status(200).end()
  };
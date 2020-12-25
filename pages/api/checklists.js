import { connectToDatabase } from "../../util/mongodb";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const checklists = await db
    .collection("checklists")
    .find({})
    .limit(20)
    .toArray();
  // res.status(200)  
  res.json(checklists);
};
import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    const {path, target, value} = req.body;
    const [checklistId, categoryId] = path;
    const { db } = await connectToDatabase();
    const checklists = db.collection("checklists");
    const query = { id: checklistId, "categories.id": categoryId };
    const operation = { $set: {[`categories.$.${target}`]: value}};
    const result = await checklists.updateOne(query, operation);
    return res.status(200).end(`Updated ${result.modifiedCount} items`);
  };

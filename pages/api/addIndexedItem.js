import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    const {path, item, index} = req.body;
    const [checklistId, categoryId, itemId] = path;
    const { db } = await connectToDatabase();
    const checklists = db.collection("checklists");
    const query = { id: checklistId, "categories.id": categoryId };
    const operation = {
        $push: { "categories.$.items": { $each : [item], $position : index} }
    };
    const result = await checklists.updateOne(query, operation);
    return res.status(200).end(`Updated ${result.modifiedCount} items`);
  };
import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    const [checklistId, categoryId, itemId] = req.body.path;
    const { db } = await connectToDatabase();
    const checklists = db.collection("checklists");
    const query = { id: checklistId, "categories.id": categoryId };

    const addItem = {
      $push: { "categories.$.items": {id: itemId }}
    };
    const result = await checklists.updateOne(query, addItem);
    return res.status(200).end(result);
  };

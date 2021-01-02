import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    const {path, item, push} = req.body;
    const [checklistId, categoryId, itemId] = path;
    const { db } = await connectToDatabase();
    const checklists = db.collection("checklists");
    const query = { id: checklistId, "categories.id": categoryId };
    const addItem = {
        $push: { "categories.$.items": item }
    };
    const removeItem = {
        $pull: { "categories.$.items": {id: itemId }}
    };
    const operation = push ? addItem : removeItem; 
    const result = await checklists.updateOne(query, operation);
    return res.status(200).end(`Updated ${result.modifiedCount} items`);
  };

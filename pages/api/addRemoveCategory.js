import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    const {path, category, push} = req.body;
    const [checklistId, categoryId] = path;
    const { db } = await connectToDatabase();
    const checklists = db.collection("checklists");
    const query = {id: checklistId};
    const addCategory = {
        $push: { "categories": category }
    };
    const delCategory = {
        $pull: { "categories": {id: categoryId}}
    }
    const updateDocument = push ? addCategory: delCategory;
    const result = await checklists.updateOne(query, updateDocument);
    return res.status(200).end(`Updated ${result.modifiedCount} categories`);
  };

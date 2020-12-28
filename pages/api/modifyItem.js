import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    const {checklistId, categoryId, itemId, target, value} = req.body
    const { db } = await connectToDatabase();
    const checklists = db.collection("checklists");
    const query = { id: checklistId };
    const targetKey = `categories.$[cat].items.$[item].${target}`;
    const newvalues = { $set: {[targetKey]: value}};
    const arrFilt = { arrayFilters: [{ 'cat.id': categoryId }, {'item.id': itemId}] };
    await checklists.updateOne(query, newvalues, arrFilt);
    return res.status(200).end();
  };

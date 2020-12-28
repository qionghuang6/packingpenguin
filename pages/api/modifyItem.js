import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    const {checkId, catId, itemId, target, targetVal} = req.body
    const { db } = await connectToDatabase();
    const checklists = db.collection("checklists")
    const query = { id: checkId }
    const targetKey = `categories.$[cat].items.$[item].${target}`
    const newvalues = { $set: {targetKey: targetVal}};
    const arrFilt = { arrayFilters: [{ 'cat.id': catId }, {'item.id': itemId}] };
    await checklists.updateOne(query, newvalues, arrFilt);
    return res.status(200).end()
  };

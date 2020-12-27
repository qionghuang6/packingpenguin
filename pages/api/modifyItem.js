import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    const notes = req.body
    const { db } = await connectToDatabase();
    const checklists = db.collection("checklists")
    const query = { id: '3b1b'}
    const newvalues = { $set: {'categories.$[cat].items.$[item].notes': notes} };
    const arrFilt = { arrayFilters: [{ 'cat.name': 'Personal Hygiene' }, {'item.name': 'Shampoo'}] };
    await checklists.updateOne(query, newvalues, arrFilt);
    res.end()
  };

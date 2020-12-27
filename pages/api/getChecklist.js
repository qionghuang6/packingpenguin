import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    const checklistId = req.body
    const { db } = await connectToDatabase();
    const checklists = db.collection("checklists")
    console.log(checklistId)
    checklists.findOne({ id: checklistId }, (err, dbRes) => {
        if(err){console.log(err)}
        res.json(dbRes)
    })
  };
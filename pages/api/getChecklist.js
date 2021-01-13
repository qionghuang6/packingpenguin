import Cors from 'cors';
import { connectToDatabase } from "../../util/mongodb";
import { ObjectID } from 'mongodb'
import { initMiddleware } from "../../util/utilFunctions";

const cors = initMiddleware(
    Cors({
        methods: ['POST'],
    })
)

export default async (req, res) => {
    await cors(req, res);
    const checklistId = req.body
    const { db } = await connectToDatabase();
    const checklists = db.collection("checklists");

    const dbRes = await checklists.findOne({ id: checklistId })
    if(dbRes){
        res.json(dbRes);
        return;
    }
    const defaultChecklist = await checklists.findOne({id: "0"});

    const newChecklist = JSON.parse(JSON.stringify(defaultChecklist))
    newChecklist.id = checklistId;
    newChecklist._id = new ObjectID();

    await checklists.insertOne(newChecklist);
    res.json(newChecklist);
    return;
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '2kb',
        },
    },
}
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
    return new Promise(resolve => {
        checklists.findOne({ id: checklistId }, (err, dbRes) => {
            if (err) {
                console.log(err);
                res.status(405).end()
                resolve()
            }
            if (!dbRes){
                checklists.findOne({ id: "0" }, (err, defaultChecklist) => {
                    const newChecklist = JSON.parse(JSON.stringify(defaultChecklist))
                    newChecklist.id = checklistId;
                    newChecklist._id = new ObjectID();
                    checklists.insertOne(newChecklist, (e, r) => {
                        if (e) {
                            console.log(e);
                            res.status(405).end();
                            resolve();
                        };
                    })
                    res.status(200).json(newChecklist);
                    resolve();
                    }
                )
            }
            res.status(200).json(dbRes);
            resolve()
        })
    })
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '2kb',
        },
    },
}
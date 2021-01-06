import { connectToDatabase } from "../../util/mongodb";
import { ObjectID } from 'mongodb'

export default async (req, res) => {
    const checklistId = req.body
    const { db } = await connectToDatabase();
    const checklists = db.collection("checklists");
    await checklists.findOne({ id: checklistId }, (err, dbRes) => {
        if (err) {
            console.log(err);
            res.status(405).end()
        }

        if(dbRes){ 
            res.status(200).json(dbRes);
        }

        checklists.findOne({ id: "0" }, (err, defaultChecklist) => {
            const newChecklist = JSON.parse(JSON.stringify(defaultChecklist))
            
            newChecklist.id = checklistId;
            newChecklist._id = new ObjectID();
            
            checklists.insertOne(newChecklist, (e, r) => {
                if (e) {
                    console.log(e);
                    res.status(405).end();
                };
            })

            res.status(200).json(newChecklist);
        })
    })
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20kb',
        },
    },
}
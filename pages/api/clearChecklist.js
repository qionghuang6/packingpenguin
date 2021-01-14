import { connectToDatabase } from "../../util/mongodb";
import Cors from 'cors';
import { initMiddleware } from "../../util/utilFunctions";

const cors = initMiddleware(
    Cors({
        methods: ['POST'],
    })
)

export default async (req, res) => {
    await cors(req, res);
    const {checklistId} = req.body;
    const { db } = await connectToDatabase();
    const checklists = db.collection("checklists");
    const query = { id: checklistId };
    const operation = {
        $set: { "categories": {}}
    };
    let result = null;
    if (checklistId.length >= 6){
        result = await checklists.updateOne(query, operation);
    }
    if(result){
        return res.status(200).end(`Updated ${result.modifiedCount} field`);
    }
    return res.status(405).end('Unexpected Database Error')
  };

  export const config = {
    api: {
        bodyParser: {
            sizeLimit: '5kb',
        },
    },
}
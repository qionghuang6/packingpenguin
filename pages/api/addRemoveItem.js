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
    let result = null;
    if (checklistId.length >= 6){
        result = await checklists.updateOne(query, operation);
    }
    if(result){
        return res.status(200).end(`Updated ${result.modifiedCount} categories`);
    }
    return res.status(405).end('Unexpected Database Error')
  };

  export const config = {
    api: {
        bodyParser: {
            sizeLimit: '2kb',
        },
    },
}
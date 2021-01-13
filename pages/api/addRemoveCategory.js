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
    let result = null;
    if (checklistId.length >= 6) {
        const updateDocument = push ? addCategory: delCategory;
        result = await checklists.updateOne(query, updateDocument);
    }
    if(result){
        return res.status(200).end(`Updated ${result.modifiedCount} categories`);
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
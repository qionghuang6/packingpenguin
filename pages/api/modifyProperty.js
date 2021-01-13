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
    const { path, target, value } = req.body
    const { db } = await connectToDatabase();
    const checklists = db.collection("checklists");
    const [checklistId, categoryId, itemId] = path;
    let result;

    if (checklistId.length >= 6) {
        if (itemId) {
            const query = { id: checklistId };
            const targetKey = `categories.$[cat].items.$[item].${target}`;
            const newvalues = { $set: { [targetKey]: value } };
            const arrFilt = { arrayFilters: [{ 'cat.id': categoryId }, { 'item.id': itemId }] };
            result = await checklists.updateOne(query, newvalues, arrFilt);

        } else if (categoryId) {
            const query = { id: checklistId, "categories.id": categoryId };
            const operation = { $set: { [`categories.$.${target}`]: value } };
            result = await checklists.updateOne(query, operation);

        }
        else if (checklistId) {
            const query = { id: checklistId };
            const operation = { $set: { [target]: value } };
            result = await checklists.updateOne(query, operation);
        }
    }
    if (result) {
        return res.status(200).end(`Updated ${result.modifiedCount} fields`);
    }
    return res.status(405).end('Error modifying property');
};

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '2kb',
        },
    },
}
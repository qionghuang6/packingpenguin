import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    const {path, target, value} = req.body
    const { db } = await connectToDatabase();
    const checklists = db.collection("checklists");
    let result;
    const [checklistId, categoryId, itemId] = path;
    if (path[0].length >= 6){
      if (path.length === 3){
        const query = { id: checklistId };
        const targetKey = `categories.$[cat].items.$[item].${target}`;
        const newvalues = { $set: {[targetKey]: value}};
        const arrFilt = { arrayFilters: [{ 'cat.id': categoryId }, {'item.id': itemId}] };
        result = await checklists.updateOne(query, newvalues, arrFilt);
      } else if (path.length === 2){
        const query = { id: checklistId, "categories.id": categoryId };
        const operation = { $set: {[`categories.$.${target}`]: value}};
        result = await checklists.updateOne(query, operation);
      }
      else if (path.length === 1){
        const query = { id: checklistId };
        const operation = { $set: {[target]: value}};
        result = await checklists.updateOne(query, operation);
      }
    }
    if(result){
      return res.status(200).end(`Updated ${result.modifiedCount} fields`);
    }
    return res.status(405).end('Error modifying property');
  };
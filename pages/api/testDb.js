import { addUser, addChecklist } from '../../util/serverMethods'
import { connectToDatabase } from "../../util/mongodb";
import { generateListId, generateUserId } from '../../util/generateIds'

export default async (req, res) => {

    const userId = generateListId();
    const checklistId = generateUserId();
    addUser(userId);
    addChecklist(checklistId);
    res.status(200)
    res.end()
};
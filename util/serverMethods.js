import { connectToDatabase } from "./mongodb";

const addUser = async (userId) => {
    const { db } = await connectToDatabase();
    const res = await db
        .collection("users")
        .insertOne({ userId })
    return res
};

const addChecklist = async (userId, checkListId) => {
    const { db } = await connectToDatabase();
    const myquery = {userId};
    const newvalues = {$set: {checkListId}}
    const res = await db
        .collection("users")
        .updateOne(myquery, newvalues, (err, res) => {
          if (err) throw err;
        });
    return res;
}

export {
    addUser,
    addChecklist,
}
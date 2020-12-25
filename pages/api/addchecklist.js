import { connectToDatabase } from "../../util/mongodb";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const checklists = await db
    .collection("checklists")
    .insertOne(req.body)
  res.status(200)
  res.end('success')
};

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '10kb',
      },
    },
  }
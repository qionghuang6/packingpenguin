import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    const notes = req.body
    const { db } = await connectToDatabase();
    const checklists = db.collection("checklists")
    const query = { id: '3b1b'}
    const newvalues = { $set: {'categories.$[cat].items.$[item].notes': notes} };
    const arrFilt = { arrayFilters: [{ 'cat.name': 'Personal Hygiene' }, {'item.name': 'Shampoo'}] };
    await checklists.updateOne(query, newvalues, arrFilt);
    res.end()
  };


//   'categories.name': 'Personal Hygiene', 'categories.items.name': 'Shampoo'

//   await db.collection('BlogPost').updateMany({ 'comments.author': 'Bar' },
//   { $set: { 'comments.$[element].author': 'Baz' } },
//   // `$[element]` is tied to name `element` below
//   { arrayFilters: [{ 'element.author': 'Bar' }] });

//   db.students3.update(
//     {},
//     { $inc: { "grades.$[t].questions.$[score]": 2 } },
//     { arrayFilters: [ { "t.type": "quiz" } , { "score": { $gte: 8 } } ], multi: true}
//  )
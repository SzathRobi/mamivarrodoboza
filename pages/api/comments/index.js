import dbConnect from '../../../lib/dbConnect';
import Comment from '../../../models/Comment';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const comments = await Comment.find({});
        res.status(200).json({ success: true, data: comments });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST': {
      try {
        const comment = await Comment.create(JSON.parse(req.body));
        res.status(201).json({ success: true, data: comment });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    }
    default:
      res.status(400).json({ success: false });
      break;
  }
}

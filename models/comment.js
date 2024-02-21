import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    required: [true, 'Comment is required!'],
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: 'Note',
  }
});

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;
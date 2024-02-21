import Comment from "@models/comment";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { userId, text, noteId } = await request.json();

  try {
    await connectToDB();
    const newComment = new Comment({
      creator: userId,
      text,
      note: noteId
    });

    await newComment.save();
    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a note", { status: 500 })
  }
}
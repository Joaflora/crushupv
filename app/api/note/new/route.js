import { connectToDB } from "@utils/database";
import Note from '@models/note';

export const POST = async (request) => {
  const { userId, note, tag } = await request.json();

  try {
    await connectToDB();
    const newNote = new Note({
      creator: userId,
      note,
      tag
    });

    await newNote.save();
    return new Response(JSON.stringify(newNote), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a note", { status: 500 })
  }
}
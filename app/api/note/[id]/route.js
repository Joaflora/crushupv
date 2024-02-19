import { connectToDB } from "@utils/database";
import Note from '@models/note';

//GET
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const note = await Note.findById(params.id).populate('creator');
    if(!note) return new Response("Note not found", { status: 404 });
    return new Response(JSON.stringify(note), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all notes", { status: 500 });
  }
}

//PATCH
export const PATCH = async (request, { params }) => {
  const { note, tag } =  await request.json();

  try {
    await connectToDB();
    const existingNote = await Note.findById(params.id);

    if(!existingNote) { return new Response("Note not found", { status: 404 });}
    existingNote.note = note;
    existingNote.tag = tag;

    await existingNote.save();
    return new Response(JSON.stringify(existingNote), { status: 200 });
  } catch (error) {
    return new Response("Error updating note", { status: 500});
  }
}

//DELETE
export const DELETE = async (request, { params }) => {
  try {
      await connectToDB();

      // Find the prompt by ID and remove it
      const res = await Note.findByIdAndDelete(params.id);
      console.log('q coj passa:', res)

      return new Response("Note deleted successfully", { status: 200 });
  } catch (error) {
      return new Response("Error deleting note", { status: 500 });
  }
};
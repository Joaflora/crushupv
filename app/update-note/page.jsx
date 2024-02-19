"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditNote = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noteId = searchParams.get('id');


  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    note: '',
    tag: '',
  });

  useEffect(() => {
    const getNoteDetails = async () => {
      const response = await fetch(`/api/note/${noteId}`);
      const data = await response.json();

      setPost({
        note: data.note,
        tag: data.tag,
      });
    };

    if (noteId) getNoteDetails();
  }, [noteId])
  

  const updateNote = async (e) => {
    e.preventDefault(); // will prevent default behavior of the browser which is to reload
    setSubmitting(true);  // we can use it as a loader?

    if (!noteId) return alert('Note ID not found')

    try {
      const res = await fetch(`/api/note/${noteId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          note: post.note,
          tag: post.tag,
        })
      });
      if (res.ok) {
        router.push('/profile');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateNote}
    />
  )
}

export default EditNote
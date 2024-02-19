"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreateNote = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    note: '',
    tag: '',
  });

  const createNote = async (e) => {
    e.preventDefault(); // will prevent default behavior of the browser which is to reload
    setSubmitting(true);  // we can use it as a loader?

    try {
      const res = await fetch('/api/note/new', {
        method: 'POST',
        body: JSON.stringify({
          note: post.note,
          userId: session?.user.id,
          tag: post.tag,
        })
      });
      if (res.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createNote}
    />
  )
}

export default CreateNote
"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditNote = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const noteId = searchParams.get('id');


  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    note: '',
    tag: '',
  });

  useEffect(() => {
    first
  
    return () => {
      second
    }
  }, [promptId])
  

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
      if (Response.ok) {
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createNote}
    />
  )
}

export default EditNote
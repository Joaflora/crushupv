"use client";

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const NoteCard = ({ post, handleTagClick, handleEdit, handleDelete, handleClickOpen }) => {

  const { data: session } = useSession();
  const pathName = usePathname();

  return (
    <div className='note_card' onClick={handleClickOpen(post)}>
      <div className="flex justify-between items-start gap-5">
        <p className='my-2 font-satoshi text-sm text-gray-700'>{post.note}</p>
        <div className='copy_btn' onClick={handleClickOpen}>
          <Image
            src={'/assets/icons/comment.svg'}
            alt='copy'
            width={15}
            height={15}
          />
        </div>
      </div>
      <p className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag, event)}
      >#{post.tag}</p>
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p 
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >Edit
          </p>
          <p 
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default NoteCard
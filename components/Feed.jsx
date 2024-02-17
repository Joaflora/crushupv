'use client';

import { useEffect, useState } from 'react';

import NoteCard from './NoteCard';

const NoteCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <NoteCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        ></NoteCard>
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/note');
      const data = await response.json();

      setPosts(data);
    }
    fetchPosts();
  }, [])
  

  return (
    <section className='feed'>
      <form className="relative w-full flex-center">
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <NoteCardList
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed
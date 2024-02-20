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
  const [posts, setPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch('/api/note');
    const data = await response.json();

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterNotes = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter((post) =>
      regex.test(post.creator.username) ||
      regex.test(post.note) ||
      regex.test(post.tag)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterNotes(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

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
      {searchText ? (
        <NoteCardList
        data={searchedResults}
        handleTagClick={() => {}}
        />) :
        <NoteCardList
        data={posts}
        handleTagClick={() => {}}
        />
      }
      
    </section>
  )
}

export default Feed
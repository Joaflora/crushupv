'use client';

import { useEffect, useState } from 'react';

import NoteCard from './NoteCard';
import NoteCardDialog from './NoteCardDialog';

const NoteCardList = ({ data, handleTagClick, handleClickOpen }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <NoteCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleClickOpen={handleClickOpen}
        ></NoteCard>
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);

  // Dialog states
  const [openDialog, setOpenDialog] = useState(false);
  const [noteOnDialog, setNoteOnDialog] = useState(null);

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

  const handleTagClick = (tagName, event) => {
    setSearchText(tagName);
    const searchResult = filterNotes(tagName);
    setSearchedResults(searchResult);
  }

  const handleClickOpen = (post) => {
    setNoteOnDialog(post);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
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
          handleTagClick={handleTagClick}
          handleClickOpen={handleClickOpen}
        />
      ) : (
        <NoteCardList
          data={posts}
          handleTagClick={handleTagClick}
          handleClickOpen={handleClickOpen}
        />
      )}
      <NoteCardDialog
        open={openDialog}
        handleClose={handleClose}
      ></NoteCardDialog>
    </section>
  )
}

export default Feed
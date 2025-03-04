import React, { useEffect, useState } from 'react';
import './Home.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { savePost, getPosts, deletePosts, updatePosts, convertToBase64 } from '../../utils/indexedDB';

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showReadPopup, setShowReadPopup] = useState(null);
  const [editPopup, setEditPopup] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [image, setImage] = useState(null);
  const [editImage, setEditImage] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const storedPosts = await getPosts();
      setPosts(storedPosts);
    };
    fetchPosts();
  }, []);

  const addPost = async () => {
    
    const newPostId = await savePost(title, content, image);
    const timestamp = new Date().toLocaleString();
    let imageBase64 = null;
    if (image) {
        imageBase64 = await convertToBase64(image);
    }

    const newPost = { id: newPostId, title, content, image:imageBase64, timestamp };
    setPosts((prevPosts) => [newPost, ...prevPosts]);

    // Reset form
    setTitle('');
    setContent('');
    setImage(null);
    setShowPopup(false);
};


  const deletePost = async (id) => {
    await deletePosts(id);
    setPosts(posts.filter((post) => post.id !== id));
  };

  const editPost = async () => {
    let updatedData = { title: editTitle, content: editContent };
    if (editImage) {
      updatedData.image = await convertToBase64(editImage);
    }
    await updatePosts(editPopup.id, updatedData);
    setPosts(posts.map(post => post.id === editPopup.id ? { ...post, ...updatedData } : post));
    setEditPopup(null);
  };


  console.log("Posts",posts)

  return (
    <div className='container'>
      <Header />
      <div className='content'>
        <div className='addbtn'>
          <button className='btn' onClick={() => setShowPopup(true)}>Add Item</button>
        </div>
        <div className='msgcontainer'>
          {posts.length === 0 ? (
            <p>No posts available</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className='post'>
                <div className='title'>
                  <span className='titlebar'>{post.title.length > 25 ? post.title.substring(0, 22) + '...' : post.title}</span>
                  <span onClick={() => deletePost(post.id)} className='deleteicon'><DeleteIcon /></span>
                  <span className='editicon' onClick={() => { setEditPopup(post); setEditTitle(post.title); setEditContent(post.content); }}><EditIcon /></span>
                </div>
                {post.image && <img src={post.image} alt='Post' className='post-image' />}
                <span>{post.content.length > 100 ? post.content.substring(0, 250) + '...' : post.content}</span>
                {post.content.length > 100 && (
                  <span className='readmore' onClick={() => setShowReadPopup(post)}>Read more</span>
                )}
                <div className='time'><small>{post.timestamp}</small></div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />

      {showPopup && (
        <div className='popup'>
          <div className='popup-content'>
            <h2>Add Post</h2>
            <input type='text' placeholder='Enter title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder='Add content' value={content} onChange={(e) => setContent(e.target.value)} />
            <input type='file' accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
            <button onClick={addPost} className='post-button'>Post</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showReadPopup && (
        <div className='popup'>
          <div className='popup-content'>
            <h2>{showReadPopup.title}</h2>
            <p>{showReadPopup.content}</p>
            <button onClick={() => setShowReadPopup(null)}>Close</button>
          </div>
        </div>
      )}

      {editPopup && (
        <div className='popup'>
          <div className='popup-content'>
            <h2>Edit Post</h2>
            <input type='text' placeholder='Enter title' value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
            <textarea placeholder='Add content' value={editContent} onChange={(e) => setEditContent(e.target.value)} />
          <input type='file' accept=".jpg,.jpeg,.png" onChange={(e) => setEditImage(e.target.files[0])} />
          <button onClick={editPost}>Save Changes</button>
          <button onClick={() => setEditPopup(null)}>Cancel</button>
        </div>
        </div>
  )
}
    </div >
  );
};

export default Home;

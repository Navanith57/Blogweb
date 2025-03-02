import React, { useState } from 'react';
import './Home.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const Home = () => {
  const [showpopup, setShowpopup] = useState(false);
  const [posts, setPosts] = useState([]); 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showreadpopup,setShowReadPopup]=useState(null);
  const [editpopup,setEditPopup]=useState(null);
  const [edititle,setEdittitle]=useState("");
  const [editcontent,setEditcontent]=useState("")
  
  const Addpost = () => {
    const timestamp = new Date().toLocaleString();
    const newPost = {
      id: Date.now(), 
      title,
      content,
      timestamp,
    };

    setPosts((prevPosts) => [newPost, ...prevPosts]); 
    setTitle("");
    setContent("");
    setShowpopup(false); 
  };

  const DeletePost=(id)=>{
    setPosts(posts.filter((item)=>item.id !==id))
  }

  const EditPost = () => {
    setPosts(posts.map(post =>
      post.id === editpopup.id 
        ? { ...post, title: edititle, content: editcontent } 
        : post
    ));
    setEditPopup(null);
  };

  return (
    <div className='container'>
      <Header />
      <div className="content">
        <div className='addbtn'>
          <button className='btn' onClick={() => setShowpopup(true)}>Add Item</button>
        </div>

        <div className='msgcontainer'>
          {posts.length === 0 ? (
            <p>No posts available</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="post">
                <div className='title'>
                <span className='titlebar'>{post.title.length>25? post.title.substring(0, 22) + "...":post.title}</span>
                <span onClick={()=>{DeletePost(post.id)}} className='deleteicon'><DeleteIcon/></span>
                <span onClick={()=>{setEditPopup(post)}} className='editicon'><EditIcon/></span>
                </div>
               <span> {post.content.length>100 ? post.content.substring(0,250)+"...":post.content}</span>
                {post.content.length > 100 && (
                  <span className='readmore' onClick={() => setShowReadPopup(post)}>Read more</span>
                )}
                <div className='time'>
                <small >{post.timestamp}</small>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />

      {showpopup && (
        <div className='popup'>
          <div className='popup-content'>
            <h2>Add Post</h2>
            <input 
              type='text' 
              placeholder='Enter title' 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
            <textarea 
              placeholder='Add content' 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
            />
            <input type="file" />
            <button onClick={Addpost} className='post-button'>Post</button>
            <button onClick={() => setShowpopup(false)}>Cancel</button>
          </div>
        </div>
      )}


    {showreadpopup && (
        <div className='popup'>
          <div className='popup-content'>
            <h2>{showreadpopup.title}</h2>
            <p>{showreadpopup.content}</p>
            <button onClick={() => setShowReadPopup(null)}>Close</button>
          </div>
        </div>
      )}

    {editpopup&& (
        <div className='popup'>
          <div className='popup-content'>
            <h2>Add Post</h2>
            <input 
              type='text' 
              placeholder='Enter title' 
              value={edititle} 
              onChange={(e) => setEdittitle(e.target.value)} 
            />
            <textarea 
              placeholder='Add content' 
              value={editcontent} 
              onChange={(e) => setEditcontent(e.target.value)} 
            />
            <input type="file" />
            <button onClick={EditPost}>Save Changes</button>
            <button onClick={() => setEditPopup(null)}>Cancel</button>
          </div>
        </div>
      )}

    
    </div>
  );
};

export default Home;

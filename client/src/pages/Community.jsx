
// React imports
import testimonials from '../data/testimonials';
import { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';

// Page
export default function Community() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [addPost, { loading, error }] = useMutation(ADD_POST, {
    onCompleted: (data) => {
      setPosts(currentPosts => [data.addPost, ...currentPosts]);
      setTitle('');
      setContent('');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPost({
        variables: {
          title,
          content,
        },
      });
    } catch (err) {
      console.error("Error creating post: ", err);
    }
  };

  return (

     <div className="communityContainer">
        <h1>Welcome to the community!</h1>
        {/* Existing content */}
        {/* Add a new section for post creation */}
        <div className="postCreationSection postCenter">
          <h2 className="white postCenter">Create a New Post</h2>

    <div className="communityContainer">
      <h1>Welcome to the community!</h1>
      <p className="commP">This is a place for all users to share, connect, and grow together. Here, you can find motivation, support, and advice as you work towards your personal and professional goals.</p>

      <div className="featuresSection">
        <h2>Features</h2>
        <h5>(**Comming soon**)</h5>
        <div className="commItems">
          <div className="commCard">
            <p>Community Forums: Dive into discussions, ask questions, and share your knowledge.</p>
          </div>
          <div className="commCard">
            <p>Direct Messaging: Connect with fellow members one-on-one.</p>
          </div>
          <div className="commCard">
            <p>Groups: Join groups that match your interests and goals.</p>
          </div>
          <div className="commCard">
            <p>Events: Stay informed about upcoming community events and meetups.</p>
          </div>
        </div>
      </div>

      <div className="postCreationSection">
        <h2>Create a New Post</h2>
        <div className='postForm btn'>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Share your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>Post</button>
          </form>
        </div>
        <div className="postsList">
          {posts.map((post, index) => (

            <div key={index} className="post">

            <div key={index} className="commCard">

              <h3>{post.title}</h3>
              <p>{post.content}</p>
              {/* <cite>{post.author}</cite> */}
            </div>
          ))}
        </div>
        {error && <p>Error creating post. Please try again.</p>}
      </div>

      

      <div className="testimonialSection">
        <h2>User Testimonials</h2>
        <div>
          {testimonials.map(({ id, name, role, text }) => (
            <div key={id} className="commCard">
              <blockquote>{text}</blockquote>
              <cite>- {name}, {role}</cite>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

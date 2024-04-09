// React imports
import testimonials from '../data/testimonials';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST, DELETE_POST } from '../utils/mutations';
import { useQuery } from '@apollo/client';
import { ALL_POSTS } from '../utils/queries';
import Auth from '../utils/auth'

// Page
export default function Community() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState('')
  const [addPost, { loading, error }] = useMutation(ADD_POST, {
    onCompleted: (data) => {
      setPosts([data.addPost, ...posts]);
      setTitle('');
      setContent('');
    }
  });


  const [deletePost, { error: deleteError }] = useMutation(DELETE_POST)

  const { loading: postLoading, data } = useQuery(ALL_POSTS)
  const allPosts = data?.posts || []

  console.log(allPosts)

  useEffect(() => {
    if (allPosts.length) { setPosts(allPosts) }
    const user = Auth.getProfile()

    console.log(user)

    setUserId(user.data._id)

  }, [allPosts])

  const handleDelete = async (e) => {
    console.log(e.target.value)
    try {
      const { data } = await deletePost({
        variables: { id: e.target.value }

      })

      console.log(data.deletePost)

      const filtered = posts.filter(post => post._id !== e.target.value)
      setPosts(filtered)

    } catch (error) {
      console.log(error)
    }
  }

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
      <p className="commP">This is a place for all users to share, connect, and grow together. Here, you can find motivation, support, and advice as you work towards your personal and professional goals.</p>

      <div className="featuresSection">
        <h2>Features</h2>
        <h5>(**Coming soon**)</h5>
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
        {/* Handles post mapping */}
        <div className="postsList">
          {posts.map((post, index) => (
            <div key={index} className="post white postCenter btn">
              <div className="commCard">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                {/* Uncomment the next line if you wish to display the post's author */}
                {/* <cite>{post.author}</cite> */}
                {(userId === post.author._id) ? (
                  <button onClick={handleDelete} value={post._id}> Delete </button>
                ) : ("")}
              </div>
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
};
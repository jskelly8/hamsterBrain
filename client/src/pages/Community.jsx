// React imports
import testimonials from '../data/testimonials';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST, DELETE_POST, ADD_COMMENT } from '../utils/mutations';
import { useQuery } from '@apollo/client';
import { ALL_POSTS } from '../utils/queries';
import Auth from '../utils/auth'

// Page
export default function Community() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [userId, setUserId] = useState('')
  const [addPost, { loading, error }] = useMutation(ADD_POST, {
    onCompleted: (data) => {
      const newPostWithAuthor = {
        ...data.addPost,
        author: {
          ...data.addPost.author,
          username: Auth.getProfile().data.username
        }
      };
      setPosts([newPostWithAuthor, ...posts]);
      setTitle('');
      setContent('');
    }
  });

  const [deletePost, { error: deleteError }] = useMutation(DELETE_POST)

  const { loading: postLoading, data } = useQuery(ALL_POSTS)
  const allPosts = data?.posts || []

  const [addComment] = useMutation(ADD_COMMENT, {
    onCompleted: (data) => {
      const userProfile = Auth.getProfile();
      const newCommentWithUser = {
        ...data.addComment,
        user: {
          _id: userProfile.data._id,
          username: userProfile.data.username
        }
      };

      const updatedPosts = posts.map(post => {
        if (post._id === newCommentWithUser.postId) {
          return {
            ...post,
            comments: [...post.comments, newCommentWithUser]
          };
        }
        return post;
      });

      setPosts(updatedPosts);
    },
    onError: (error) => {
      console.error("Error adding comment:", error);
    },
    refetchQueries: [{ query: ALL_POSTS }],
  });

  const handleAddComment = async (postId) => {
    const text = commentText[postId]
    if (!text) return;
    try {
      await addComment({
        variables: {
          postId,
          text: commentText[postId],
        },
      });
      setCommentText({ ...commentText, [postId]: '' });
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

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
                <cite className="font50 bold quicksand">{post.author?.username}:</cite>
                <h3 className="font30 quicksand">{post.title}</h3>
                <p className="font20 quicksand">{post.content}</p>
                <div className="authDelete">
                  {/* <cite>{post.author?.username}</cite> */}
                  {(userId === post.author._id) ? (
                    <button onClick={handleDelete} value={post._id}> Delete </button>
                    // ) : ("")}
                  ) : null}
                </div>

                {post.comments && post.comments.map((comment, cIndex) => (
                  <div key={cIndex} className="comment">
                    <p className="font20 quicksand marg20">{comment.text}</p>
                    <cite>{comment.user?.username}</cite>
                  </div>
                ))}
                <div className='commentInputSection btn'>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentText[post._id] || ""}
                    onChange={(e) => setCommentText({ ...commentText, [post._id]: e.target.value })}
                  />
                  <button onClick={() => handleAddComment(post._id)}>Comment</button>
                </div>
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
}